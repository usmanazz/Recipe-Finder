const Pool = require("pg").Pool;

// database for the web app
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "recipe-finder",
});

module.exports = pool;
