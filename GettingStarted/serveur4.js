
var http = require('http'),
	url = require('url');
var server = http.createServer((req, res) => {
	var path = url.parse(req.url).pathname;
	console.log(path);
	res.writeHead(200, {'Content-type': 'text/plain'});
	res.write('Hello check console to see requested url');
	res.end();
});

server.listen(8080);


