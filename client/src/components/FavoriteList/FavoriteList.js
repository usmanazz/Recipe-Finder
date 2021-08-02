import React, { useEffect } from "react";

import { Favorite } from "../Favorite/Favorite";
import "./FavoriteList.css";

export const FavoriteList = ({
  isAuthenticated,
  favoritesList,
  setFavoritesList,
}) => {
  useEffect(() => {
    async function fetchData() {
      if (isAuthenticated) {
        const favorites = await getFavorites();
        if (favorites.length !== 0) {
          const parseFavorites = favorites.map((recipe) =>
            JSON.parse(recipe.recipe_info)
          );

          setFavoritesList(parseFavorites);
        }
      }
    }

    fetchData();
  }, []);

  const getFavorites = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/get-favorites",
        {
          method: "GET",
          headers: {
            token: localStorage.token,
            "Content-Type": "application/json",
          },
        }
      );

      const parseRes = await response.json();
      return parseRes;
    } catch (err) {
      console.log(err);
    }
  };

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
