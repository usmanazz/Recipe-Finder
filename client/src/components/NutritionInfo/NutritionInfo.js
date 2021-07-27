import React from "react";
import { Button } from "../../components/UI/Button";

import "./NutritionInfo.css";
import { useParams } from "react-router";

export const NutritionInfo = ({ recipe }) => {
  const { nutrients } = recipe.nutrition;

  const handleViewInfoClick = () => {
    const viewInfoButton = document.querySelector(".view-info-btn");
    const nutritionDetails = document.querySelector(".nutrition-details");

    if (nutritionDetails.style.display === "block") {
      viewInfoButton.innerHTML = "View Info +";
      nutritionDetails.style.display = "none";
    } else {
      viewInfoButton.innerHTML = "Hide Info -";
      nutritionDetails.style.display = "block";
    }
  };

  return (
    <div className="NutritionInfo">
      <p className="nutrition-title">Nutrition Info</p>

      <Button
        handleClick={handleViewInfoClick}
        label="View Info +"
        type="view-info-btn"
      />

      <div className="nutrition-details">
        <p>
          Calories{" "}
          <span className="bold">{Math.floor(nutrients[0].amount)}</span>
        </p>

        <p>
          Fat{" "}
          <span className="bold">
            {Math.floor(nutrients[1].amount)}
            {nutrients[1].unit}
          </span>
        </p>

        <p>
          Carbs{" "}
          <span className="bold">
            {Math.floor(nutrients[3].amount)}
            {nutrients[3].unit}
          </span>
        </p>

        <p>
          Sugar{" "}
          <span className="bold">
            {Math.floor(nutrients[5].amount)}
            {nutrients[5].unit}
          </span>
        </p>

        <p>
          Protein{" "}
          <span className="bold">
            {Math.floor(nutrients[8].amount)}
            {nutrients[8].unit}
          </span>
        </p>

        <p className="nutrition-disclaimer">
          *Estimated values based <br /> on one serving size.
        </p>
      </div>
    </div>
  );
};
