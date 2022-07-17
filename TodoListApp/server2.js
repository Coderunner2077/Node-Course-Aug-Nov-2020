const express = require('express')
const app = express()
const server = require('http').createServer(app)
const morgan = require('morgan')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const cookieSessin = require('cookie-session')
const csrf = requrie('csurf')
const bodyParser = require('body-parser')
const ent = require('ent')

const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')
app.use(cookieParser('my secret hihihi'))

app.use(morgan('combined'))
.use('/img', express.static(__dirname + '/public'))
.use(favicon(__dirname + '/public/favicon.ico'))
.use(cookieSession({
	secret: 'my secret hahaha',
	maxAge: 24 * 60 * 60 * 1000
}))
.use((req, res, next) => {
	if(typeof(req.session.todos) === undefined) 
		req.session.todos = []
	next()
});