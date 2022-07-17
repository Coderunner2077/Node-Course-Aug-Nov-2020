const http = require('http');
const EventEmitter = require('events').EventEmitter;

const server = http.createServer((req, res) => {
	res.writeHead(200);
	res.write('Creating customized events in Node.js');
	res.end();
});

const jeu = new EventEmitter();

jeu.on('gameover', (message) => {
	console.log(message);
});

server.listen(8080);

jeu.emit('gameover', 'Vous avez perdu la 1re fois');

setTimeout(() => {
	jeu.emit('gameover', 'Vous avez perdu une seconde fois');
}, 4000);
