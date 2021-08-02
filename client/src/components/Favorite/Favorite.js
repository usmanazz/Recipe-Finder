import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import deleteIcon from "./outline_delete_outline_black_24dp.png";
import "./Favorite.css";

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
    // user needs to be logged in to favorite/unfavorite
    if (isAuthenticated) {
      // user wants to delete recipe from favorites
      await removeRecipeFromFavorites();

      // removes recipe from the displayed list
      handleDelete();
      toast.success("Removed from Favorites!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  // api call to remove recipe from user's favorites
  const removeRecipeFromFavorites = async () => {
    try {
      const body = {
        recipeId: favorite.id,
      };

      await fetch("http://localhost:5000/dashboard/remove-favorite", {
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
