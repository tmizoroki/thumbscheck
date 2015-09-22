$( function() {
  //Average Confidence Gauge
  var avgConfGauge = $('#gaugeChart').epoch({
    type: 'time.gauge',
    format: function(v) { return (v * 100).toFixed(1) + '%'; }
  });

  var lineGraph = $('#lineGraph').epoch( {
      type: 'time.line', axes: ['left', 'bottom', 'right'],
      data: [ { values: [ { time: Date.now()/1000, y: 0 } ] } ],
    } );

  // var heatMap = $('#heatmapChart').epoch({
  //   type: 'time.heatmap',
  //   data: [ { values: [ { time: Date.now()/1000 } ] } ],
  //   bucketRange: [0, 100],
  //   buckets: 20
  // });

  // console.log(heatMap.data);


  var dashboard = io('http://localhost:8080/dashboard');
  dashboard.on('updateStats', function(refresh) {
    avgConfGauge.update(refresh.avgConfidence / 100);
    // heatMap.data[0].values.push({ time: Date.now()/1000, histogram: refresh.histogram });
    // console.log(heatMap.data);
    lineGraph.push( [ { time: Date.now()/1000, y: refresh.avgConfidence } ] );
  });
});
