import React from "react";
import "./RecipeTags.css";

export const RecipeTags = ({ recipe }) => {
  const { cuisines, diets } = recipe;

  return (
    <div className="RecipeTags">
      <ul className="recipe-tag">
        {cuisines
          ? cuisines.map((cuisine) => <li className="tag">{cuisine}</li>)
          : null}
        {diets ? diets.map((diet) => <li className="tag">{diet}</li>) : null}
      </ul>
    </div>
  );
};
