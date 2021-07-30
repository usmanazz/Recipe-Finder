import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import "./FilterModal.css";
import RangeSlider from "../UI/RangeSlider";
import { Button } from "../UI/Button";

export const FilterModal = ({
  show,
  setShow,
  selectedRadio,
  setSelectedRadio,
  cookTime,
  setCookTime,
  numOfIngredients,
  setNumOfIngredients,
  calories,
  setCalories,
  handleRadioChange,
}) => {
  const onCloseModal = () => setShow(false);

  return (
    <Modal style={{ width: "100%" }} open={show} onClose={onCloseModal} center>
      <div className="modal-title-container">
        <h2 className="modal-title">FILTERS</h2>
      </div>

      <div className="mobile-filters">
        <div className="mobile-filter-section border-bottom border-top">
          <h3 className="mobile-filter-title">ALPHABETIC ORDER</h3>

          <div className="alpha-order-radios">
            <label className="mobile-radio">
              a - z
              <input
                type="radio"
                name="alphabeticOrder"
                id="AtoZ"
                value="a - z"
                checked={selectedRadio === "a - z"}
                onChange={handleRadioChange}
              />
              <span className="checkmark-mobile"></span>
            </label>

            <label className="mobile-radio">
              z - a
              <input
                type="radio"
                name="alphabeticOrder"
                id="ZtoA"
                value="z - a"
                checked={selectedRadio === "z - a"}
                onChange={handleRadioChange}
              />
              <span className="checkmark-mobile"></span>
            </label>
          </div>
        </div>

        <div className="mobile-filter-section border-bottom">
          <h3 className="mobile-filter-title">COOK TIME</h3>
          <RangeSlider
            value={cookTime}
            setValue={setCookTime}
            unit={"min"}
            min={0}
            max={200}
            step={10}
          />
        </div>

        <div className="mobile-filter-section border-bottom">
          <h3 className="mobile-filter-title"># OF INGREDIENTS</h3>
          <RangeSlider
            value={numOfIngredients}
            setValue={setNumOfIngredients}
            unit={""}
            min={0}
            max={20}
            step={1}
          />
        </div>

        <div className="mobile-filter-section">
          <h3 className="mobile-filter-title">CALORIES</h3>
          <RangeSlider
            value={calories}
            setValue={setCalories}
            unit={"cal"}
            min={0}
            max={2000}
            step={100}
          />
        </div>
      </div>

      <div className="apply-filters-container border-top">
        <Button
          handleClick={onCloseModal}
          label="APPLY FILTERS"
          type="apply-filters-btn"
        />
      </div>
    </Modal>
  );
};
