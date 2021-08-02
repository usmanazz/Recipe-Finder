import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Results.css";
import { Filters } from "../../components/Filters/Filters";
import { SelectedFilter } from "../../components/SelectedFilter/SelectedFilter";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { Button } from "../../components/UI/Button";

export const Results = ({
  ingredients,
  setIngredients,
  recipes,
  setRecipes,
  recipesToShow,
  setRecipesToShow,
  next,
  setNext,
  isLoading,
  setIsLoading,
  count,
  setCount,
  selectedFilterDisplayed,
  setSelectedFilterDisplayed,
}) => {
  const recipesPerPage = 2;
  const [selectedRadio, setSelectedRadio] = useState("");
  const [cookTime, setCookTime] = useState([0, 200]);
  const [numOfIngredients, setNumOfIngredients] = useState([0, 20]);
  const [calories, setCalories] = useState([0, 2000]);

  // const sessionAndFetchedDataNotEqual = (storageData, fetchedData) => {
  //   if (storageData) {
  //     const equals =
  //       storageData.length === fetchedData.length &&
  //       storageData.every((val, i) => val.id === fetchedData[i].id);
  //     if (equals) return true;
  //     else return false;
  //   }
  //   return false;
  // };

  // useEffect(() => {
  //   if (
  //     sessionAndFetchedDataNotEqual(
  //       sessionStorage.getItem("recipes"),
  //       recipes
  //     ) ||
  //     recipes.length === 0
  //   ) {
  //     setRecipes(JSON.parse(sessionStorage.getItem("recipes")));
  //     setIsLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   sessionStorage.setItem("recipes", JSON.stringify(recipes));
  // }, [recipes]);

  useEffect(() => {
    // console.log(JSON.parse(sessionStorage.getItem("recipes")));
    // setRecipes(JSON.parse(sessionStorage.getItem("recipes") || "[]"));
    // setIsLoading(false);
    console.log(recipes);

    // to ensure reset on when visit homepage
    setCount((prev) => prev + 1);

    if (/*isLoading &&*/ recipes.length === 0) {
      setRecipes(JSON.parse(sessionStorage.getItem("recipes") || "[]"));
      // setIsLoading(false);
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
