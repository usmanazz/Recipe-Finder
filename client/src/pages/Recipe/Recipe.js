import React, { useEffect, useState } from "react";
import { Button } from "../../components/UI/Button";
import { toast } from "react-toastify";

import "./Recipe.css";
import starIcon from "./baseline_star_rate_white_24dp.png";
import { useParams } from "react-router";
import { NutritionInfo } from "../../components/NutritionInfo/NutritionInfo";
import { RecipeTags } from "../../components/RecipeTags/RecipeTags";
import { SessionExpiredScreen } from "../../components/SessionExpiredScreen/SessionExpiredScreen";

export const Recipe = ({
  recipes,
  setRecipes,
  count,
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
  // const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
  const [renderFavButton, setRenderFavButton] = useState(false);
  // const storageRecipes = JSON.parse(sessionStorage.getItem("recipes"));
  // const recipe = storageRecipes.find((recipe) => recipe.id === parseInt(id));
  // const { extendedIngredients, sourceUrl, analyzedInstructions } = recipe;
  // console.log("recipe", JSON.stringify(recipe));

  const handleDelete = () => {
    const newFavList = favoritesList.filter((fav) => fav.id !== recipe.id);
    setFavoritesList(newFavList);
  };

  useEffect(() => {
    // to ensure reset when visit homepage
    setCount((prev) => prev + 1);
  }, []);

  // render favorite button based on user's favorites
  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const favorites = await getFavorites();
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
  }, []);

  // api call to get user's list of favorites
  const getFavorites = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/get-favorites",
        {
          method: "GET",
          headers: { token: localStorage.token },
        }
      );

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  };

  // api call to add recipe to user's favorites
  const addRecipeToFavorites = async () => {
    try {
      const body = {
        recipeId: recipe.id,
        recipeInfo: recipe,
      };

      const response = await fetch(
        "http://localhost:5000/dashboard/add-favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      setRenderFavButton(true);
    } catch (err) {
      console.log(err);
    }
  };

  // api call to remove recipe from user's favorites
  const removeRecipeFromFavorites = async () => {
    try {
      const body = {
        recipeId: recipe.id,
      };

      const response = await fetch(
        "http://localhost:5000/dashboard/remove-favorite",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.token,
          },
          body: JSON.stringify(body),
        }
      );

      setRenderFavButton(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavClick = () => {
    console.log("favorited!");

    // user needs to be logged in to favorite/unfavorite
    if (isAuthenticated) {
      // user wants to favorite recipe
      if (!renderFavButton) {
        addRecipeToFavorites();
        toast.success("Added to Favorites!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
      // user wants to unfavorite recipe
      else if (renderFavButton) {
        removeRecipeFromFavorites();
        // to update fav list on account page
        handleDelete();
        toast.success("Removed from Favorites!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } else {
      // toast("Log In to Save Recipe!", {
      //   autoClose: 3000,
      //   style: {
      //     backgroundColor: "black",
      //     color: "white",
      //   },
      //   progressStyle: { background: "white" },
      // });
      toast.error("Log In to Save Recipe!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

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
