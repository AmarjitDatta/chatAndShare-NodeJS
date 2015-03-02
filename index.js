var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io')(http);
var people = {};

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

socket.on('connection', function(client){
	client.on('join', function(name){
		people[client.id] = name;
		socket.emit('join', name);
		socket.emit("update-people", people);
	});
	client.on('chat message', function(msg){
		socket.emit('chat message', msg);
	});
	client.on("disconnect", function(){
        socket.emit("chat message", people[client.id] + " has left the server.");
        delete people[client.id];
        socket.emit("update-people", people);
    });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});