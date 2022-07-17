const  http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
	res.writeHead(200);
	res.write(`createServer's callback is automatically added to a request event`);
	res.end();
});
server.on('close', () => {
	console.log('Bye bye');
});

server.listen(8080);

setTimeout(() => { 
	server.close();
}, 4000);
