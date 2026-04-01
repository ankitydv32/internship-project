// importing express library
const express = require("express");

// creating app
const app = express();

// simple route
app.get("/", (req, res) => {
  res.send("Hello! My server is working properly 🚀");
});

// starting server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});