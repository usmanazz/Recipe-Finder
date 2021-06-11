import React from "react";

import "./Login.css";
import { Button } from "../../components/UI/Button";
import { Link } from "react-router-dom";

export const Login = () => {
  const handleSubmit = () => {
    console.log("login");
  };

  return (
    <div className="Login">
      <div className="login-box">
        <h3 className="login-title">LOGIN INTO MY ACCOUNT</h3>

        <form className="login-form">
          <div className="login-field">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" name="email" placeholder="email" />
          </div>

          <div className="login-field">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
            />
          </div>
          <Button handleClick={handleSubmit} label="LOG IN" type="login-btn" />
        </form>

        <div className="login-redirect">
          <p>
            New to Recipe Finder? <Link to="/signup">Create An Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
