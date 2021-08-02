import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { LoadingScreen } from "../components/LoadingScreen/LoadingScreen";

toast.configure();
function App() {
  const [ingredients, setIngredients] = useState([]);
  const [text, setText] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errors, setErrors] = useState({});

  const [recipes, setRecipes] = useState([]);
  const [recipesToShow, setRecipesToShow] = useState([]);
  const [next, setNext] = useState(2);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(1);
  const [favoritesList, setFavoritesList] = useState([]);
  const [selectedFilterDisplayed, setSelectedFilterDisplayed] = useState(false);

  // represents 10 min to frequently check if user is auth
  const MINUTE_MS = 60000 * 10;

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isUserAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      // set Authenticated to true for user to stay logged in on refresh
      parseRes === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    isUserAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      isUserAuth();
    }, MINUTE_MS);

    // This represents the unmount function, in which you need to clear
    // your interval to prevent memory leaks.
    return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar isAuthenticated={isAuthenticated} />
        <LoadingScreen />
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
                setIngredients={setIngredients}
                recipes={recipes}
                setRecipes={setRecipes}
                recipesToShow={recipesToShow}
                setRecipesToShow={setRecipesToShow}
                next={next}
                setNext={setNext}
                count={count}
                setCount={setCount}
                selectedFilterDisplayed={selectedFilterDisplayed}
                setSelectedFilterDisplayed={setSelectedFilterDisplayed}
              />
            </Route>
            <Route path="/recipe/:id">
              <Recipe
                recipes={recipes}
                setRecipes={setRecipes}
                count={count}
                setCount={setCount}
                isAuthenticated={isAuthenticated}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
              />
            </Route>
            <Route
              exact
              path="/account"
              render={(props) =>
                isAuthenticated ? (
                  <MyAccount
                    {...props}
                    setAuth={setAuth}
                    isAuthenticated={isAuthenticated}
                    favoritesList={favoritesList}
                    setFavoritesList={setFavoritesList}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>
            <Route
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/account" />
                )
              }
            ></Route>
            <Route
              path="/signup"
              render={(props) =>
                !isAuthenticated ? (
                  <Signup {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            ></Route>

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
