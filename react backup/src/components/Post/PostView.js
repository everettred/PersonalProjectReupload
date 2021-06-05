import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { editPostId } from "../../redux/reducer";
import { Link } from "react-router-dom";
import PostOwnerControl from "./PostOwnerControl";
import "../../gsstyling.css";
import defaultPostPhoto from "../assets/defaultpost.svg";

class PostView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: props.match.params.id,
      username: "",
      post: {},
      isOwner: false,
      postPhoto: defaultPostPhoto,
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = () => {
    axios.get(`/api/post/:${this.props.match.params.id}`).then((res) => {
      this.setState(
        { post: res.data, postPhoto: res.data.post_img_url },
        this.getPostOwnerInfo(res.data.author_id)
      );
    });
  };
  getPostOwnerInfo = (id) => {
    let idObj = { displayUserId: id };
    axios.post("/api/user/id", idObj).then((res) => {
      this.setState({
        username: res.data.user.username,
        isOwner: res.data.isOwner,
      });
    });
  };
  // this.props.history.push("/listings")
  handlePostDelete = () => {
    console.log("hit fn");
    axios
      .post("/api/post/delete", this.state)
      .then(() => console.log("hit res"));
    this.props.history.push("/login");
  };
  handlePostUpdate = () => {
    this.props.editPostId(this.state.postId);
    this.props.history.push("/edit");
  };

  render() {
    console.log(this.state.post);
    let { author_id, post_content, post_title, posted_time, post_img_url } =
      this.state.post;
    let isOwner = this.state.isOwner;
    return (
      <article className="post-view-parent">
        <section className="img-container">
          <img
            className="post-image"
            src={this.state.postPhoto}
            alt={post_title}
          ></img>
          <h1 className="post-info">
            <h1 className="post-title">{`${post_title}`}</h1>
            <Link id="post-font" to={`/profile/${author_id}`}>
              {` -${this.state.username}- `}
            </Link>
            <h1 id="post-font">{`${posted_time}`}</h1>
          </h1>
        </section>
        <h1
          className="post-content-container"
          id="post-font"
        >{`${post_content}`}</h1>

        {isOwner ? (
          <PostOwnerControl
            handlePostDeleteFn={this.handlePostDelete}
            handlePostUpdateFn={this.handlePostUpdate}
          />
        ) : null}
      </article>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  editPostId: editPostId,
};
export default connect(mapStateToProps, mapDispatchToProps)(PostView);
