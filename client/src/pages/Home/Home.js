import React from "react";

import { IngredientsForm } from "../../components/IngredientsForm/IngredientsForm";
import "./Home.css";

export const Home = ({
  ingredients,
  setIngredients,
  text,
  setText,
  disableButton,
  setDisableButton,
  errors,
  setErrors,
  recipes,
  setRecipes,
  isLoading,
  setIsLoading,
}) => {
  return (
    <div className="Home">
      <h2 className="how-it-works-link">
        <a href="/About">How it Works?</a>
      </h2>
      <IngredientsForm
        className="form-container"
        ingredients={ingredients}
        setIngredients={setIngredients}
        text={text}
        setText={setText}
        disableButton={disableButton}
        setDisableButton={setDisableButton}
        errors={errors}
        setErrors={setErrors}
        recipes={recipes}
        setRecipes={setRecipes}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};
