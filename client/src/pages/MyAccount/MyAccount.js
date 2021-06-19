import React from "react";

import "./MyAccount.css";
import { Tabs } from "../../components/Tabs/Tabs";

export const MyAccount = () => {
  return (
    <div className="MyAccount">
      <div className="account-box">
        <div className="box-sub-titles">
          <h1 className="my-account-title">MY ACCOUNT</h1>
          <h1 className="logout-title">Log out</h1>
        </div>

        <Tabs />
      </div>
    </div>
  );
};
