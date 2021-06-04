import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import AccountControl from "./AccountControl";
import PostCard from "../Post/PostCard";
import { logout } from "../../redux/reducer";
import "../../gsstyling.css";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      displayUserId: props.match.params.Userid,
      isOwner: false,
      userPosts: [],
    };
  }
  //this sets what profile you will see
  componentDidMount() {
    this.getUserInfo();
    this.getUserPosts();
    console.log("hit CDM");
  }

  getUserInfo = () => {
    axios.post("/api/user/id", this.state).then((res) => {
      console.log("hit axios call");
      console.log(res);
      this.setState({
        username: res.data.user.username,
        isOwner: res.data.isOwner,
      });
    });
  };

  getUserPosts = () => {
    axios.post("/api/posts/user", this.state).then((res) => {
      this.setState({ userPosts: res.data });
      console.log("hit axios posts call");
    });
  };

  logoutAxios = () => {
    console.log("hit logout axios");
    axios.post("/api/auth/logout");
    this.props.history.push("/login");
  };

  handleAccountDelete = () => {
    console.log("hit delete");
    axios.post(`/api/auth/delete/:${this.state.displayUserId}`);
    this.props.history.push("/login");
    this.props.logout();
  };

  handlePostCreateRedirect = () => {
    console.log("hit post create");
    this.props.history.push("/edit");
  };

  // postCardDisplay = (e) => <PostCard postTitle={e.post_title} />;
  render() {
    console.log(this.state.userPosts);
    let isOwner = this.state.isOwner;
    let userPosts = this.state.userPosts.map((e) => {
      return (
        <PostCard
          title={e.post_title}
          postId={e.post_id}
          titleImg={e.post_img_url}
          key={e.post_id}
        />
      );
    });
    return (
      <section>
        <section className="profile-view">
          <section>
            <h1 className="post-title">{`${this.state.username}`}</h1>
          </section>
          <img></img>
          <section className="profile-control-container">
            {isOwner ? (
              <AccountControl
                handleAccountDeleteFn={this.handleAccountDelete}
                logoutFn={this.props.logout}
                logoutAxiosFn={this.logoutAxios}
                handlePostCreateRedirectFn={this.handlePostCreateRedirect}
              />
            ) : (
              ""
            )}
          </section>
        </section>
        <section className="post-list-style">{userPosts}</section>
      </section>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  logout: logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
