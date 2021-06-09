import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Results.css";
import { Filters } from "../../components/Filters/Filters";
import { SelectedFilter } from "../../components/SelectedFilter/SelectedFilter";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { Button } from "../../components/UI/Button";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { TryAgainScreen } from "../../components/TryAgainScreen/TryAgainScreen";

export const Results = ({
  ingredients,
  recipes,
  setRecipes,
  recipesToShow,
  setRecipesToShow,
  next,
  setNext,
  isLoading,
  setIsLoading,
}) => {
  const recipesPerPage = 2;
  const [selectedRadio, setSelectedRadio] = useState("");
  const [cookTime, setCookTime] = useState([0, 200]);
  const [numOfIngredients, setNumOfIngredients] = useState([0, 20]);
  const [calories, setCalories] = useState([0, 2000]);

  useEffect(() => {
    loopWithSlice(0, recipesPerPage);
  }, [recipes]);

  const loopWithSlice = (start, end) => {
    const recipeIds = recipesToShow.map((element) => element.id);
    const slicedRecipes = recipes
      .slice(start, end)
      .filter((element) => !recipeIds.includes(element.id));
    setRecipesToShow((prev) => [...prev, ...slicedRecipes]);
  };

  const handleLoadMoreRecipes = () => {
    loopWithSlice(next, next + recipesPerPage);
    setNext(next + recipesPerPage);
  };

  const alphaOrderFilterRecipes = () => {
    if (selectedRadio === "a - z") {
      return [...recipesToShow].sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (selectedRadio === "z - a") {
      return [...recipesToShow].sort((a, b) => (a.title > b.title ? -1 : 1));
    } else {
      return recipesToShow;
    }
  };

  const cookTimeFilterRecipes = (recipes) => {
    return recipes.filter(
      (recipe) =>
        recipe.readyInMinutes >= cookTime[0] &&
        recipe.readyInMinutes <= cookTime[1]
    );
  };

  const numOfIngredientsFilterRecipes = (recipes) => {
    return recipes.filter(
      (recipe) =>
        recipe.extendedIngredients.length >= numOfIngredients[0] &&
        recipe.extendedIngredients.length <= numOfIngredients[1]
    );
  };

  const caloriesFilterRecipes = (recipes) => {
    return recipes.filter((recipe) => {
      const recipeCalories = Math.floor(
        recipe.nutrition.nutrients.find(
          (element) => element.name === "Calories"
        ).amount
      );
      return recipeCalories >= calories[0] && recipeCalories <= calories[1];
    });
  };

  const alphaOrderFilteredRecipes = alphaOrderFilterRecipes();
  const cookTimeFilteredRecipes = cookTimeFilterRecipes(
    alphaOrderFilteredRecipes
  );
  const numOfIngredientsFilteredRecipes = numOfIngredientsFilterRecipes(
    cookTimeFilteredRecipes
  );
  const caloriesFilteredRecipes = caloriesFilterRecipes(
    numOfIngredientsFilteredRecipes
  );

  const mapRecipes = () => {
    return caloriesFilteredRecipes.map((recipe) => (
      <Link
        className="recipecard-link"
        to={`/recipe/${recipe.id}`}
        key={recipe.id}
      >
        <RecipeCard recipe={recipe} />
      </Link>
    ));
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else if (isLoading && recipes.length === 0) {
    return <TryAgainScreen />;
  } else if (!isLoading && recipes.length === 0) {
    return <TryAgainScreen />;
  }
  return (
    <div className="Results">
      <div className="results-title-container">
        <h2 className="results-title">
          Results for:{" "}
          {ingredients.length === 1
            ? ingredients[0]
            : ingredients.map((ingredient, index) =>
                index < ingredients.length - 1 ? `${ingredient}, ` : ingredient
              )}
        </h2>
        <p className="recipe-count">Found {`${recipes.length}`} recipes</p>
      </div>

      <div className="filters-section">
        <Filters
          selectedRadio={selectedRadio}
          setSelectedRadio={setSelectedRadio}
          cookTime={cookTime}
          setCookTime={setCookTime}
          numOfIngredients={numOfIngredients}
          setNumOfIngredients={setNumOfIngredients}
          calories={calories}
          setCalories={setCalories}
        />
        <SelectedFilter
          selectedRadio={selectedRadio}
          setSelectedRadio={setSelectedRadio}
          cookTime={cookTime}
          setCookTime={setCookTime}
          numOfIngredients={numOfIngredients}
          setNumOfIngredients={setNumOfIngredients}
          calories={calories}
          setCalories={setCalories}
        />
      </div>

      {caloriesFilteredRecipes.length > 0 ? (
        <>
          <div className="recipe-cards-container">{mapRecipes()}</div>

          <div className="load-view-container">
            {recipesToShow.length === recipes.length ? null : (
              <Button
                handleClick={handleLoadMoreRecipes}
                label="LOAD MORE"
                type="load-more-btn"
              />
            )}
            <p className="view-recipe-count">
              Viewing 1 - {recipesToShow.length} of {recipes.length} recipes
            </p>
          </div>
        </>
      ) : (
        <p className="no-filter-selection-message">
          We couldn't find anything for your filter selection. Please try
          another combination.
        </p>
      )}
    </div>
  );
};
