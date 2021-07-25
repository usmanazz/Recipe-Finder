import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

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
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [text, setText] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const [recipes, setRecipes] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [next, setNext] = useState(2);
  const [isLoading, setIsLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(1);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

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
                count={count}
                setCount={setCount}
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
            <Route
              exact
              path="/account"
              render={(props) =>
                isAuthenticated ? (
                  <MyAccount {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            >
              {/* <MyAccount /> */}
            </Route>
            <Route
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/account" />
                )
              }
            >
              {/* <Login /> */}
            </Route>
            <Route
              path="/signup"
              render={(props) =>
                !isAuthenticated ? (
                  <Signup {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            >
              {/* <Signup /> */}
            </Route>

            {/* 404 page for any path not specified above */}
            <Route exact component={NotFoundPage} />
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
