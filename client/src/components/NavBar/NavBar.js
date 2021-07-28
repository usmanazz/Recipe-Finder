import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "../UI/Button";
import accountLogo from "./outline_person_outline_black_24dp.png";
import "./NavBar.css";

export const NavBar = () => {
  const handleLoginClick = () => {
    console.log("login page");
  };

  const handleSignupClick = () => {
    console.log("signup page");
  };

  useEffect(() => {
    let resizeTimer;
    window.addEventListener("resize", () => {
      // close side nav if resize window greater than 768px
      const nav = document.querySelector(".links");
      if (window.innerWidth > 768 && nav.classList.contains("nav-active")) {
        handleNavSlide();
      }

      // prevent side nav animation from happening on browser resize
      document.body.classList.add("resize-animation-stopper");
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
      }, 400);
    });
  });

  const handleNavSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".links");
    const navLinks = document.querySelectorAll(".links a");

    // Toggle Nav
    nav.classList.toggle("nav-active");

    // add box shadow to side-nav when displayed
    if (nav.classList.contains("nav-active")) {
      nav.style.boxShadow = "4px 6px 4px rgba(0, 0, 0, 0.25)";
    } else if (!nav.classList.contains("nav-active")) {
      console.log("hello");
      nav.style.boxShadow = "none";
    }

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
    burger.classList.toggle("toggle");
  };

  const closeSideNav = () => {
    handleNavSlide();
  };

  return (
    <div className="nav-container">
      <div className="nav-title-container">
        <h1>Recipe Finder</h1>
      </div>

      <div className="links">
        <Link to="/" onClick={closeSideNav}>
          Home
        </Link>
        <Link to="/about" onClick={closeSideNav}>
          About
        </Link>
        <Button
          handleClick={handleLoginClick}
          label="Log In"
          type="nav-btn-1"
        />
        <Button
          handleClick={handleSignupClick}
          label="Sign Up"
          type="nav-btn-2"
        />
        <Link className="mobile-only" to="/login" onClick={closeSideNav}>
          Log In
        </Link>
        <Link className="mobile-only" to="/signup" onClick={closeSideNav}>
          Sign Up
        </Link>
      </div>

      <div className="burger" onClick={handleNavSlide}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

      <div className="account-icon">
        <Link to="/login">
          <img src={accountLogo} alt="Account button" />
        </Link>
      </div>
    </div>
  );
};
