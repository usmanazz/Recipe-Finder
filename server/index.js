const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwtAuthRouter = require("./routes/jwtAuth");
const dashboardRouter = require("./routes/dashboard");

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use("/auth", jwtAuthRouter);
app.use("/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
