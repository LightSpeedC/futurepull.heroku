'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const serveIndex = require('serve-index');

const bodyParser = require('body-parser');

const server = require('http').Server(app);
const io = require('socket.io')(server);
const context = {io, socket: null};

io.on('connection', function (socket) {
	console.log('a user connected');
	context.socket = socket;

	socket.on('disconnect', function () {
		console.log('user disconnected');
		context.socket = null;
	});

	socket.on('chat-message', function (msg) {
		console.log('message: ' + msg);
		io.emit('chat-message', msg);
	});

});

app.set('json spaces', '  '); // JSON形式を指定→res.json({})
app.use(bodyParser.json());
app.use('/headers', (req, res, next) => res.json({ headers: req.headers }));
app.use('/api', require('./api')(context));

app.use(express.static('public'));
app.use(serveIndex('public', {icons: true}));

server.listen(PORT, () => console.log('listening port: ', PORT));
