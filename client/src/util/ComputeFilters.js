// list of functions to apply filters
const computeFilters = {
  alphaOrderFilterRecipes(recipes, selectedRadio) {
    if (selectedRadio === "a - z") {
      return [...recipes].sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (selectedRadio === "z - a") {
      return [...recipes].sort((a, b) => (a.title < b.title ? 1 : -1));
    } else {
      return recipes;
    }
  },

  cookTimeFilterRecipes(recipes, cookTime) {
    return recipes.filter(
      (recipe) =>
        recipe.readyInMinutes >= cookTime[0] &&
        recipe.readyInMinutes <= cookTime[1]
    );
  },

  numOfIngredientsFilterRecipes(recipes, numOfIngredients) {
    return recipes.filter(
      (recipe) =>
        recipe.extendedIngredients.length >= numOfIngredients[0] &&
        recipe.extendedIngredients.length <= numOfIngredients[1]
    );
  },

  caloriesFilterRecipes(recipes, calories) {
    return recipes.filter((recipe) => {
      const recipeCalories = Math.floor(
        recipe.nutrition.nutrients.find(
          (element) => element.name === "Calories"
        ).amount
      );
      return recipeCalories >= calories[0] && recipeCalories <= calories[1];
    });
  },
};

export default computeFilters;
