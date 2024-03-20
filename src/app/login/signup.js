"use client";

import React, { useEffect, useState } from "react";
import { formValidator } from "../validation/form";

const Signup = ({ signUp, login, errors, setErrors }) => {
  const [userDataSignUp, setUserDataSignUp] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setUserDataSignUp((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(msg);
  }, [msg]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isLogin = false;
    if (formValidator(userDataSignUp, isLogin).isValid) {
      setErrors(formValidator(userDataSignUp, isLogin));
      signUpReq(userDataSignUp).then((res) => {
        if (res != undefined) setMsg(res);
        setUserDataSignUp({ userName: "", email: "", password: "" });
      });
      console.log("submitted");
    } else {
      setErrors(formValidator(userDataSignUp, isLogin));
    }
  };

  //handle signup
  const signUpReq = async (userDataSignUp) => {
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: userDataSignUp.name,
          email: userDataSignUp.email,
          password: userDataSignUp.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMsg(result.message);
        throw new Error(
          `HTTP error! status: ${response.status}, statusText: ${response.statusText}`
        );
      }

      return result;
    } catch (error) {
      // console.log("myerror", error);
    }
  };

  const styleLeft = {
    transform: "translateX(0%)",
  };

  const styleRight = {
    transform: "translateX(-100%)",
  };

  return (
    <form
      action="#"
      className="signup"
      style={
        !login && !signUp
          ? styleLeft
          : signUp && !login
          ? styleRight
          : styleLeft
      }
    >
      <div>{msg ? msg : ""}</div>
      <div className="field">
        <input
          type="text"
          name="userName"
          value={userDataSignUp.userName}
          onChange={handleInputData}
          placeholder="User Name"
        />
      </div>

      {!errors.isLogin ? (
        errors.userName ? (
          <div className="error">{errors.userName}</div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <div className="field">
        <input
          type="text"
          name="email"
          value={userDataSignUp.email}
          onChange={handleInputData}
          placeholder="Email Address"
        />
      </div>
      {!errors.isLogin ? (
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
          value={userDataSignUp.password}
          onChange={handleInputData}
          placeholder="Password"
        />
      </div>
      {!errors.isLogin ? (
        errors.password ? (
          <div className="error">{errors.password}</div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <div className="field btn">
        <div className="btn-layer"></div>
        <input
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
          value="Signup"
        />
      </div>
    </form>
  );
};

export default Signup;
