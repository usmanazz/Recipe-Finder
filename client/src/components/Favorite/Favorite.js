import React from "react";

import deleteIcon from "./outline_delete_outline_black_24dp.png";
import "./Favorite.css";

export const Favorite = ({
  index,
  ingredient,
  ingredients,
  setIngredients,
}) => {
  //   const handleDelete = () => {
  //     setIngredients(ingredients.filter((_, id) => id !== index));
  //   };

  return (
    <div className="Favorite">
      <div className="favorite_recipe-info">
        <h1 className="favorite_recipe-title">
          1. Chicken Alfredo Chicken Alfredo
        </h1>
        <div className="favorite_cook-time">Cook Time: 24 minutes</div>
      </div>

      <div className="favorite_recipe-img">
        <img src={deleteIcon} alt="delete button for favorited recipe" />
      </div>
    </div>
  );
};
