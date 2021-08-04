import React from "react";

// Custom Button component
export const Button = ({
  handleClick,
  label,
  type,
  isDisabled,
  iconLeft,
  iconRight,
}) => {
  const className = `button ${type}`;

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {iconLeft ? <img src={iconLeft} alt="favorite button icon" /> : null}
      {label}
      {iconRight ? <img src={iconRight} alt="filter and sort icon" /> : null}
    </button>
  );
};
