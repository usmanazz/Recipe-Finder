const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const jwtAuthRouter = require("./routes/jwtAuth");
const dashboardRouter = require("./routes/dashboard");
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  // serve static content
  app.use(express.static("./client/build"));
}

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

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
