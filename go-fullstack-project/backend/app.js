const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect("mongodb://localhost:27017/nodedb",
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.error("Connexion à MongoDB échouée !"))



const app = express();

app.use(bodyParser.json());

const allowOrigin = "*"; // "http://localhost:4200"; 

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;