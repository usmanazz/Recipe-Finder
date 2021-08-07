const jwt = require("jsonwebtoken");
require("dotenv").config();

// generate jwt token for passed in user
const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };

  return jwt.sign(payload, `${process.env.jwtSecret}`, { expiresIn: "2hr" });
};

module.exports = jwtGenerator;
