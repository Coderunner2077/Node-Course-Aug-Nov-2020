const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
	let page = url.parse(req.url).pathname;
	console.log(page);
	//res.writeHead(200, {'Content-type': 'text/plain'});
	let statusCode = 200;
	if(page === '/')
		res.write(`Vous êtes à l'accueil, que puis-je pour vous ?`);
	else if(page === '/sous-sol')
		res.write('Vous êtes dans la cave à vin, les bouteilles sont à moi !');
	else if(page === '/etage/1/chambre')
		res.write(`Hé ho, c'est privé ici !`);
	else {
		statusCode = 404;
		res.write('Page introuvable !');
	}
	res.writeHead(statusCode, {
		'Content-type': 'text/plain',
		'charset': 'utf-8'
	});
	res.end()
});
server.listen(8080);
		



