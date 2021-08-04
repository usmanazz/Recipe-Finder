import React from "react";
import { Link } from "react-router-dom";

import "./SessionExpiredScreen.css";

// display page when user refreshes recipe page
export const SessionExpiredScreen = () => {
  return (
    <div className="SessionExpiredScreen">
      <h2 className="session-expired-text">Session Expired</h2>
      <Link className="session-expired-btn" to="/">
        Search More Recipes
      </Link>
    </div>
  );
};
