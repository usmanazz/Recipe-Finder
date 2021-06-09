import React from "react";

import { Ingredient } from "../Ingredient/Ingredient";
import "./IngredientList.css";

export const IngredientList = ({ ingredients, setIngredients }) => {
  const mapIngredients = () => {
    if (ingredients) {
      return ingredients.map((ingredient, index) => {
        return (
          <Ingredient
            key={index}
            index={index}
            ingredient={ingredient}
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        );
      });
    }
  };

  return <div className="IngredientList">{mapIngredients()}</div>;
};
