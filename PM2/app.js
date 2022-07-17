const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
	let paramsBruts = url.parse(req.url).query;
	let params = querystring.parse(url.parse(req.url).query);
	let path = url.parse(req.url).pathname;
	res.writeHead(200, {'Content-type': 'text/plain'});
	let isFs = false;
	if(path === '/')
		res.write('Hello world!')
	else if (path === '/help')
		res.write('Help world!')
	else if ('prenom' in params) 
		res.write('My name is Bond, ' + params['prenom'] + ' Bond.');
	else if (path === '/pm2') {
		isFs = true;
		fs.readFile('./index.html', 'utf-8', (error, content) => {
			
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end(content)
			
		})
	}
	else {
		res.writeHead(404);
		res.write('Page not found');
	}
	if(isFs === false)
		res.end();
});

server.listen(8080, () => {
	console.log('Listening to *:8080');
});
