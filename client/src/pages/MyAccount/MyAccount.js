import React, { useEffect, useState } from "react";

import "./MyAccount.css";
import { Tabs } from "../../components/Tabs/Tabs";
import notifications from "../../components/UI/Notifications";

export const MyAccount = ({
  setAuth,
  isAuthenticated,
  favoritesList,
  setFavoritesList,
}) => {
  const [userName, setUserName] = useState("");

  // persist logged in user's name
  useEffect(() => {
    setUserName(localStorage.getItem("userName" || ""));
  }, []);

  // On logout:
  //    1. remove the user's token and nam from localstorage
  //    2. reset favorite list state to prevent rendering curr user's favs
  //    3. set auth to false to indicate user logged out
  //    4. render notification to user
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setFavoritesList([]);
    setAuth(false);
    notifications.success("Successfully logged out!", 2500);
  };

  return (
    <div className="MyAccount">
      <h1 className="my-account-title">MY ACCOUNT</h1>
      <div className="account-box">
        <div className="box-sub-titles">
          <h1 className="user-title">
            {userName !== "" ? `Hi ${userName}!` : null}
          </h1>
          <h1 className="logout-title" onClick={handleLogout}>
            Log out
          </h1>
        </div>

        <Tabs
          isAuthenticated={isAuthenticated}
          favoritesList={favoritesList}
          setFavoritesList={setFavoritesList}
          userName={userName}
          setUserName={setUserName}
        />
      </div>
    </div>
  );
};
