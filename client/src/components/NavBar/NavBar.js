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

  return (
    <div className="nav-container">
      <div className="nav-title-container">
        <h1>Recipe Finder</h1>
      </div>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
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
        <Link className="mobile-only" to="/login">
          Log In
        </Link>
        <Link className="mobile-only" to="/signup">
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
