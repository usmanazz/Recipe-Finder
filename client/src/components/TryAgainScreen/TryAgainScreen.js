import React from "react";
import { Link } from "react-router-dom";

import "./TryAgainScreen.css";

export const TryAgainScreen = () => {
  return (
    <div className="TryAgainScreen">
      <h2 className="tryagain-text">
        Error occured while trying to fetch data. Please try again.
      </h2>
      <Link className="tryagain-btn" to="/">
        Try Again
      </Link>
    </div>
  );
};
