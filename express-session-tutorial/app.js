const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ expanded: false }));

app.use(session({
    genid: req => uuidv4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 2, secure: false }
}));

app.get("/", (req, res) => {
    res.send("SessionID: " + req.sessionID);
}); 

app.post("/login", (req, res) => {
    req.session.username = req.body.username;
    res.send(`Session: username is ${req.session.username}, sessionID: ${req.sessionID}, expires in 
        ${req.session.cookie.maxAge / 1000 } sec
    `);
});

app.get("/session", (req, res) => {
    res.send(`Username: ${req.session.username}, sessionID: ${req.sessionID}, expires in: 
        ${req.session.cookie.maxAge / 1000} seconds
    `);
})

// app.set("trust proxy", 1) // if I want to use proxies

module.exports = app;

