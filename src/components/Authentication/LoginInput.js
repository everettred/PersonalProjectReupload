import React, { Component } from "react";
import { connect } from "react-redux";
import { login, register } from "../../redux/reducer";
import { Redirect } from "react-router-dom";
import "../../gsstyling.css";
import loginbuttoninverted from "../assets/loginbuttoninverted.svg";
import registerbutton from "../assets/registerbutton.svg";

class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
    };
    // this.register = this.register.bind(this);
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val,
    });
  }

  render() {
    if (this.props.username) {
      return <Redirect to={`/profile/${this.props.user_id}`} />;
    }

    return (
      <div className="login">
        <h2 className="login-error-message">{`${this.props.errorMessage}`}</h2>
        <section className="login-input">
          <input
            className="input-style"
            onChange={(e) => this.handleChange("username", e.target.value)}
            placeholder="username"
          ></input>
          <input
            className="input-style"
            type="password"
            onChange={(e) => this.handleChange("password", e.target.value)}
            placeholder="password"
          ></input>
          <section className="auth-button-container">
            <img
              id="auth-button"
              onClick={() => this.props.login(this.state)}
              src={loginbuttoninverted}
              alt="login"
            />
            <img
              id="auth-button"
              onClick={() => this.props.register(this.state)}
              src={registerbutton}
              alt="register"
            />
          </section>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  login: login,
  register: register,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginInput);
