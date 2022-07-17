const http = require('http');
const url = require('url');
const querystring = require('querystring');
const myModule = require('my_module');
const markdown = require('markdown').markdown;

const server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-type': 'text/html'});
	let params = querystring.parse(url.parse(req.url).query);

	if('prenom' in params && 'nom' in params)
		res.write(
			markdown.toHTML(`My name is **${params['nom']}**, **${params['prenom']} ${params['nom']}**`)
		);
	else
		res.write(markdown.toHTML('Veuillez entrer un parametre *prenom* et un parametre *nom* dans l\'url'));
	let path = url.parse(req.url).pathname;
	if(path === '/hi')
		myModule.direBonjour();

	res.end();
});

server.on('close', () => {
	myModule.direByeBye();
});

server.listen(8080);

setTimeout(() => { server.close(); }, 4000);
