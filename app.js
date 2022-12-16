const express = require("express");
const path = require("path")
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// Import the mongoose module
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "views"))

// Routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.listen(PORT, () => console.log(`App running on port: ${PORT}.`));
