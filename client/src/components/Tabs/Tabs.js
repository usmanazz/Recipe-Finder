import { useState } from "react";
import "./Tabs.css";

import { ChangeUsernameForm } from "../ChangeUsernameForm/ChangeUsernameForm";
import { ChangePasswordForm } from "../ChangePasswordForm/ChangePasswordForm";
import { FavoriteList } from "../FavoriteList/FavoriteList";

export const Tabs = ({ isAuthenticated, favoritesList, setFavoritesList }) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="tabs-container">
      <div className="bloc-tabs">
        <button
          className={
            toggleState === 1
              ? "tabs active-tabs favorite-tab"
              : "tabs favorite-tab account-tab"
          }
          onClick={() => toggleTab(1)}
        >
          FAVORITES
        </button>
        <button
          className={
            toggleState === 2
              ? "tabs active-tabs account-tab"
              : "tabs account-tab"
          }
          onClick={() => toggleTab(2)}
        >
          ACCOUNT DETAILS
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={
            toggleState === 1 ? "content active-content-tab2" : "content"
          }
        >
          <h2>5 of 5 Favorites</h2>
          <FavoriteList
            isAuthenticated={isAuthenticated}
            favoritesList={favoritesList}
            setFavoritesList={setFavoritesList}
          />
        </div>

        <div
          className={
            toggleState === 2 ? "content active-content-tab1" : "content"
          }
        >
          <ChangeUsernameForm />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};
