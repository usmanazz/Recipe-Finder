import React from "react";

import "./Signup.css";
import { Button } from "../../components/UI/Button";
import { Link } from "react-router-dom";

export const Signup = () => {
  const handleSubmit = () => {
    console.log("create account");
  };

  return (
    <div className="Signup">
      <div className="signup-box">
        <h3 className="signup-title">CREATE AN ACCOUNT</h3>

        <form className="signup-form">
          <div className="signup-field">
            <label htmlFor="name">NAME</label>
            <input type="text" id="name" name="name" placeholder="name" />
          </div>

          <div className="signup-field">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" name="email" placeholder="email" />
          </div>

          <div className="signup-field">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
          <Button
            handleClick={handleSubmit}
            label="CREATE ACCOUNT"
            type="create-account-btn"
          />
        </form>

        <div className="login-redirect">
          <p>
            Already registered? <Link to="/login">Sign Into Your Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
