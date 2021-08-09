import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./IngredientsForm.css";
import { AddBar } from "../AddBar/AddBar";
import { IngredientList } from "../IngredientList/IngredientList";
import Spoonacular from "../../api/Spoonacular";
import { trackPromise } from "react-promise-tracker";

export const IngredientsForm = ({
  ingredients,
  setIngredients,
  text,
  setText,
  disableButton,
  setDisableButton,
  errors,
  setErrors,
  setRecipes,
}) => {
  const handleSubmit = () => {
    // track promise serves as wrapper to trigger loading screen when fetching data
    trackPromise(
      Spoonacular.searchRecipes(ingredients).then((recipes) => {
        sessionStorage.setItem("recipes", JSON.stringify(recipes));
        sessionStorage.setItem("ingredients", JSON.stringify(ingredients));
        setRecipes(JSON.parse(sessionStorage.getItem("recipes") || "[]"));
      })
    );
  };

  // Only display Submit button if at least one ingredient in list
  useEffect(() => {
    if (ingredients.length !== 0) {
      document.querySelector(".findrecipes-btn").style.display = "block";
    } else {
      document.querySelector(".findrecipes-btn").style.display = "none";
    }
  }, [ingredients]);

  return (
    <div className="IngredientsForm">
      <h1 className="ingred-form-title">What's In Your Kitchen?</h1>
      <h2 className="ingred-form-subtitle">Enter up to 5 ingredients</h2>
      <AddBar
        ingredients={ingredients}
        setIngredients={setIngredients}
        text={text}
        setText={setText}
        disableButton={disableButton}
        setDisableButton={setDisableButton}
        errors={errors}
        setErrors={setErrors}
      />
      <span className="error">{errors["name"]}</span>
      <IngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
      />

      <Link
        className="findrecipes-btn"
        to="/results"
        onClick={() => {
          handleSubmit();
        }}
      >
        Find Recipes
      </Link>
    </div>
  );
};
