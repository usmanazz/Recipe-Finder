import React from "react";
import "./LoadingScreen.css";
import { usePromiseTracker } from "react-promise-tracker";

export const LoadingScreen = () => {
  // hook to trigger loading screen if promise for fetching food recipes is still processing
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
