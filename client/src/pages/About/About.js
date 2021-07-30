import React from "react";

import "./About.css";

export const About = () => {
  return (
    <div className="About">
      <div className="title-container">
        <h2 className="title">About</h2>
      </div>

      <div className="about-card-container about-card-1">
        <h3 className="about-card-title">How It Works</h3>
        <ol>
          <li>
            1. Input up to 5 ingredients in the list (i.e. onions, torilla,
            etc.)
          </li>
          <li>2. Edit the list by adding or deleting items.</li>
          <li>3. Click the 'Find Recipes' button and that's it!</li>
          <li>
            4. On the search results page, be sure to filter through the recipes
            to fit your needs!
          </li>
        </ol>
      </div>

      <div className="about-card-container card-2">
        <h3 className="about-card-title">Why Recipe Finder?</h3>
        <p>
          I wanted to create an easy tool to search for recipes based on
          ingredients I have at home in my pantry/fridge. Its a web app that
          makes it easier to cook recipes without having to worry about if I
          have all the ingredients. The app also has useful features such as
          filtering the recipes based on calories, cook time and more! Users can
          also create an account to save recipes for future reference!
        </p>
      </div>
    </div>
  );
};
