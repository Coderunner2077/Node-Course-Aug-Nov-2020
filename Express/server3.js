const express = require('express');
const morgan = require('morgan'); // Charge le middleware de logging
const favicon = require('serve-favicon'); // Charge le middleware de favicon

const app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.use((req, res) => { // répond enfin
	res.send('Hello');
});

app.listen(8080);
