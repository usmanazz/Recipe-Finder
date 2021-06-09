import React from "react";
import "./RecipeTags.css";

export const RecipeTags = ({ recipe }) => {
  const { cuisines, diets } = recipe;

  return (
    <div>
      <ul>
        {cuisines ? cuisines.map((cuisine) => <li>{cuisine}</li>) : null}
        {diets ? diets.map((diet) => <li>{diet}</li>) : null}
      </ul>
    </div>
  );
};
