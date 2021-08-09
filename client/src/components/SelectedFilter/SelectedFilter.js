import React, { useEffect } from "react";
import deleteIcon from "./baseline_clear_black_24dp.png";
import { Button } from "../UI/Button";
import "./SelectedFilter.css";

export const SelectedFilter = ({
  selectedRadio,
  setSelectedRadio,
  cookTime,
  setCookTime,
  numOfIngredients,
  setNumOfIngredients,
  calories,
  setCalories,
  setSelectedFilterDisplayed,
}) => {
  useEffect(() => {
    handleSelectedFilterDisplayed();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveFilter = (setter, value) => {
    setter(value);
  };

  const handleClearAll = () => {
    setSelectedRadio("");
    setCookTime([0, 200]);
    setNumOfIngredients([0, 20]);
    setCalories([0, 2000]);
  };

  // set state to dynamically render message on results page
  const handleSelectedFilterDisplayed = () => {
    if (
      selectedRadio !== "" ||
      cookTime[0] !== 0 ||
      cookTime[1] !== 200 ||
      numOfIngredients[0] !== 0 ||
      numOfIngredients[1] !== 20 ||
      calories[0] !== 0 ||
      calories[1] !== 2000
    ) {
      setSelectedFilterDisplayed(true);
    } else {
      setSelectedFilterDisplayed(false);
    }
  };

  // only display selected filters if user applied any filters
  if (
    selectedRadio !== "" ||
    cookTime[0] !== 0 ||
    cookTime[1] !== 200 ||
    numOfIngredients[0] !== 0 ||
    numOfIngredients[1] !== 20 ||
    calories[0] !== 0 ||
    calories[1] !== 2000
  ) {
    return (
      <div className="SelectedFilter">
        <p className="selected-filter-label">Selected filter: </p>

        {selectedRadio ? (
          <Button
            handleClick={() => handleRemoveFilter(setSelectedRadio, "")}
            label={selectedRadio}
            type="selected-filter-btn"
            iconLeft={deleteIcon}
          />
        ) : null}

        {cookTime[0] !== 0 || cookTime[1] !== 200 ? (
          <Button
            handleClick={() => handleRemoveFilter(setCookTime, [0, 200])}
            label={`${cookTime[0]} - ${cookTime[1]} min`}
            type="selected-filter-btn"
            iconLeft={deleteIcon}
          />
        ) : null}

        {numOfIngredients[0] !== 0 || numOfIngredients[1] !== 20 ? (
          <Button
            handleClick={() => handleRemoveFilter(setNumOfIngredients, [0, 20])}
            label={`${numOfIngredients[0]} - ${numOfIngredients[1]} ingredients`}
            type="selected-filter-btn"
            iconLeft={deleteIcon}
          />
        ) : null}

        {calories[0] !== 0 || calories[1] !== 2000 ? (
          <Button
            handleClick={() => handleRemoveFilter(setCalories, [0, 2000])}
            label={`${calories[0]} - ${calories[1]} cal`}
            type="selected-filter-btn"
            iconLeft={deleteIcon}
          />
        ) : null}

        <Button
          handleClick={handleClearAll}
          label="Clear all"
          type="clear-all-btn"
        />
      </div>
    );
  } else {
    return null;
  }
};
