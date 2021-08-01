import React from "react";
import { toast } from "react-toastify";

import "./MyAccount.css";
import { Tabs } from "../../components/Tabs/Tabs";

export const MyAccount = ({
  setAuth,
  isAuthenticated,
  favoritesList,
  setFavoritesList,
}) => {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
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
      <div className="account-box">
        <div className="box-sub-titles">
          <h1 className="my-account-title">MY ACCOUNT</h1>
          <h1 className="logout-title" onClick={handleLogout}>
            Log out
          </h1>
        </div>
        <Tabs
          isAuthenticated={isAuthenticated}
          favoritesList={favoritesList}
          setFavoritesList={setFavoritesList}
        />
      </div>
    </div>
  );
};
