require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// AUTH ROUTES
app.use("/api/auth", require("./routes/auth"));

//  ARTWORK ROUTES
app.use("/api/artworks", require("./routes/artwork"));

app.get("/", (req, res) => {
  res.send("Server working ");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});