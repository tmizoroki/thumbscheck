

var showValue = function (val) {
  document.getElementById('confidence').innerHTML = val;
};

var socket = io('http://localhost:8080/capture');

socket.on('connect', function () {
  console.log("connected");
  var data = {
    range: document.getElementById('slider').value
  };
  //setInterval(function() {
    socket.emit('client-data', data);
  //}, 1000);
});