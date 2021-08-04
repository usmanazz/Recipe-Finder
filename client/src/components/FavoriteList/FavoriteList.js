import React, { useEffect } from "react";
import favoritesApi from "../../api/Favorites";
import { Favorite } from "../Favorite/Favorite";
import "./FavoriteList.css";

export const FavoriteList = ({
  isAuthenticated,
  favoritesList,
  setFavoritesList,
}) => {
  // on initial mount get user's list of favorites with api call
  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const favorites = await favoritesApi.getFavorites();
        // de-stringify recipes
        if (favorites.length !== 0) {
          const parseFavorites = favorites.map((recipe) =>
            JSON.parse(recipe.recipe_info)
          );
          setFavoritesList(parseFavorites);
        }
      }
    }

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapFavorites = () => {
    if (favoritesList.length !== 0) {
      return favoritesList.map((favorite, index) => {
        return (
          <Favorite
            key={index}
            index={index}
            favorite={favorite}
            favoritesList={favoritesList}
            setFavoritesList={setFavoritesList}
            isAuthenticated={isAuthenticated}
          />
        );
      });
    } else {
      return <p>You have no saved recipes.</p>;
    }
  };

  return <div className="FavoriteList">{mapFavorites()}</div>;
};
