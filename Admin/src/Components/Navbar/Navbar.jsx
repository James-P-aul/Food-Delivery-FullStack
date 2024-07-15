import React from "react";
import "./Navbar.css";
import { assets } from "./../../assets/assets.js";

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <img className="logo" src={assets.logo} alt="" />
      </div>
      <div className="right">
        <img className="profile-icon" src={assets.profile_image} alt="" />
      </div>
    </div>
  );
}

export default Navbar;
