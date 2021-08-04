import React, { useRef, useState } from "react";
import { ChangeUsernameForm } from "../ChangeUsernameForm/ChangeUsernameForm";
import { ChangePasswordForm } from "../ChangePasswordForm/ChangePasswordForm";
import { FavoriteList } from "../FavoriteList/FavoriteList";
import "./Tabs.css";

export const Tabs = ({
  isAuthenticated,
  favoritesList,
  setFavoritesList,
  userName,
  setUserName,
}) => {
  const [toggleState, setToggleState] = useState(1);

  // initalize error states for change username/password here
  // to reset forms when user leaves account details tab
  const [renderUsernameError, setRenderUsernameError] = useState(false);
  const [usernameResMessage, setUsernameResMessage] = useState("");
  const [renderPasswordError, setRenderPasswordError] = useState(false);
  const [passwordResMessage, setPasswordResMessage] = useState("");

  // reference each formik form to reset input fields when visit favorities tab
  const usernameFormikRef = useRef();
  const passwordFormikRef = useRef();

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
          onClick={() => {
            toggleTab(1);

            // reset changeUserame form fields
            usernameFormikRef.current.resetForm();
            setRenderUsernameError(false);
            setUsernameResMessage("");

            // reset changePassword form fields
            passwordFormikRef.current.resetForm();
            setRenderPasswordError(false);
            setPasswordResMessage("");
          }}
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
          {/* render number of recipes user favorited */}
          {favoritesList.length !== 0 && (
            <h2 className="favorites-count">
              {favoritesList.length} Favorites
            </h2>
          )}

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
          <ChangeUsernameForm
            userName={userName}
            setUserName={setUserName}
            usernameFormikRef={usernameFormikRef}
            renderUsernameError={renderUsernameError}
            setRenderUsernameError={setRenderUsernameError}
            usernameResMessage={usernameResMessage}
            setUsernameResMessage={setUsernameResMessage}
          />
          <ChangePasswordForm
            passwordFormikRef={passwordFormikRef}
            renderPasswordError={renderPasswordError}
            setRenderPasswordError={setRenderPasswordError}
            passwordResMessage={passwordResMessage}
            setPasswordResMessage={setPasswordResMessage}
          />
        </div>
      </div>
    </div>
  );
};
