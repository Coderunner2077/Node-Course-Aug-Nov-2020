const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
	fs.readFile('./index.html', 'utf-8', (error, content) => {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(content);
	})
});

const io = require('socket.io').listen(server);

const mySockets = [];

io.sockets.on('connection', socket => {
	mySockets.push(socket);
	socket.emit('connected', {content: 'Online: ', online: mySockets.length});
	socket.broadcast.emit('connected', { content: 'Online: ', online: mySockets.length });
	socket.on('petit_nouveau', pseudo => {
		socket.pseudo = pseudo;
		socket.broadcast.emit('enters_room', pseudo + ' est entré');
		socket.emit('welcome', 'Bienvenue ' + pseudo);
	});

	socket.on('disconnect', () => {
		mySockets.splice(mySockets.indexOf(socket), 1);
		socket.broadcast.emit('exits_room', {
			message: socket.pseudo + ' est sorti',
			online: mySockets.length
		});
	});

	socket.on('inquire', pseudo => {
		socket.emit('answer_inquiry', 
			mySockets.map(socket => socket.pseudo)
		);
	});
});































const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
	fs.readFile('./index.html', 'utf-8', (error, content) => {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end(content);
	});
});

const io = require('socket.io').listen(server);

const mySockets = [];
io.sockets.on('connection', socket => {
	mySockets.push(socket);

	socket.emit('connected', {message: 'Online: ' +  mySockets.length});
	socket.broadcast.emit('connected', {message: 'Online: ' + mySockets.length});

	socket.on('petit_nouveau', pseudo => {
		socket.pseudo = pseudo;
		socket.emit('welcome', 'Bienvenue ' + pseudo);
		socket.broadcast.emit('enters_room', pseudo + ' est entré.');
	});

	socket.on('disconnect', () => {
		mySockets.splice(mySockets.indexOf(socket), 1);
		socket.broadcast.emit('exits_room', {
			message: socket.pseudo + ' est sorti.',
			online: mySockets.length 
		});
	});

	socket.on('inquire', pseudo => {
		let names = mySockets.map(s => s.pseudo);
		socket.emit('answer_inquiry', names)
	})
});

server.listen(8080);