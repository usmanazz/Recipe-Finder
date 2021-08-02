import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./MyAccount.css";
import { Tabs } from "../../components/Tabs/Tabs";

export const MyAccount = ({
  setAuth,
  isAuthenticated,
  favoritesList,
  setFavoritesList,
}) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("userName" || ""));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setFavoritesList([]);
    setAuth(false);
    toast.success(`Successfully logged out!`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
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
