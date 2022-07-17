const express = require('express');
const app = express();
app.set('view engine', 'ejs'); // I had  to add this to make ejs work, had an error triggered otherwise

app.get('/', (req, res) => {
	res.setHeader('Content-type', 'text/html');
	res.render('index.ejs');
})
.get('/etage/:etagenum/chambre', (req, res) => {
	res.setHeader('Content-type', 'text/html'); // optional with render??
	res.render('chambre.ejs', {'etagenum' : req.params.etagenum}); 
})
.get('/compter/:nombre', (req, res) => {
	let names = ['Robert', 'William', 'Nero'];
	res.render('compter.ejs', {'compteur': req.params.nombre, 'names': names});
})
.use((req, res, next) => {
	res.setHeader('Content-type', 'text/plain');
	res.status(404).send('Page introuvable !');
});


app.listen(8080);
