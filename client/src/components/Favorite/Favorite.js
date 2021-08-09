import React from "react";
import { Link } from "react-router-dom";
import deleteIcon from "./outline_delete_outline_black_24dp.png";

import "./Favorite.css";
import favoritesApi from "../../api/Favorites";
import notifications from "../UI/Notifications";

export const Favorite = ({
  favorite,
  favoritesList,
  setFavoritesList,
  index,
  isAuthenticated,
}) => {
  const { title, readyInMinutes, image } = favorite;

  const handleDelete = () => {
    const newFavList = favoritesList.filter((fav) => fav.id !== favorite.id);
    setFavoritesList(newFavList);
  };

  const handleFavDelete = async () => {
    if (isAuthenticated) {
      const body = {
        recipeId: favorite.id,
      };
      await favoritesApi.removeRecipeFromFavorites(body);

      handleDelete();
      notifications.success("Removed from Favorites!", 2000);
    }
  };

  return (
    <div className="Favorite">
      <Link to={`/recipe/${favorite.id}`} className="favorite-link">
        <div className="favorite_recipe-info">
          <h1 className="favorite_recipe-title">
            {index + 1}. {title}
          </h1>
          <div className="favorite_cook-time">
            Cook Time: {readyInMinutes}min
          </div>
        </div>
      </Link>

      <div
        className="favorite_recipe-img"
        style={{ backgroundImage: `url(${image})` }}
        onClick={() => {
          handleFavDelete();
        }}
      >
        <img src={deleteIcon} alt="delete button for favorited recipe" />
      </div>
    </div>
  );
};
