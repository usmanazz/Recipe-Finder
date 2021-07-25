import React from "react";

import { Favorite } from "../Favorite/Favorite";
import "./FavoriteList.css";

export const FavoriteList = ({ ingredients, setIngredients }) => {
  const mapFavorites = () => {
    // if (ingredients) {
    //   return ingredients.map((ingredient, index) => {
    //     return (
    //       <Favorite
    //         key={index}
    //         index={index}
    //         ingredient={ingredient}
    //         ingredients={ingredients}
    //         setIngredients={setIngredients}
    //       />
    //     );
    //   });
    // }
  };

  return <div className="FavoriteList">{mapFavorites()}</div>;
};
