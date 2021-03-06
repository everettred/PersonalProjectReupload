import React, { Component, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/reducer";
import "../../gsstyling.css";
import gslogo from "../assets/GSlogo.svg";
import loginbutton from "../assets/loginbutton.svg";
import homebutton from "../assets/homebutton.svg";
import accountbutton from "../assets/accountbutton.svg";
import logoutbutton from "../assets/logoutbutton.svg";
import menuIcon from "../assets/MenuIcon.svg";
function Nav(props) {
  const [toggleMenu, setToggleMenu] = useState(false);

  const logoutAxios = () => {
    console.log("hit logout");
    axios.post("/api/auth/logout");
  };

  const logoutCaller = () => {
    logoutAxios();
    props.logout();
  };

  const toggleMenuHandle = () => {
    setToggleMenu(!toggleMenu);
  };

  const authButton = () => {
    let navAcountStyle = {
      display: "flex",
      flexDirection: "column",
    };

    if (!props.username) {
      return (
        <Link className="home-button" to="/login">
          <img
            className="home-button2"
            onClick={toggleMenuHandle}
            src={loginbutton}
            alt="Login"
          />
        </Link>
      );
    } else {
      return (
        <nav className="nav-account-true">
          <Link className="home-button" to={`/profile/${props.user_id}`}>
            <img
              onClick={toggleMenuHandle}
              src={accountbutton}
              className="home-button2"
              alt="Account"
            />
          </Link>
          <Link to="/login" onClick={() => logoutCaller()}>
            <img
              onClick={toggleMenuHandle}
              src={logoutbutton}
              className="home-button2"
              alt="Logout"
            />
          </Link>
        </nav>
      );
    }
  };
  //Conditionally change account/Logout and
  //login depending on if user is logged in (isAuthenticated)
  //this can be done maybe in a if statement that checks my state username variable to be true
  //if statemnt should exist in my render and be called on my link
  let menuToggler = toggleMenu
    ? "mobile-links-container-show"
    : "mobile-links-container";
  return (
    <section>
      <section className="header-background-gradient">
        <img className="logo" src={gslogo} alt="Garage Sellers" />

        <nav className="nav-links-container">
          <Link to="/listings">
            <img src={homebutton} className="home-button2" alt="Home" />
          </Link>
          <section>{authButton()}</section>
        </nav>
        <img
          onClick={toggleMenuHandle}
          className="drop-down-menu"
          src={menuIcon}
        ></img>
      </section>
      <nav className={menuToggler}>
        <Link to="/listings">
          <img
            onClick={toggleMenuHandle}
            src={homebutton}
            className="home-button2"
            alt="Home"
          />
        </Link>
        {authButton()}
      </nav>
    </section>
  );
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  logout: logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
