var http = require('http');

var server = http.createServer((req, res) => {
	res.writeHead(200, {'Content-type': 'text/html'});
	res.write(
	`<!DOCTYPE html>
	 <html>
	 	<head>
	 		<meta charset="UTF-8">
			<title>Ma page Node.js</title>
	 	</head>
	 	<body>
			<p>Voici un paragraphe <strong>HTML</strong>
		</body>
	 </html>`);
	res.end();
});

server.listen(8080);
		
