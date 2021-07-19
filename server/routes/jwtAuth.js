const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// --------- register route -------------
router.post("/register", async (req, res, next) => {
  try {
    // 1. destructure req.body (name, email, password)
    const { name, email, password } = req.body;

    // 2. check if user exist (if exist then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists with provided email");
    }

    // check if username already in database (username is taken)
    const username = await pool.query(
      "SELECT * FROM users WHERE user_name=$1",
      [name]
    );

    if (username.rows.length !== 0) {
      return res.status(401).json("Username already taken. Try again");
    }

    // 3. Bcrypt user password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. add user to db
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // 5. generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// -------------- login route --------------
router.post("/login", async (req, res, next) => {
  try {
    // 1. destructure req.body
    const { email, password } = req.body;

    // 2. check if user doesn't exist (if not then throw error)
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // 3. check if incoming password is the same as db password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    // 4. give them jwt token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ----------- route to consistently verify jwt token whenever React App refreshes -------------
router.get("/is-verify", authorization, (req, res, next) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// ------------- route to access private information ---------------

module.exports = router;
