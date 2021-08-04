// list of functions to apply filters
const computeFilters = {
  alphaOrderFilterRecipes(recipes, selectedRadio) {
    // use JS sort function to sort by alphabetic, reverse alphabetic, or
    // return original ordering of recipes list
    if (selectedRadio === "a - z") {
      return [...recipes].sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (selectedRadio === "z - a") {
      return [...recipes].sort((a, b) => (a.title < b.title ? 1 : -1));
    } else {
      return recipes;
    }
  },

  // only return recipes within the cook time range
  cookTimeFilterRecipes(recipes, cookTime) {
    return recipes.filter(
      (recipe) =>
        recipe.readyInMinutes >= cookTime[0] &&
        recipe.readyInMinutes <= cookTime[1]
    );
  },

  // only return recipes within the number of ingredients range
  numOfIngredientsFilterRecipes(recipes, numOfIngredients) {
    return recipes.filter(
      (recipe) =>
        recipe.extendedIngredients.length >= numOfIngredients[0] &&
        recipe.extendedIngredients.length <= numOfIngredients[1]
    );
  },

  // only return recipes within the calories range
  caloriesFilterRecipes(recipes, calories) {
    // for each recipe, get its calories, round down, and include in list to return
    // if it is within the calorie range
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
