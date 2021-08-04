import React, { useEffect, useState } from "react";
import { Button } from "../UI/Button";

import "./Filters.css";
import downArrowIcon from "./outline_keyboard_arrow_down_black_24dp.png";
import filterIcon from "./baseline_sort_black_24dp.png";
import RangeSlider from "../UI/RangeSlider";
import { FilterModal } from "../FilterModal/FilterModal";

export const Filters = ({
  selectedRadio,
  setSelectedRadio,
  cookTime,
  setCookTime,
  numOfIngredients,
  setNumOfIngredients,
  calories,
  setCalories,
}) => {
  const [show, setShow] = useState(false);

  // Get css styles associated with specific filter
  const alphaOrderFilter = document.querySelector(".alphabetic-order-filters");
  const cookTimeFilter = document.querySelector(".cook-time-filters");
  const numIngredientsFilter = document.querySelector(
    ".num-ingredients-filters"
  );
  const caloriesFilter = document.querySelector(".calories-filters");
  const alphaOrderButton = document.querySelector(".button.alpha-order-btn");
  const cookTimeButton = document.querySelector(".button.cook-time-btn");
  const numIngredientsButton = document.querySelector(
    ".button.num-ingredients-btn"
  );
  const caloriesButton = document.querySelector(".button.calories-btn");

  // display filter&sort button for small screen sizes
  const handleFilterNSort = () => {
    setShow(true);
  };

  // set state for selected radio button
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  // event listener to close any open filters when at browser window
  // width for smaller screen sizes
  useEffect(() => {
    window.addEventListener("resize", handleCloseFilter);
  }, []);

  // close filter if resize window less than 1024px
  const handleCloseFilter = () => {
    // checks if current page is results page
    if (window.location.href.indexOf("results") > -1) {
      // grab filters buttons
      const alphaOrderButton = document.querySelector(
        ".button.alpha-order-btn"
      );
      const cookTimeButton = document.querySelector(".button.cook-time-btn");
      const numIngredientsButton = document.querySelector(
        ".button.num-ingredients-btn"
      );
      const caloriesButton = document.querySelector(".button.calories-btn");

      const alphaOrderFilter = document.querySelector(
        ".alphabetic-order-filters"
      );
      const cookTimeFilter = document.querySelector(".cook-time-filters");
      const numIngredientsFilter = document.querySelector(
        ".num-ingredients-filters"
      );
      const caloriesFilter = document.querySelector(".calories-filters");

      // if any filter is currently displayed and window size is now at
      // width for smaller screen sizes, reset filter button styles and do not display filter
      if (
        window.innerWidth < 1024 &&
        alphaOrderFilter.classList.contains("display-filters")
      ) {
        alphaOrderButton.classList.toggle("filter-btn-styles-pre");
        alphaOrderButton.classList.toggle("filter-btn-styles-post");
        alphaOrderFilter.classList.toggle("display-filters");
      } else if (
        window.innerWidth < 1024 &&
        cookTimeFilter.classList.contains("display-filters")
      ) {
        cookTimeButton.classList.toggle("filter-btn-styles-pre");
        cookTimeButton.classList.toggle("filter-btn-styles-post");
        cookTimeFilter.classList.toggle("display-filters");
      } else if (
        window.innerWidth < 1024 &&
        numIngredientsFilter.classList.contains("display-filters")
      ) {
        numIngredientsButton.classList.toggle("filter-btn-styles-pre");
        numIngredientsButton.classList.toggle("filter-btn-styles-post");
        numIngredientsFilter.classList.toggle("display-filters");
      } else if (
        window.innerWidth < 1024 &&
        caloriesFilter.classList.contains("display-filters")
      ) {
        caloriesButton.classList.toggle("filter-btn-styles-pre");
        caloriesButton.classList.toggle("filter-btn-styles-post");
        caloriesFilter.classList.toggle("display-filters");
      }
    }
  };

  // ************
  //
  // Function to display filter clicked by user and un-display any filters
  // currently being displayed. Ensures only 1 filter displayed at a time
  //
  // ************

  const handleDisplayFilter = (
    filter1,
    filter1Btn,
    filter2,
    filter2Btn,
    filter3,
    filter3Btn,
    filter4,
    filter4Btn
  ) => {
    filter1Btn.classList.toggle("filter-btn-styles-pre");
    filter1Btn.classList.toggle("filter-btn-styles-post");
    filter1.classList.toggle("display-filters");

    if (filter2.classList.contains("display-filters")) {
      filter2Btn.classList.toggle("filter-btn-styles-pre");
      filter2Btn.classList.toggle("filter-btn-styles-post");
      filter2.classList.toggle("display-filters");
    }
    if (filter3.classList.contains("display-filters")) {
      filter3Btn.classList.toggle("filter-btn-styles-pre");
      filter3Btn.classList.toggle("filter-btn-styles-post");
      filter3.classList.toggle("display-filters");
    }
    if (filter4.classList.contains("display-filters")) {
      filter4Btn.classList.toggle("filter-btn-styles-pre");
      filter4Btn.classList.toggle("filter-btn-styles-post");
      filter4.classList.toggle("display-filters");
    }
  };

  return (
    <div className="Filters">
      <p className="filters-label">FILTERS: </p>
      <Button
        handleClick={handleFilterNSort}
        label="FILTER & SORT"
        type="filter-and-sort-btn"
        iconRight={filterIcon}
      />

      {/* display filter modal for smaller screen sizes */}
      <FilterModal
        show={show}
        setShow={setShow}
        selectedRadio={selectedRadio}
        setSelectedRadio={setSelectedRadio}
        cookTime={cookTime}
        setCookTime={setCookTime}
        numOfIngredients={numOfIngredients}
        setNumOfIngredients={setNumOfIngredients}
        calories={calories}
        setCalories={setCalories}
        handleRadioChange={handleRadioChange}
      />

      <div className="alphabetic-order filter-styles">
        <Button
          handleClick={() => {
            handleDisplayFilter(
              alphaOrderFilter,
              alphaOrderButton,
              cookTimeFilter,
              cookTimeButton,
              numIngredientsFilter,
              numIngredientsButton,
              caloriesFilter,
              caloriesButton
            );
          }}
          label="ALPHABETIC ORDER"
          type="alpha-order-btn filter-btn-styles-pre"
          iconRight={downArrowIcon}
        />

        <div className="alphabetic-order-filters filter-content">
          <label className="radio">
            a - z
            <input
              type="radio"
              name="alphabeticOrder"
              id="AtoZ"
              value="a - z"
              checked={selectedRadio === "a - z"}
              onChange={handleRadioChange}
            />
            <span className="checkmark"></span>
          </label>

          <label className="radio">
            z - a
            <input
              type="radio"
              name="alphabeticOrder"
              id="ZtoA"
              value="z - a"
              checked={selectedRadio === "z - a"}
              onChange={handleRadioChange}
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>

      <div className="cook-time-filter filter-styles">
        <Button
          handleClick={() => {
            handleDisplayFilter(
              cookTimeFilter,
              cookTimeButton,
              alphaOrderFilter,
              alphaOrderButton,
              numIngredientsFilter,
              numIngredientsButton,
              caloriesFilter,
              caloriesButton
            );
          }}
          label="COOK TIME"
          type="cook-time-btn filter-btn-styles-pre"
          iconRight={downArrowIcon}
        />

        <div className="cook-time-filters filter-content">
          <RangeSlider
            value={cookTime}
            setValue={setCookTime}
            unit={"min"}
            min={0}
            max={200}
            step={10}
          />
        </div>
      </div>

      <div className="num-ingredients-filter filter-styles">
        <Button
          handleClick={() => {
            handleDisplayFilter(
              numIngredientsFilter,
              numIngredientsButton,
              alphaOrderFilter,
              alphaOrderButton,
              cookTimeFilter,
              cookTimeButton,
              caloriesFilter,
              caloriesButton
            );
          }}
          label="# OF INGREDIENTS"
          type="num-ingredients-btn filter-btn-styles-pre"
          iconRight={downArrowIcon}
        />

        <div className="num-ingredients-filters filter-content">
          <RangeSlider
            value={numOfIngredients}
            setValue={setNumOfIngredients}
            unit={""}
            min={0}
            max={20}
            step={1}
          />
        </div>
      </div>

      <div className="calories-filter filter-styles">
        <Button
          handleClick={() => {
            handleDisplayFilter(
              caloriesFilter,
              caloriesButton,
              alphaOrderFilter,
              alphaOrderButton,
              cookTimeFilter,
              cookTimeButton,
              numIngredientsFilter,
              numIngredientsButton
            );
          }}
          label="CALORIES"
          type="calories-btn filter-btn-styles-pre"
          iconRight={downArrowIcon}
        />

        <div className="calories-filters filter-content">
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
    </div>
  );
};
