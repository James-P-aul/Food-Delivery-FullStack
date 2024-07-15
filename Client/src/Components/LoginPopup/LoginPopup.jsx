import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { token, setToken, url } = useContext(StoreContext);
  const [curstate, setCurState] = useState("Sign Up");
  const [logindata, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(logindata);
    let newUrl = `${url}/api/user`;
    if (curstate === "Login") {
      newUrl += "/login";
    } else {
      newUrl += "/register";
    }
    const response = await axios.post(newUrl, logindata);
    if (!response.data.success) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setShowLogin(false);
    }
  };

  // useEffect(() => {
  //   console.log(logindata);
  // }, [logindata]);

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curstate}</h2>
          <img
            onClick={() => {
              setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {curstate === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={logindata.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={logindata.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={logindata.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button>{curstate === "Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms aof use & privacy policy</p>
        </div>
        {curstate === "Login" ? (
          <p>
            Create a new account ?
            <span
              onClick={() => {
                setCurState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account ?{" "}
            <span
              onClick={() => {
                setCurState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
