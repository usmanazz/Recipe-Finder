import React from "react";
import "./LoadingScreen.css";
import { usePromiseTracker } from "react-promise-tracker";

export const LoadingScreen = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="LoadingScreen">
        <h2 className="loading-text">Loading</h2>
        <div className="loader"></div>
      </div>
    )
  );
};
