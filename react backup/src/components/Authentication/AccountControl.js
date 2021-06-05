import React from "react";
import axios from "axios";
import "../../gsstyling.css";
import deleteAccount from "../assets/deletebutton.svg";
import logoutButton from "../assets/logoutbutton2.svg";
import newPostButton from "../assets/newbutton.svg";

//
function AccountControl(props) {
  let handleLogout = () => {
    props.logoutFn();
    props.logoutAxiosFn();
  };

  return (
    <section className="profile-buttons">
      <img
        id="profile-button"
        onClick={() => props.handleAccountDeleteFn()}
        src={deleteAccount}
        alt="Delete Account"
      />
      <img
        id="profile-button"
        onClick={() => handleLogout()}
        src={logoutButton}
        alt="Logout"
      />
      <img
        id="profile-button"
        onClick={() => props.handlePostCreateRedirectFn()}
        src={newPostButton}
        alt="New Post"
      />
    </section>
  );
}

export default AccountControl;
