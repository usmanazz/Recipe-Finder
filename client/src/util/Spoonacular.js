let Spoonacular = {
  searchRecipes(ingredients) {
    const ingredientParam =
      ingredients.length === 1
        ? ingredients[0]
        : ingredients
            .map((ingredient, index) =>
              index < ingredients.length - 1
                ? (ingredient += "%2C")
                : ingredient
            )
            .join("");

    // console.log(ingredientParam);

    return fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientParam}&number=4&ignorePantry=true&ranking=1`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "ff0a61196bmshcb4f1d4057c2e93p1978eejsn065538b09585",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Request Failed!");
      })
      .then((jsonResponse) => {
        return jsonResponse.map((recipe) => ({
          id: recipe.id,
        }));
      })
      .then((recipeIds) => {
        const fetchCalls = recipeIds.map((recipeId) => {
          return fetch(
            `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId.id}/information?includeNutrition=true`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-key":
                  "ff0a61196bmshcb4f1d4057c2e93p1978eejsn065538b09585",
                "x-rapidapi-host":
                  "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
              },
            }
          );
        });

        return Promise.all(fetchCalls)
          .then((responses) => {
            return Promise.all(responses.map((response) => response.json()));
          })
          .then((recipes) => {
            return recipes;
          });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

export default Spoonacular;
