import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { editPostIdReset } from "../../redux/reducer";
import "../../gsstyling.css";
import cancelButton from "../assets/cancelbutton.svg";
import postButton from "../assets/postbutton.svg";

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user_id,
      postTitleImg: "",
      postTitle: "",
      postContent: "",
      categoryId: "",
      obj: "",
      postID: this.props.postId,
    };
  }

  componentDidMount() {
    this.postIdChecker();
  }

  postIdChecker = () => {
    if (this.state.postID) {
      axios.get(`/api/post/:${this.state.postID}`).then((res) => {
        this.setState({
          postTitle: res.data.post_title,
          postContent: res.data.post_content,
          category_id: res.data.category_id,
        });
      });
    } else {
      this.setState({
        postTitle: "",
        postContent: "",
        category_id: "",
      });
    }
  };

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        postTitleImg: reader.result,
      });
    };
  };

  handleImgInput = (val) => {
    const file = val;
    this.previewFile(file);
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val,
    });
  }

  postToDataBase = () => {
    if (!this.state.userId) {
      this.props.history.push("/login");
    } else {
      if (this.state.postID) {
        axios.put("/api/editing/id", this.state);
        this.props.history.push("/login");
      } else {
        axios.post("/api/create/post", this.state);
        this.props.history.push("/listings");
      }
    }

    // ;
  };

  render() {
    return (
      <section className="editor-container">
        <section className="editor-background">
          <section>
            <input
              className="post-title-input"
              id="post-input"
              onChange={(e) => this.handleChange("postTitle", e.target.value)}
              placeholder="What are you selling"
              value={this.state.postTitle}
            ></input>

            <select
              className="post-cat-input"
              onChange={(e) => this.handleChange("categoryId", e.target.value)}
              name="Category"
              id="post-input"
              value={this.state.categoryId}
            >
              <option value="0">Select Category</option>
              <option value="1">Auto</option>
              <option value="2">Computers</option>
              <option value="3">General</option>
              <option value="4">Home and Garden</option>
            </select>
          </section>

          <textarea
            style={{ width: "90%" }}
            className="post-content"
            onChange={(e) => this.handleChange("postContent", e.target.value)}
            placeholder="Describe your Item"
            value={this.state.postContent}
            name="paragraph_text"
            cols="50"
            rows="10"
          ></textarea>

          <section>
            <img
              src={cancelButton}
              alt="cancel"
              id="post-button"
              onClick={() => this.props.history.push("/login")}
            ></img>
            <img
              id="post-button"
              src={postButton}
              alt="Post"
              onClick={() => this.postToDataBase()}
            ></img>
          </section>
        </section>
        <section>
          {this.state.postTitleImg && (
            <img
              className="post-image"
              src={this.state.postTitleImg}
              alt="Upload preview"
            />
          )}
          <form>
            <label for="img-input" className="custom-file-upload"></label>
            <input
              id="img-input"
              type="file"
              name="image"
              onChange={(e) => this.handleImgInput(e.target.files[0])}
            ></input>
          </form>
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  editPostIdReset: editPostIdReset,
};
export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
