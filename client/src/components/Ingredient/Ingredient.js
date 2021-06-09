import React from "react";

import deleteIcon from "./outline_delete_outline_black_24dp.png";
import "./Ingredient.css";

export const Ingredient = ({
  index,
  ingredient,
  ingredients,
  setIngredients,
}) => {
  const handleDelete = () => {
    setIngredients(ingredients.filter((_, id) => id !== index));
  };

  return (
    <div className="Ingredient">
      <p>{ingredient}</p>
      <img
        src={deleteIcon}
        alt="delete button for ingredient"
        onClick={handleDelete}
      />
    </div>
  );
};
