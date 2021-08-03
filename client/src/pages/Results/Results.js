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
  const recipesPerPage = 2;
  const [selectedRadio, setSelectedRadio] = useState("");
  const [cookTime, setCookTime] = useState([0, 200]);
  const [numOfIngredients, setNumOfIngredients] = useState([0, 20]);
  const [calories, setCalories] = useState([0, 2000]);

  useEffect(() => {
    // to ensure reset on when visit homepage
    setCount((prev) => prev + 1);

    if (recipes.length === 0) {
      setRecipes(JSON.parse(sessionStorage.getItem("recipes") || "[]"));
    }

    if (ingredients.length === 0) {
      setIngredients(JSON.parse(sessionStorage.getItem("ingredients") || "[]"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loopWithSlice(0, recipesPerPage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              Viewing 1 - {recipesToShow.length} of {recipes.length} recipes
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
