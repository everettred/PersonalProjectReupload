import React from "react";
import { Link } from "react-router-dom";
import "../../gsstyling.css";
import defaultpostphoto from "../assets/defaultpost.svg";

function PostCard(props) {
  let imgDisplay = () => {
    if (props.titleImg) {
      return props.titleImg;
    } else return defaultpostphoto;
  };
  return (
    <Link className="postcard-container" to={`/post/${props.postId}`}>
      <img src={imgDisplay()} alt="default post" className="title-img" />
      <h4 className="title">{props.title}</h4>
    </Link>
  );
}

export default PostCard;
