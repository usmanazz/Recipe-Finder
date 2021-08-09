import React, { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button";

import "./Recipe.css";
import starIcon from "./baseline_star_rate_white_24dp.png";
import { useParams } from "react-router";
import { NutritionInfo } from "../../components/NutritionInfo/NutritionInfo";
import { RecipeTags } from "../../components/RecipeTags/RecipeTags";
import { SessionExpiredScreen } from "../../components/SessionExpiredScreen/SessionExpiredScreen";
import favoritesApi from "../../api/Favorites";
import notifications from "../../components/UI/Notifications";

export const Recipe = ({
  recipes,
  setCount,
  isAuthenticated,
  favoritesList,
  setFavoritesList,
}) => {
  const { id } = useParams();

  // get recipe from either user's favorite list or results page
  const userFavRecipe =
    favoritesList.length !== 0
      ? favoritesList.find((favorite) => favorite.id === parseInt(id))
      : null;
  const resultsRecipe =
    recipes.length !== 0
      ? recipes.find((recipe) => recipe.id === parseInt(id))
      : null;

  const recipe = userFavRecipe ? userFavRecipe : resultsRecipe;
  const [renderFavButton, setRenderFavButton] = useState(false);

  const handleDelete = () => {
    const newFavList = favoritesList.filter((fav) => fav.id !== recipe.id);
    setFavoritesList(newFavList);
  };

  // to ensure reset when visit homepage
  useEffect(() => {
    setCount((prev) => prev + 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render favorite button based on user's favorites
  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const favorites = await favoritesApi.getFavorites();
        if (favorites.length !== 0) {
          const parseFavorites = favorites.map((recipe) =>
            JSON.parse(recipe.recipe_info)
          );
          const favorite = parseFavorites.find(
            (recipe) => recipe.id === parseInt(id)
          );
          favorite ? setRenderFavButton(true) : setRenderFavButton(false);
        }
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // either favorite or unfavorite recipe if the user is logged in
  const handleFavClick = async () => {
    if (isAuthenticated) {
      if (!renderFavButton) {
        const body = {
          recipeId: recipe.id,
          recipeInfo: recipe,
        };
        await favoritesApi.addRecipeToFavorites(body);
        setRenderFavButton(true);
        notifications.success("Added to Favorites!", 2000);
      } else if (renderFavButton) {
        const body = {
          recipeId: recipe.id,
        };
        await favoritesApi.removeRecipeFromFavorites(body);
        setRenderFavButton(false);
        // to update fav list on account page
        handleDelete();
        notifications.success("Removed from Favorites!", 2000);
      }
    } else {
      notifications.error("Log In to Save Recipe!", 3000);
    }
  };

  // can't persist recipe page so render session expired screen
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
            label={renderFavButton ? "Unfavorite" : "Favorite"}
            type={renderFavButton ? "fav-btn unfav-btn-width" : "fav-btn"}
            iconLeft={starIcon}
          />
        </div>

        <NutritionInfo recipe={recipe} />
      </div>

      <div className="box-container">
        <div className="recipe-image-container same-margin">
          <img src={recipe.image} alt={`${recipe.title}`} />
        </div>

        {/* render list of ingredients */}
        {/* if no ingredients from fetched data, then provide link to original web page */}
        <div className="ingredients-container same-margin">
          <h3 className="ingredients-title">Ingredients</h3>
          <div className="scroll-container">
            {recipe.extendedIngredients ? (
              <ol className="recipe-page-counter">
                {recipe.extendedIngredients.map((ingredient, idx) => {
                  return <li key={idx}>{ingredient.original}</li>;
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

        {/* similar to displaying ingredients */}
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
              <span>Can't process information</span>, Click //
              {/* eslint-disable-next-line */}
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
