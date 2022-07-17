var http = require('http');

var server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-type': 'text/html'});
	res.end('<p>Voici un paragraphe <strong>HTML</strong></p>');
});

server.listen(8080);
