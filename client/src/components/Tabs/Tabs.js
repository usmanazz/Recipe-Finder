import { useState } from "react";
import "./Tabs.css";

import { ChangeUsernameForm } from "../ChangeUsernameForm/ChangeUsernameForm";
import { ChangePasswordForm } from "../ChangePasswordForm/ChangePasswordForm";

export const Tabs = () => {
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
              ? "tabs active-tabs account-tab"
              : "tabs account-tab"
          }
          onClick={() => toggleTab(1)}
        >
          ACCOUNT DETAILS
        </button>
        <button
          className={
            toggleState === 2
              ? "tabs active-tabs favorite-tab"
              : "tabs favorite-tab"
          }
          onClick={() => toggleTab(2)}
        >
          FAVORITES
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {/* <h2>Change Username</h2> */}
          {/* <hr /> */}
          <ChangeUsernameForm />
          <ChangePasswordForm />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>Content 2</h2>
          {/* <hr /> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            voluptatum qui adipisci.
          </p>
        </div>
      </div>
    </div>
  );
};
