import React from "react";
import "./RecipeTags.css";

// render any diet or cuisine type tags on recipe page
export const RecipeTags = ({ recipe }) => {
  const { cuisines, diets } = recipe;

  return (
    <div className="RecipeTags">
      <ul className="recipe-tag">
        {cuisines
          ? cuisines.map((cuisine, idx) => (
              <li key={idx} className="tag">
                {cuisine}
              </li>
            ))
          : null}
        {diets
          ? diets.map((diet, idx) => (
              <li key={idx} className="tag">
                {diet}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
