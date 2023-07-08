import React from "react";
import { NavLink } from "react-router-dom";
import Manager from "../../UrlpathManager/Manager";
import "../../styles/sidebar.css";

const Sidebar = () => {

  const Logout = () => {
    localStorage.removeItem('AdminToken')
    window.location.href = '/login'
  }

  return (
    <div className="sidebar">
      <div className="logo">
        {/* <span>PROPDAM</span> */}
        <img src="images/logo.png" alt="" />
        {/* <img src={require("../../assets/logo.png")} alt="" /> */}
      </div>

      <div className="ul_items">
        <div className="menu">
          {/* <span>Menu</span> */}
          <ul className="menu_items">
            {Manager.map((i, index) => {
              return (
                <li className="nav_list" key={index}>
                  <NavLink to={i.path} className={navClass => navClass.isActive ? "nav_active" : "nav_link"} style={{ textDecoration: 'none' }}>
                    <i className={i.icon}></i>
                    <span>{i.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="menu-bottom">
        <i className="ri-logout-circle-r-line"></i>
        <span onClick={Logout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
