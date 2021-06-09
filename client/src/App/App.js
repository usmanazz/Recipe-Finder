import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import { NavBar } from "../components/NavBar/NavBar";
import { Home } from "../pages/Home/Home";
import { About } from "../pages/About/About";
import { Recipe } from "../pages/Recipe/Recipe";
import { Results } from "../pages/Results/Results";
import ScrollToTop from "../customHooks/ScrollToTop";
import { Login } from "../pages/Login/Login";
import { Signup } from "../pages/Signup/Signup";
import { MyAccount } from "../pages/MyAccount/MyAccount";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [text, setText] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const [recipes, setRecipes] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [next, setNext] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              <Home
                ingredients={ingredients}
                setIngredients={setIngredients}
                text={text}
                setText={setText}
                disableButton={disableButton}
                setDisableButton={setDisableButton}
                errors={errors}
                setErrors={setErrors}
                recipes={recipes}
                setRecipes={setRecipes}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/results">
              <Results
                ingredients={ingredients}
                recipes={recipes}
                setRecipes={setRecipes}
                recipesToShow={recipesToShow}
                setRecipesToShow={setRecipesToShow}
                next={next}
                setNext={setNext}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </Route>
            <Route path="/recipe/:id">
              <Recipe recipes={recipes} />
            </Route>
            <Route exact path="/account">
              <MyAccount />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <h3>Designed and built by Usman Naz, © 2021</h3>
        </div>
      </div>
    </Router>
  );
}

export default App;
