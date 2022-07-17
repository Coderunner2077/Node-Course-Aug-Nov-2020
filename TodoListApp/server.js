const express = require('express');
const app = express();
const server = require('http').createServer(app);
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const ent = require('ent');
const cookieParser = require('cookie-parser');
const session = require('express-session')({
	secret: 'secret todoList hihihi',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 60 * 60000
	}
});
const sharedSession = require('express-socket.io-session');
const io = require('socket.io')(server);


app.set('view engine', 'ejs');
app.use(cookieParser('secret todoList hihihi'));


//app.use(morgan('combined'))
app.use('/img', express.static(__dirname + '/public'))
.use(serveFavicon(__dirname + '/public/favicon.ico'))
.use(session); // attach session

io.use(sharedSession(session, cookieParser('secret todoList hihihi'), {
	autoSave: true
})); // share session with io sockets

app.use((req, res, next) => {
	if(typeof(req.session.todos) == undefined || req.session.todos == undefined)
		req.session.todos = []
	
	next()
})
.get('/', (req, res) => {
	let todos = req.session.todos;
	console.log('req.session.todos.length : ' + req.session.todos.length);
	res.setHeader('Content-type', 'text/html');
	res.render('index.ejs', {todos: todos });
})
.use((req, res, next) => {
	res.redirect('/') // On redirige vers l'accueil si page demandée introuvable
});

const clients = [];

io.sockets.on('connection', (socket, pseudo) => {
	const { session } = socket.handshake;
	if(typeof(session.todos) == undefined || session.todos == undefined)
		session.todos = [];

	console.log('socket.session.todos.length : ' + session.todos.length);
	socket.on('pseudo_entered', pseudo => {
		socket.pseudo = ent.encode(pseudo);
		clients.push(socket);
	});

	socket.on('remove', index => {
		let todos = session.todos;
		if(typeof todos[index] !== undefined) {
			todos.splice(index, 1);
			socket.emit('update', todos)
			socket.broadcast.emit('update', todos)
		}
	})

	socket.on('add', todo => {
		if(todo.length > 0) {
			session.todos.push(ent.encode(todo))
			session.save();
			socket.emit('update', session.todos);
			socket.broadcast.emit('update', session.todos);
		}
	})

	socket.on('edit', (index, todo) => {
		let todos = session.todos;
		if(typeof(todos[index]) !== undefined && /\w+/.test(todo)) {
			todos[index] = ent.encode(todo);
			socket.emit('update', todos);
			socket.broadcast.emit('update', todos);
		} 
	});

	socket.on('up', index => {
		let todos = session.todos;
		if(typeof todos[index] !== undefined && typeof todos[index - 1] !== undefined) {
			[todos[index - 1], todos[index]] = [todos[index], todos[index - 1]];
			socket.emit('update', todos);
			socket.broadcast.emit('update', todos);
		}
	});

	socket.on('down', index => {
		let todos = session.todos;
	if(typeof todos[index] !== undefined && typeof todos[index + 1] !== undefined) 
		[todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];
		socket.emit('update', todos);
		socket.broadcast.emit('update', todos);
	});
});

server.listen(8080, () => { console.log('Listening to *:8080')});
