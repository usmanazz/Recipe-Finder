import React from "react";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  const pathname = window.location.pathname;
  return (
    <div className="NotFoundPage">
      <h2 className="notfound-text">
        <span className="four-o-four">404.</span> Page Not Found. <br />
        <br /> The requested URL {pathname} was not found on this server.
      </h2>
    </div>
  );
};
