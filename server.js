var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8080;
server.listen(port);

app.use('/', express.static(__dirname + '/public'));

var socketData = {};
var stats = { connections: 0, aggConfidence: 0};

var capture = io.of('/capture');
capture.on('connection', function(socket){
  console.log('Socket connection established.');
  ++stats.connections;
  console.log('There are currently ' + stats.connections + ' connections.');
  socket.on('client-data', function (data) {
    console.log('DATA:', data);
    socketData[socket.id] = data;
    console.log('socket');
    console.log('SOCKET DATA:', socketData);
    var confVals = [];

    var histogram = {};


    for (var key in socketData) {
      confVals.push(parseInt(socketData[key].range));
    }
    var total = confVals.reduce(function(total, cur) {
      return total + cur;
    });

    console.log('confVals', confVals);
    
    confVals.forEach(function(val) {
      if (val in histogram) {
        histogram[val]++;
      } else {
        histogram[val] = 1;
      }
    });

    console.log('histogram', histogram);
    console.log('TOTAL: ', total);
    stats.aggConfidence = total;
    stats.avgConfidence = stats.aggConfidence / stats.connections;
    stats.histogram = histogram;
    console.log('STATS', stats);
    updateDashboard();
  });

  socket.on('disconnect', function () {
    console.log('Someone disconnected');
    --stats.connections;
    delete socketData[socket.id];
  });
});

var dashboard = io.of('dashboard');
// dashboard.on('refresh', function(socket) {
//   socket.emit('updateStats', stats);
// });
  
var updateDashboard = function () {
  dashboard.emit('updateStats', stats);
};