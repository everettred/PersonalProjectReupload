import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AccountControl from "./AccountControl";
import PostCard from "../Post/PostCard";
import { logout } from "../../redux/reducer";
import "../../gsstyling.css";

function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [displayUserId, setDisplayUserId] = useState(props.match.params.Userid);
  const [isOwner, setIsOwner] = useState("false");
  const [userPosts, setUserPosts] = useState([]);

  const getUserPosts = () => {
    axios
      .post("/api/posts/user", { displayUserId: displayUserId })
      .then((res) => {
        setUserPosts(res.data);
        console.log("hit axios posts call");
      });
  };

  const getUserInfo = () => {
    axios.post("/api/user/id", { displayUserId: displayUserId }).then((res) => {
      console.log("hit axios call");
      console.log(res);
      setUsername(res.data.user.username);
      setIsOwner(res.data.isOwner);
    });
    getUserPosts();
  };

  const useEffect = (getUserInfo(), []);
  const logoutAxios = () => {
    console.log("hit logout axios");
    axios.post("/api/auth/logout");
    props.history.push("/login");
  };

  const handleAccountDelete = () => {
    console.log("hit delete");
    axios.post(`/api/auth/delete/:${displayUserId}`);
    props.history.push("/login");
    props.logout();
  };

  const handlePostCreateRedirect = () => {
    console.log("hit post create");
    props.history.push("/edit");
  };

  let userPostsMap = userPosts.map((e) => {
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
          <h1 className="post-title">{`${username}`}</h1>
        </section>
        <img></img>
        <section className="profile-control-container">
          {isOwner ? (
            <AccountControl
              handleAccountDeleteFn={handleAccountDelete}
              logoutFn={props.logout}
              logoutAxiosFn={logoutAxios}
              handlePostCreateRedirectFn={handlePostCreateRedirect}
            />
          ) : (
            ""
          )}
        </section>
      </section>
      <section className="post-list-style">{userPostsMap}</section>
    </section>
  );
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  logout: logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
