import React, { useState } from "react";
import { Button } from "../../components/UI/Button";
import { Modal } from "react-responsive-modal";
import "./NutritionInfo.css";

export const NutritionInfo = ({ recipe }) => {
  const [show, setShow] = useState(false);
  const { nutrients } = recipe.nutrition;

  const onCloseModal = () => setShow(false);

  const handleViewInfoClick = () => {
    const viewInfoButton = document.querySelector(".view-info-btn");
    const nutritionDetails = document.querySelector(".nutrition-details");

    if (window.innerWidth <= 550) {
      if (nutritionDetails.style.display === "block") {
        viewInfoButton.innerHTML = "View Info +";
        nutritionDetails.style.display = "none";
      } else {
        viewInfoButton.innerHTML = "Hide Info -";
        nutritionDetails.style.display = "block";
      }
    } else {
      setShow(true);
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

      <Modal
        style={{ width: "100%" }}
        open={show}
        onClose={onCloseModal}
        center
      >
        <div className="modal-title-container">
          <h2 className="modal-title">NUTRITION INFO</h2>
        </div>

        <div className="modal-details">
          <p className="macro-info">
            Calories{" "}
            <span className="bold">{Math.floor(nutrients[0].amount)}</span>
          </p>

          <p className="macro-info">
            Fat{" "}
            <span className="bold">
              {Math.floor(nutrients[1].amount)}
              {nutrients[1].unit}
            </span>
          </p>

          <p className="macro-info">
            Carbs{" "}
            <span className="bold">
              {Math.floor(nutrients[3].amount)}
              {nutrients[3].unit}
            </span>
          </p>

          <p className="macro-info">
            Sugar{" "}
            <span className="bold">
              {Math.floor(nutrients[5].amount)}
              {nutrients[5].unit}
            </span>
          </p>

          <p className="macro-info">
            Protein{" "}
            <span className="bold">
              {Math.floor(nutrients[8].amount)}
              {nutrients[8].unit}
            </span>
          </p>

          <p className="modal-nutrition-disclaimer macro-info">
            *Estimated values based <br /> on one serving size.
          </p>
        </div>
      </Modal>

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
