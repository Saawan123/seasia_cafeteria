import React, { useState } from "react";
import { Navbar, Nav, Accordion } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./sidebar.scss"

import {
  GraphIcon,

  SellersIcon,
  MarketingIcon,
  ChartlineIcon,
 
  logoutIcon,



} from "../lib/icon";

import { AppDispatch } from "../store/store";
import "./sidebar.scss";
import ToastifyShow from "./ToastifyShow";

const Sidebar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const menu = [
    {
      name: "Dashboard",
      icon: GraphIcon,
      link: "dashboard",
    },
    {
      name: "Orders",
      icon: SellersIcon,
      link: "orders",
    },
    {
      name: "Custom Order",
      icon: MarketingIcon,
      link: "custom-order",
    },
    {
      name: "User List",
      icon: ChartlineIcon,
      link: "user-list",
    },
    {
      name: "Menu",
      icon: GraphIcon,
      link: "Menu",
    },
    {
      name: "LogOut",
      icon: logoutIcon,
      link: "/",
      onClick: () => {
        localStorage.clear(); 
       ToastifyShow("Logout successfully","success")
      },
    },
  ];



  // Define a function to handle toggling the sidebar
  const menuToggle = () => {
    setToggle(!toggle);
  };

  function setEventKey(arg0: string[]) {
    throw new Error("Function not implemented.");
  }

  return (
    <aside className={toggle ? "aside-flexible sidebar-wrapper" : "sidebar-wrapper "}>
      <Navbar.Brand>
        <img
          src={"https://seasia.prodacker.com/static/media/logo-new.4a5f48de786a28690944e35048da410a.svg"}
          alt="logo"
          loading="lazy"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", maxWidth: 100 }}
          className="w-100"
          draggable={false}
        />
        <span className="menu-icon" onClick={menuToggle}>
          <svg
            width="22"
            height="14"
            viewBox="0 0 22 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="14" height="2" rx="1" fill="rgb(255,193,7)"></rect>
            <rect y="6" width="22" height="2" rx="1" fill="rgb(255,193,7)"></rect>
            <rect y="12" width="14" height="2" rx="1" fill="rgb(255,193,7)"></rect>
          </svg>
        </span>
      </Navbar.Brand>
      <Navbar>
        <Nav className="nav flex-column pt-2" defaultActiveKey="/home">
        {menu.map((item, index) => (
  <Nav.Item key={index}>
    {item.link === "/" ? (
      <NavLink
        to={item.link}
        className="nav-link"
        onClick={item.onClick} 
      >
        <span>{item.icon}</span>
        <span>{!toggle ? item.name : ""}</span>
      </NavLink>
    ) : (
      <NavLink
        to={item.link}
        className="nav-link"
        onClick={() => {
          setEventKey(["0"]);
        }}
      >
        <span>{item.icon}</span>
        <span>{!toggle ? item.name : ""}</span>
      </NavLink>
    )}
  </Nav.Item>
))}
        </Nav>
      </Navbar>

      
    </aside>
  );
};

export default Sidebar;
