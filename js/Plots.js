// Layout template
var layout = {
  height: H*0.9,
  font: {
    family: 'Helvetica',
    size: 18
  },
  margin: {
    l: 70,
    t: 5,
    r: 5,
    b: 50
  },
  xaxis: {
    title: 'FEATURE Number',
    showline: true,
    mirror: true,
    showgrid: false,
    zeroline: false,
    range: [-1,51]
  },
  yaxis: {
    showline: true,
    mirror: true,
    zeroline: false
  }
};

// trace template
var trace = {
    x: [],
    y: [],
    // name: 'X coordinate',
    type: 'scatter',
    mode: 'lines+markers',
    marker: {size:10}
};

// create layouts based on the template layout by deep copying (see http://stackoverflow.com/a/10869248/4564295)
var layoutX = JSON.parse(JSON.stringify(layout));
layoutX.yaxis.title = 'normalized X';
// layoutX.yaxis.range= [-0.5-Math.PI,Math.PI+0.5];

var layoutY = JSON.parse(JSON.stringify(layout));
layoutY.yaxis.title = 'normalized Y';
// layoutX.yaxis.range= [-0.5-Math.PI,Math.PI+0.5];

var layoutSlopes = JSON.parse(JSON.stringify(layout));
layoutSlopes.yaxis.title = 'Angles (radians)';
layoutSlopes.yaxis.range= [-0.5,2*Math.PI+0.5];

// create traces based on the template
var traceX = JSON.parse(JSON.stringify(trace));
var dataX = [traceX];

var traceY = JSON.parse(JSON.stringify(trace));
var dataY = [traceY];

var traceSlopes = JSON.parse(JSON.stringify(trace));
var dataSlopes = [traceSlopes];

// Generate the plot
Plotly.newPlot(plotX, dataX, layoutX);
Plotly.newPlot(plotY, dataY, layoutY);
Plotly.newPlot(plotSlopes, dataSlopes, layoutSlopes);


// var myPlot = document.getElementById('panel');
// myPlot.on('plotly_click',function(data){
//   var datapoint = data.points[0].pointNumber
//   window.open('https://www.google.de/#q='+String(datapoint),'_blank');
// })


// Functions
function updatePlot(graph,x,y){
  // graph.data[0].x = x;
  // graph.data[0].y = y;
  // Plotly.redraw(graph);
  var update = {x: [x], y: [y]};
  Plotly.restyle(graph, update, [0]);
}
