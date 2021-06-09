import React from "react";
import { Link } from "react-router-dom";

import "./TryAgainScreen.css";

export const TryAgainScreen = () => {
  return (
    <div className="TryAgainScreen">
      <h2 className="tryagain-text">No Results Found</h2>
      <Link className="tryagain-btn" to="/">
        Try Again
      </Link>
    </div>
  );
};
