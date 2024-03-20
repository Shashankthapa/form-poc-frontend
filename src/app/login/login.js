"use client";
import React, { useState } from "react";
import { formValidator } from "../validation/form";
const Login = ({ login, signUp, errors, setErrors }) => {
  const [userDataLogin, setUserDataLogin] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const styleLeft = {
    transform: "translateX(-100%)",
  };

  const styleRight = {
    transform: "translateX(0%)",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUserDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isLogin = true;
    console.log(formValidator(userDataLogin, isLogin));
    if (formValidator(userDataLogin, isLogin).isValid) {
      setSubmitted(true);
      setErrors(formValidator(userDataLogin, isLogin));
      LoginReq(userDataLogin).then((res) => {
        if (res != undefined) {
          console.log("response : ", res, "id : ", res.user_id);
          setUserDataLogin({ userName: "", email: "", password: "" });
        }
      });
      console.log("submitted");
    } else {
      setErrors(formValidator(userDataLogin, isLogin));
    }
    // console.log(formValidator(userDataLogin, isLogin), isLogin);
  };

  const LoginReq = async (userDataLogin) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userDataLogin.email,
          password: userDataLogin.password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log("result error : ", result);
        setMsg(result.message);
        throw new Error(
          `HTTP error! status: ${response.status}, statusText: ${response.statusText}`
        );
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      action="#"
      className="login"
      onSubmit={(e) => {
        handleFormSubmit(e);
      }}
      style={
        !login && !signUp
          ? styleRight
          : login && !signUp
          ? styleRight
          : styleLeft
      }
    >
      <div>{msg ? msg : ""}</div>
      <div className="field">
        <input
          type="text"
          name="email"
          value={userDataLogin.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
      </div>
      {errors.isLogin ? (
        errors.email ? (
          <div className="error">{errors.email}</div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <div className="field">
        <input
          type="password"
          name="password"
          value={userDataLogin.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
      </div>
      {errors.isLogin ? (
        errors.password ? (
          <div className="error">{errors.password}</div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <div className="pass-link">
        <a href="#">Forgot password?</a>
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input type="submit" value="Login" />
      </div>
      <div className="signup-link">
        Not a member? <a href="">Signup now</a>
      </div>
    </form>
  );
};

export default Login;
