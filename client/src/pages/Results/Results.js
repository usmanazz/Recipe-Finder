import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Results.css";
import { Filters } from "../../components/Filters/Filters";
import { SelectedFilter } from "../../components/SelectedFilter/SelectedFilter";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { Button } from "../../components/UI/Button";
import { TryAgainScreen } from "../../components/TryAgainScreen/TryAgainScreen";
import computeFilters from "../../util/ComputeFilters";

export const Results = ({
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  recipesToShow,
  setRecipesToShow,
  next,
  setNext,
  setCount,
  selectedFilterDisplayed,
  setSelectedFilterDisplayed,
}) => {
  // number of recipes to display per "page"
  const recipesPerPage = 2;
  // maintain state for filters
  const [selectedRadio, setSelectedRadio] = useState("");
  const [cookTime, setCookTime] = useState([0, 200]);
  const [numOfIngredients, setNumOfIngredients] = useState([0, 20]);
  const [calories, setCalories] = useState([0, 2000]);

  useEffect(() => {
    // to ensure reset on when visit homepage
    setCount((prev) => prev + 1);

    // persist recipes on refresh
    if (recipes.length === 0) {
      setRecipes(JSON.parse(sessionStorage.getItem("recipes") || "[]"));
    }

    // persist ingredients for title on refresh
    if (ingredients.length === 0) {
      setIngredients(JSON.parse(sessionStorage.getItem("ingredients") || "[]"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on initial page render, show first page of recipes
  useEffect(() => {
    addMoreRecipesToShow(0, recipesPerPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  // Method to add next page of recipes to recipesToShow list to display
  const addMoreRecipesToShow = (start, end) => {
    // get ids of currently displayed recipes
    const recipeIds = recipesToShow.map((element) => element.id);

    // slice next page of recipes from recipes list and
    // filter these recipes by comparing to currently displayed recipess ids
    const slicedRecipes = recipes
      .slice(start, end)
      .filter((element) => !recipeIds.includes(element.id));

    // add new page of recipes to list of recipes to be displayed
    setRecipesToShow((prev) => [...prev, ...slicedRecipes]);
  };

  // When user clicks to render more recipes, display more recipes and
  // increment next for future pages
  const handleLoadMoreRecipes = () => {
    addMoreRecipesToShow(next, next + recipesPerPage);
    setNext(next + recipesPerPage);
  };

  // ****************
  //
  // 4 functions used to apply filters by passing previously modified list of recipes to display
  // to next filter until all 4 filters have been applied. Then the last filter function returns the
  // the list of recipes to be rendered.
  //
  // ****************
  const alphaOrderFilteredRecipes = computeFilters.alphaOrderFilterRecipes(
    recipesToShow,
    selectedRadio
  );
  const cookTimeFilteredRecipes = computeFilters.cookTimeFilterRecipes(
    alphaOrderFilteredRecipes,
    cookTime
  );
  const numOfIngredientsFilteredRecipes =
    computeFilters.numOfIngredientsFilterRecipes(
      cookTimeFilteredRecipes,
      numOfIngredients
    );
  const caloriesFilteredRecipes = computeFilters.caloriesFilterRecipes(
    numOfIngredientsFilteredRecipes,
    calories
  );

  const mapRecipes = () => {
    return caloriesFilteredRecipes.map((recipe, idx) => (
      <Link
        className="recipecard-link"
        to={`/recipe/${recipe.id}`}
        key={recipe.id}
      >
        <RecipeCard key={idx} recipe={recipe} />
      </Link>
    ));
  };

  // if recipes array returned from food api is an error message,
  // render try again screen
  if (typeof recipes[0] === "string") return <TryAgainScreen />;
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
          selectedFilterDisplayed={selectedFilterDisplayed}
          setSelectedFilterDisplayed={setSelectedFilterDisplayed}
        />
      </div>

      {/* ternary condition for 3 conditions:
          1. If the api fetch for recipes was successful and there are recipes to show, render recipes
          2. If there are recipes from fetch to api but no recipes to show, then the filters did not get any results so display warning
          3. Otherwise, no recipes to display since fetch was unsuccessful so return error message */}
      {caloriesFilteredRecipes.length > 0 && recipes.length > 0 ? (
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
              Viewing 1 - {caloriesFilteredRecipes.length} of {recipes.length}{" "}
              recipes
            </p>
          </div>
        </>
      ) : caloriesFilteredRecipes.length === 0 && recipes.length > 0 ? (
        <p className="no-filter-selection-message">
          No results for the provided filters, please try a different filter
          combination.
        </p>
      ) : (
        <p className="no-filter-selection-message">
          No Results, please search again.
        </p>
      )}
    </div>
  );
};
