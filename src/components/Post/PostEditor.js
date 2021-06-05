import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { connect } from "react-redux";
import { editPostIdReset } from "../../redux/reducer";
import "../../gsstyling.css";
import cancelButton from "../assets/cancelbutton.svg";
import postButton from "../assets/postbutton.svg";

function PostEditor(props) {
  const [userId, setUserId] = useState(props.user_id);
  const [postTitleImg, setPostTitleImg] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [obj, setObj] = useState("");
  const [postID, setPostID] = useState(props.postId);
  // class PostEditor extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       userId: this.props.user_id,
  //       postTitleImg: "",
  //       postTitle: "",
  //       postContent: "",
  //       categoryId: "",
  //       obj: "",
  //       postID: this.props.postId,
  //     };
  //   }

  // componentDidMount() {
  //   this.postIdChecker();
  // }

  const postIdChecker = () => {
    console.log(props.postId);
    if (postID) {
      axios.get(`/api/post/:${postID}`).then((res) => {
        setPostTitle(res.data.post_title);
        setPostContent(res.data.post_content);
        setCategoryId(res.data.category_id);
        // this.setState({
        //   postTitle: res.data.post_title,
        //   postContent: res.data.post_content,
        //   category_id: res.data.category_id,
        // });
      });
    }
  };

  useEffect(() => {
    postIdChecker();
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostTitleImg(reader.result);
      // this.setState({
      //   postTitleImg: reader.result,
      // });
    };
  };

  const handleImgInput = (val) => {
    const file = val;
    previewFile(file);
  };

  // const handleChange = (prop, val) => {
  //   prop(val);
  // };

  const postToDataBase = () => {
    if (!userId) {
      props.history.push("/login");
    } else {
      if (postID) {
        axios.put("/api/editing/id", {
          postTitle: postTitle,
          postContent: postContent,
          categoryId: categoryId,
        });
        props.history.push("/login");
      } else {
        axios.post("/api/create/post", {
          postTitle: postTitle,
          postContent: postContent,
          categoryId: categoryId,
          userId: userId,
          postTitleImg: postTitleImg,
        });
        props.history.push("/listings");
      }
    }

    // ;
  };

  return (
    <section className="editor-container">
      <section className="editor-background">
        <section>
          <input
            className="post-title-input"
            id="post-input"
            onChange={(e) => setPostTitle(e.target.value)}
            placeholder="What are you selling"
            value={postTitle}
          ></input>

          <select
            className="post-cat-input"
            onChange={(e) => setCategoryId(e.target.value)}
            name="Category"
            id="post-input"
            value={categoryId}
          >
            <option value="0">Select Category</option>
            <option value="1">Auto</option>
            <option value="2">Computers</option>
            <option value="3">General</option>
            <option value="4">Home and Garden</option>
          </select>
        </section>

        <ReactQuill
          style={{ width: "90%" }}
          className="post-content"
          onChange={(e) => setPostContent(e.defaultValue)}
          placeholder="Describe your Item"
          value={postContent}
          name="paragraph_text"
        />

        <section>
          <img
            src={cancelButton}
            alt="cancel"
            id="post-button"
            onClick={() => props.history.push("/login")}
          ></img>
          <img
            id="post-button"
            src={postButton}
            alt="Post"
            onClick={() => postToDataBase()}
          ></img>
        </section>
      </section>
      <section>
        {postTitleImg && (
          <img className="post-image" src={postTitleImg} alt="Upload preview" />
        )}
        <form>
          <label for="img-input" className="custom-file-upload"></label>
          <input
            id="img-input"
            type="file"
            name="image"
            onChange={(e) => handleImgInput(e.target.files[0])}
          ></input>
        </form>
      </section>
    </section>
  );
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  editPostIdReset: editPostIdReset,
};
export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
