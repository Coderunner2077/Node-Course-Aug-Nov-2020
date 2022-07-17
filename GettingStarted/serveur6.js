const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
	const paramsBruts = url.parse(req.url).query;
	console.log(paramsBruts);	
	const params = querystring.parse(paramsBruts);
	res.writeHead(200, {'Content-type': 'text/plain'});
	if('prenom' in params && 'nom' in params)
		res.write('My name is ' + params['nom'] + ', ' 
			+ params['prenom'] + ' ' + params['nom']);
	else
		res.write('What... what is your first name and last name?');
	res.end()
});

server.listen(8080);
