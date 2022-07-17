const http = require('http');
const express = require('express');
const markdown = require('markdown').markdown;

const app = express();

app.get('/', (req, res) => {
	//res.writeHead(200, {'Content-type': 'text/plain'}); // non
	res.setHeader('Content-type', 'text/plain');
	res.send('Vous êtes à l\'accueil');
});
app.get('/sous-sol', (req, res) => {
	res.setHeader('Content-type', 'text/html');
	res.send(markdown.toHTML('Vous êtes au sous-sol'));
})
.get('/etage/:etagenum/chambre', (req, res) => {
	let etage = req.params.etagenum; // I need to manage myself the requirements of parameters
	res.setHeader('Content-type', 'text/plain');
	res.send(`Vous êtes dans la chambre de l'étage n°${etage}`); // with send() no encoding issue unlike with end()
})
.use((req, res, next) => { // positions at the end of all other route management calls
	res.setHeader('Content-type', 'text/plain');
	res.status(404).send('Page introuvable');
});

app.listen(8080);

// setTimeout(() => { app.close(); }, 4000);
