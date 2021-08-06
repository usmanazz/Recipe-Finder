const router = require("express").Router();
const { json } = require("body-parser");
const pool = require("../db");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");

// ------------- get user from authrization middleware ---------------
router.get("/", authorization, async (req, res, next) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ======================= Change Credentials Endpoints ================== //

// ------------- change username route ---------------
router.post("/change-username", authorization, async (req, res, next) => {
  try {
    // 1. destructure req.body
    const { currentUsername, newUsername } = req.body;

    // 2. check inputed username is same as logged in username
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    if (user.rows[0].user_name != currentUsername) {
      return res.status(401).json("Username does not match current username");
    }

    // 4. check that new username is not same as current username
    if (user.rows[0].user_name === newUsername) {
      return res.status(401).json("Cannot change username to existing one");
    }

    // 3. check new username does not already exist in database
    const username = await pool.query(
      "SELECT * FROM users WHERE user_name=$1",
      [newUsername]
    );

    if (username.rows.length !== 0) {
      return res.status(401).json("Username already taken. Try again");
    }

    // 4. change username in database
    await pool.query("UPDATE users SET user_name=$1 WHERE user_name=$2", [
      newUsername,
      currentUsername,
    ]);
    return res.json(`Successfully changed username to ${newUsername}!`);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ------------- change password route ---------------
router.post("/change-password", authorization, async (req, res, next) => {
  try {
    // 1. destructure req.body
    const { currentPassword, newPassword } = req.body;

    // 2. check inputed password is same as logged in password
    const user = await pool.query(
      "SELECT user_password FROM users WHERE user_id = $1",
      [req.user]
    );

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Current password is incorrect");
    }

    // 3. check that new password is not same as current password
    if (currentPassword === newPassword) {
      return res
        .status(401)
        .json("New password cannot be same as current password");
    }

    // 4. bycrpt new password and make change in database
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    await pool.query("UPDATE users SET user_password=$1 WHERE user_id=$2", [
      bcryptPassword,
      req.user,
    ]);

    return res.json("Successfully changed password!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ======================= User Favorites Endpoints ================== //

// ------------- add favorite route ---------------
router.post("/add-favorite", authorization, async (req, res, next) => {
  try {
    // 1. destructure req.body
    const { recipeId, recipeInfo } = req.body;

    // 2. get current authorized user's email
    const user_email = await pool.query(
      "SELECT user_email FROM users WHERE user_id = $1",
      [req.user]
    );

    // 3. add recipe in db if not already added
    const recipe = await pool.query(
      "SELECT recipe_id FROM recipes WHERE recipe_id=$1",
      [recipeId]
    );

    if (!recipe.rows[0]) {
      await pool.query(
        "INSERT INTO recipes (recipe_id, recipe_info) VALUES ($1, $2)",
        [recipeId, recipeInfo]
      );
    }

    // 4. add relation (user_email, recipe_id) to favorites table
    await pool.query(
      "INSERT INTO favorites (user_email, recipe_id) VALUES ($1, $2)",
      [user_email.rows[0].user_email, recipeId]
    );

    // 5. send response back to user
    res.json("Added to favorites!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ------------- get favorites route ---------------
router.get("/get-favorites", authorization, async (req, res, next) => {
  try {
    // 1. get authorized user
    const user = await pool.query(
      "SELECT user_email FROM users WHERE user_id=$1",
      [req.user]
    );
    const user_email = user.rows[0].user_email;

    // 2. get list of favorites associated with user
    const favorites = await pool.query(
      `SELECT recipes.recipe_info FROM users 
       INNER JOIN favorites
       ON users.user_email = favorites.user_email
       INNER JOIN recipes
       ON recipes.recipe_id = favorites.recipe_id
       WHERE users.user_email=$1
      `,
      [user_email]
    );

    // 3. give back list of favorites
    res.json(favorites.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ------------- delete favorites route ---------------
router.delete("/remove-favorite", authorization, async (req, res, next) => {
  try {
    // 1. destructure req.body
    const { recipeId } = req.body;

    // 2. get authorized user
    const user = await pool.query(
      "SELECT user_email FROM users WHERE user_id=$1",
      [req.user]
    );

    const user_email = user.rows[0].user_email;

    // 3. remove user-->recipe entry from favorites table in db
    await pool.query(
      "DELETE FROM favorites WHERE user_email=$1 AND recipe_id=$2",
      [user_email, recipeId]
    );

    // 4. send confirmation of deletion
    res.json("Removed from favorites!");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
