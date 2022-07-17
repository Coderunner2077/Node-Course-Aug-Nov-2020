
var http = require('http');

var server = http.createServer((req, res) => {
	res.writeHead(200);
	res.end('Salut tout le monde');
});

server.listen(8080);
