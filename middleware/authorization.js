const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // 1. get token from fetch request and destructure
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    // 2. check if token is valid
    const payload = jwt.verify(jwtToken, `${process.env.jwtSecret}`);

    // 3. use payload in our routes
    req.user = payload.user;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).json("Not Authorized");
  }
};
