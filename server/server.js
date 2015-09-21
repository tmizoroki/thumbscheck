var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(8080);
app.use('/', express.static(__dirname + '/../client'));

io.on('connection', function(socket){
  console.log('Socket connetion established.');
});
