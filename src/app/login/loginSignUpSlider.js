"use client";
import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import "./loginSignUp.css";

const LoginSignupSlider = () => {
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [loginLabel, setLoginLabel] = useState(false);
  const [signUpLabel, setSignUpLabel] = useState(false);
  const [isLoginColor, setIsLoginColor] = useState(true);
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);

  const props = {
    login: login,
    signUp: signUp,
    errors: errors,
    isLogin: isLogin,
    setIsLogin: setIsLogin,
    setErrors: setErrors,
  };

  function loginHandler() {
    if (login) {
      setLogin(false);
      setLoginLabel(false);
      setSignUpLabel(true);
      setSignUp(true);
      setIsLoginColor(false);
    } else {
      setLogin(true);
      setLoginLabel(true);
      setSignUpLabel(false);
      setSignUp(false);
      setIsLoginColor(true);
    }
  }

  function signUpHandler() {
    if (signUp) {
      setSignUp(false);
      setSignUpLabel(false);
      setLoginLabel(true);
      setLogin(true);
      setIsLoginColor(true);
    } else {
      setSignUp(true);
      setSignUpLabel(true);
      setLoginLabel(false);
      setLogin(false);
      setIsLoginColor(false);
    }
  }

  const loginLabelHidden = {
    transform: "translateX(-100%)",
  };

  const loginLabelShow = {
    transform: "translateX(0%)",
  };

  const signUpLabelShow = {
    transform: "translateX(-100%)",
  };

  const signUpLabelHidden = {
    transform: "translateX(0%)",
  };

  return (
    <>
      <div className="wrapper h-fit">
        <div className="title-text">
          <div
            className="title login"
            style={
              !loginLabel && !signUpLabel
                ? loginLabelShow
                : loginLabel && !signUpLabel
                ? loginLabelShow
                : loginLabelHidden
            }
          >
            Login Form
          </div>
          <div
            className="title signup"
            style={
              !loginLabel && !signUpLabel
                ? loginLabelShow
                : signUpLabel && !loginLabel
                ? signUpLabelShow
                : signUpLabelHidden
            }
          >
            Signup Form
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked />
            <input type="radio" name="slide" id="signup" />
            <label
              className="slide login"
              style={
                isLoginColor
                  ? {
                      background:
                        "-webkit-linear-gradient(left,#003366,#004080,#0059b3,#0073e6)",
                      color: "white",
                    }
                  : { background: "white", color: "black" }
              }
              onClick={loginHandler}
            >
              Login
            </label>
            <label
              className="slide signup"
              style={
                !isLoginColor
                  ? {
                      background:
                        "-webkit-linear-gradient(left,#003366,#004080,#0059b3,#0073e6)",
                      color: "white",
                    }
                  : { background: "white", color: "black" }
              }
              onClick={signUpHandler}
            >
              Signup
            </label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <Login {...props} />
            <Signup {...props} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignupSlider;
