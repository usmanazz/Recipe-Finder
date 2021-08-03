import React from "react";
import "./RecipeCard.css";

export const RecipeCard = ({ recipe }) => {
  const calories = Math.floor(
    recipe.nutrition.nutrients.find((element) => element.name === "Calories")
      .amount
  );

  return (
    <div className="RecipeCard">
      <div
        className="recipecard-image"
        style={{ backgroundImage: `url(${recipe.image})` }}
      ></div>
      <div className="recipecard-content">
        <h3 className="recipecard-title">{recipe.title}</h3>
        <p className="recipecard-ingredients">
          ingredients: {recipe.extendedIngredients.length} | servings:{" "}
          {recipe.servings}
        </p>
        <p className="recipecard-cooktime">
          ready in: {recipe.readyInMinutes}min | {calories}cal.
        </p>
      </div>
    </div>
  );
};
