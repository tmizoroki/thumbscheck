var avgConfGauge = $('#gaugeChart').epoch({
  type: 'time.gauge',
  format: function(v) { return (v * 100).toFixed(1) + '%'; }
});

var lineChartData = [{ label: 'avg', values: [] }];
var avgConfLine = $('#lineChart').epoch({
  type: 'time.line',
  data: lineChartData
});

var dashboard = io('http://localhost:8080/dashboard');
dashboard.on('updateStats', function(refresh) {
  console.log(refresh.avgConfidence);

  avgConfGauge.update(refresh.avgConfidence / 100);
  lineChartData[0].values.push({ time: Date.now()/1000, y: refresh.avgConfidence });


});