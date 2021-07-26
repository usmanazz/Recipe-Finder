import React, { useEffect } from "react";
import { Button } from "../../components/UI/Button";

import "./Recipe.css";
import starIcon from "./baseline_star_rate_white_24dp.png";
import { useParams } from "react-router";
import { NutritionInfo } from "../../components/NutritionInfo/NutritionInfo";
import { RecipeTags } from "../../components/RecipeTags/RecipeTags";
import { SessionExpiredScreen } from "../../components/SessionExpiredScreen/SessionExpiredScreen";

export const Recipe = ({ recipes, setRecipes, count, setCount }) => {
  const { id } = useParams();
  const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  // const storageRecipes = JSON.parse(sessionStorage.getItem("recipes"));
  // const recipe = storageRecipes.find((recipe) => recipe.id === parseInt(id));
  // const { extendedIngredients, sourceUrl, analyzedInstructions } = recipe;
  console.log("recipe", recipe);

  useEffect(() => {
    // to ensure reset on when visit homepage
    setCount((prev) => prev + 1);
  }, []);

  const handleFavClick = () => {
    console.log("favorited!");
  };

  // console.log("recipe page recipes: ", recipes);

  if (!recipe) {
    return <SessionExpiredScreen />;
  }
  return (
    <div className="Recipe">
      <div className="recipe-title-container">
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>

      <RecipeTags recipe={recipe} />

      <div className="info-container info-container-fix-format">
        <div className="cooktime-fav-container">
          <p className="cook-time">
            Cook Time: {recipe.readyInMinutes} minutes
          </p>

          <Button
            handleClick={handleFavClick}
            label="Favorite"
            type="fav-btn"
            iconLeft={starIcon}
          />
        </div>

        <NutritionInfo recipe={recipe} />
      </div>

      <div className="box-container">
        <div className="recipe-image-container same-margin">
          <img src={recipe.image} alt={`${recipe.title}`} />
        </div>

        <div className="ingredients-container same-margin">
          <h3 className="ingredients-title">Ingredients</h3>
          <div className="scroll-container">
            {recipe.extendedIngredients ? (
              <ol className="recipe-page-counter">
                {recipe.extendedIngredients.map((ingredient) => {
                  return <li key={ingredient.id}>{ingredient.original}</li>;
                })}
              </ol>
            ) : (
              <h4>
                <span>Can't process information</span>, Click{" "}
                <a className="originalrecipe-link" href={recipe.sourceUrl}>
                  here
                </a>{" "}
                for full list of instructions.
              </h4>
            )}
          </div>
        </div>

        <div className="instructions-container same-margin">
          <h3 className="instructions-title">Instructions</h3>
          {recipe.analyzedInstructions.length > 0 ? (
            <ol className="recipe-page-counter">
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          ) : (
            <h4>
              <span>Can't process information</span>, Click{" "}
              <a
                className="originalrecipe-link"
                href={recipe.sourceUrl}
                target="_blank"
              >
                here
              </a>{" "}
              for full list of instructions.
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};
