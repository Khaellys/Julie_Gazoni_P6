const express = require("express");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const mongoose = require("mongoose");
const Sauce = require("./models/sauce");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connecté à Mongoose");
});

app.use(mongoSanitize());
app.use(helmet(), express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes); //verifier route

module.exports = app;
