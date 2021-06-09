import React from "react";

import "./About.css";

export const About = () => {
  return (
    <div className="About">
      <div className="title-container">
        <h2 className="title">About</h2>
      </div>

      <div className="about-card-container about-card-1">
        <h3 className="about-card-title">How It Works</h3>
        <ol>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </li>
          <li>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </li>
        </ol>
      </div>

      <div className="about-card-container card-2">
        <h3 className="about-card-title">Why I Created This Website</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.{" "}
        </p>
      </div>
    </div>
  );
};
