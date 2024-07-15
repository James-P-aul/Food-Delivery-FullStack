import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <NavLink to="/add" className="sidebar-item">
          <img className="logo" src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-item">
          <img className="logo" src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-item">
          <img className="logo" src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
