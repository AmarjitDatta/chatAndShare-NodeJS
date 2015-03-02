var app = require('express')();
var http = require('http').Server(app);
var socket = require('socket.io')(http);
var people = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

socket.on('connection', function(client){
	client.on('chat message', function(msg){
    socket.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});