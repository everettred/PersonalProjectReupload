import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducer";
import { Redirect } from "react-router-dom";
import "../../gsstyling.css";
import loginbuttoninverted from "../assets/loginbuttoninverted.svg";
import registerbutton from "../assets/registerbutton.svg";

function LoginInput(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error,setError] = useState("")

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: "",
  //     password: "",
  //     error: "",
  //   };
  // }

  // handleChange(prop, val) {
  //   this.setState({
  //     [prop]: val,
  //   });
  // }

  if (props.username) {
    return <Redirect to={`/profile/${props.user_id}`} />;
  }

  return (
    <div className="login">
      <h2 className="login-error-message">{`${props.errorMessage}`}</h2>
      <section className="login-input">
        <input
          className="input-style"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        ></input>
        <input
          className="input-style"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <section className="auth-button-container">
          <img
            id="auth-button"
            onClick={() =>
              props.login({ username: username, password: password })
            }
            src={loginbuttoninverted}
            alt="login"
          />
          <img
            id="auth-button"
            onClick={() =>
              props.register({ username: username, password: password })
            }
            src={registerbutton}
            alt="register"
          />
        </section>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  login: login,
  register: register,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginInput);
