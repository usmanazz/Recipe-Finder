const router = require("express").Router();
const { json } = require("body-parser");
const pool = require("../db");
const bcrypt = require("bcrypt");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res, next) => {
  try {
    // req.user has the payload
    // res.json(req.user);

    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
    // console.log(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

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
    return res.json("Successfully changed username!");
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

module.exports = router;
