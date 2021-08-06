const favoritesApi = {
  async getFavorites() {
    try {
      const response = await fetch("/dashboard/get-favorites", {
        method: "GET",
        headers: {
          token: localStorage.token,
          "Content-Type": "application/json",
        },
      });

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  },

  async removeRecipeFromFavorites(body) {
    try {
      await fetch("/dashboard/remove-favorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }
  },

  async addRecipeToFavorites(body) {
    try {
      await fetch("/dashboard/add-favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.log(err);
    }
  },
};

export default favoritesApi;
