const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("./models/user");
const Post = require("./models/post");

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
app.set("views", path.join(__dirname, "views"));

// CORS setup
const corsOptions = {
    // Asterisk allows for all origins to access API. Useful for development.
    origin: "*",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// Routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {
    User.findOne(
        { username: req.body.username, password: req.body.password },
        (err, user) => {
            if (err) res.send(`Error: ${err}.`);
            if (!user) res.send(`Could not find user, ${req.body.username}.`);
            if (user) {
                jwt.sign({ user }, process.env.SECRET, (err, token) => {
                    if (err) return res.send(`jwt error: ${err}`);
                    res.json({
                        token,
                    });
                });
            }
        }
    );
});

app.get("/api/posts", (req, res) => {
    Post.find((err, posts) => {
        if (err) res.send(err);
        res.json({
            posts,
        });
    });
});

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.sendStatus(403);
        const postDetails = {
            title: req.body.title,
            text: req.body.text,
            date: new Date(),
        };
        const post = new Post(postDetails).save((err) => {
            if (err) return res.send(err);
        });
        res.json({
            status: "posted",
            post: postDetails,
        });
    });
});

// verifyToken middleware
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(PORT, () => console.log(`App running on port: ${PORT}.`));
