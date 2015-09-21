

var showValue = function (val) {
  document.getElementById('confidence').innerHTML = val;
};

var socket = io('http://localhost:8080');

socket.on('connect', function (data) {
  console.log("connected");
  socket.emit('my other event', { my: 'data' });
});