import React, { useEffect } from "react";
import { Button } from "../UI/Button";
import "./AddBar.css";

export const AddBar = ({
  ingredients,
  setIngredients,
  text,
  setText,
  disableButton,
  setDisableButton,
  setErrors,
}) => {
  // saves every change made in input field
  const handleTextChange = ({ target }) => {
    setText(target.value);
  };

  // validates input from user and adds input to ingredient list
  const handleAdd = () => {
    if (
      handleValidation() &&
      !ingredients.find((element) => element === text)
    ) {
      setIngredients((prev) => [...prev, text]);
      document.querySelector(".addbar-textbox").value = "";
      setText("");
    }
  };

  // validates user input
  const handleValidation = () => {
    let field = text;
    let err = {};
    let formIsValid = true;

    // Name
    if (!field) {
      formIsValid = false;
      err["name"] = "Cannot be empty!";
    }

    if (field) {
      if (!field.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)) {
        formIsValid = false;
        err["name"] = "Invalid Format. Word(s) only!";
      }
    }

    setErrors(err);
    return formIsValid;
  };

  // disables add button when user adds 5 ingredients
  useEffect(() => {
    const addButton = document.querySelector(".button.add-btn");

    if (ingredients.length === 5) {
      setDisableButton(true);

      addButton.classList.toggle("add-btn_hover");
      addButton.classList.toggle("disabled");
    } else {
      setDisableButton(false);

      if (!addButton.classList.contains("add-btn_hover")) {
        addButton.classList.toggle("add-btn_hover");
      }
      if (addButton.classList.contains("disabled")) {
        addButton.classList.toggle("disabled");
      }
    }
  }, [ingredients, setDisableButton]);

  return (
    <div className="AddBar">
      <input
        className="addbar-textbox"
        placeholder="Add Ingredient..."
        type="text"
        onChange={handleTextChange}
      />
      <Button
        handleClick={handleAdd}
        label="Add"
        type="add-btn add-btn_hover"
        isDisabled={disableButton}
      />
    </div>
  );
};
