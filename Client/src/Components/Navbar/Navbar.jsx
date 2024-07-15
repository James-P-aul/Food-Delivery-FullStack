import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

function Navbar({ setShowLogin }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Home");
  const { getTotalAmount, token, setToken, setcartItems } =
    useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setcartItems({});
  };

  // useEffect(() => {
  //   console.log(token);
  // });

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={assets.logo} alt="" />
      </Link>
      <div className="navbar-menu">
        <ul>
          <Link
            to="/"
            onClick={() => {
              setMenu("Home");
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            onClick={() => {
              setMenu("Menu");
            }}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
          <a
            href="#app-download"
            onClick={() => {
              setMenu("Mobile-app");
            }}
            className={menu === "Mobile-app" ? "active" : ""}
          >
            Mobile-app
          </a>
          <a
            href="#footer"
            onClick={() => {
              setMenu("Contact-us");
            }}
            className={menu === "Contact-us" ? "active" : ""}
          >
            Contact-us
          </a>
        </ul>
      </div>
      <div className="right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          {/* <Link to="/cart"> */}
          <img
            onClick={() => {
              navigate("./cart");
            }}
            src={assets.basket_icon}
            alt=""
          />
          {/* </Link> */}
          {/* <div className={getTotalAmount() === 0 ? "" : "dot"}></div> */}
        </div>
        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
            className="btn"
          >
            Sign In
          </button>
        ) : (
          <div className="login-data-container">
            <div className="profile-icon">
              <img src={assets.profile_icon} alt="" />
            </div>
            <div className="profile-popup">
              <div className="profile-items">
                <img src={assets.bag_icon} alt="" />
                <p onClick={() => navigate("/myorders")}>Orders</p>
              </div>
              <hr />
              <div className="profile-items">
                <img src={assets.logout_icon} alt="" />
                <p onClick={logout}>Logout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
