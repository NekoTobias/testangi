var connect = require('connect');
var express = require('express');
var socket = require('socket.io');
var app = express();
var serveStatic = require('serve-static');
var server = app.listen(8080)
var io = socket.listen(server);


app.use( 
	serveStatic(__dirname)
);


io.sockets.on('connection', function(socket) {
	setTimeout(function() {
		socket.emit('hello', 'paul');
	}, 1000);

	socket.on('ready', function() {
		socket.broadcast.emit('ready');
	});

	socket.on('send', function(message){
		io.sockets.emit('reveive',message);

	})
});

console.log("Server started and listen to http://127.0.0.1:8080");