import React from "react";
import deleteButton from "../assets/deletebutton.svg";
import editButton from "../assets/editbutton.svg";
import "../../gsstyling.css";
//
function PostOwnerControl(props) {
  return (
    <section className="post-control">
      <img
        id="post-button"
        onClick={() => props.handlePostDeleteFn()}
        src={deleteButton}
        alt="Delete Post"
      />
      <img
        id="post-button"
        onClick={() => props.handlePostUpdateFn()}
        SRC={editButton}
        alt="Edit Post"
      />
    </section>
  );
}

export default PostOwnerControl;
