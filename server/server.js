var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(8080);
app.use('/', express.static(__dirname + '/../public'));

var socketData = {};
var stats = { connections: 0, aggConfidence: 0};

var capture = io.of('/capture');
capture.on('connection', function(socket){
  console.log('Socket connetion established.');
  ++stats.connections;
  console.log('There are currently ' + stats.connections + ' connections.');
  // console.log('Socket ID:',socket.id);
  socket.on('client-data', function (data) {
    socketData[socket.id] = data;
    console.log(socketData);
    stats.aggConfidence += parseInt(data.range);
    stats.avgConfidence = stats.aggConfidence / stats.connections;
    // console.log(stats);
  });

  socket.on('disconnect', function () {
    --stats.connections;
    delete socketData[socket.id];
  });
});

var dashboard = io.of('dashboard');
dashboard.on('connection', function(socket) {

});
  
