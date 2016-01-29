// GRAPH RANDOM FOREST
svgGraphRF.append('text')
  .attr('class','title')
  .attr('x',10)
  .attr('y',0.07*H)
  .text('Random Forest');

svgGraphRF.append('text')
  .attr('class','subtitle')
  .attr('x',10)
  .attr('y',0.13*H)
  .text('digit');

svgGraphRF.append('text')
  .attr('class','subtitle')
  .attr('x','30%')
  .attr('y',0.13*H)
  .text('probability');

svgGraphRF.append('line')
  .attr('class','zeroLine')
  .attr('x1','30%')
  .attr('x2','30%')
  .attr('y1',0.15*H)
  .attr('y2',(0.14+5*0.06)*H);

var predictionsRF = svgGraphRF.selectAll('.predictionBar').data([0,0,0,0,0]);
predictionsRF.enter()
        .append('rect')
        .attr('class','predictionBar')
        .transition()
        .attr('x','30%')
        .attr('y',function(d,i){return (0.155+i*0.06)*H;})
        .attr('width',function(d){return d;})
        .attr('height',0.04*H);

var labelsRF = svgGraphRF.selectAll('.label').data(_.range(5));
labelsRF.enter()
        .append('text')
        .attr('class','label')
        .attr('x',50)
        .attr('y',function(d,i){return (0.19+i*0.06)*H;})
        .transition()
        .text(function(d){return String(d);});


// GRAPH SVM
svgGraphSVM.append('text')
  .attr('class','title')
  .attr('x',10)
  .attr('y',0.07*H)
  .text('SVM');

svgGraphSVM.append('text')
  .attr('class','subtitle')
  .attr('x',10)
  .attr('y',0.13*H)
  .text('digit');

svgGraphSVM.append('text')
  .attr('class','subtitle')
  .attr('x','30%')
  .attr('y',0.13*H)
  .text('margins');

svgGraphSVM.append('line')
  .attr('class','zeroLine')
  .attr('x1',175)
  .attr('x2',175)
  .attr('y1',0.15*H)
  .attr('y2',(0.14+5*0.06)*H);

var predictionsSVM = svgGraphSVM.selectAll('.predictionBar').data([0,0,0,0,0]);
predictionsSVM.enter()
        .append('rect')
        .attr('class','predictionBar')
        .transition()
        .attr('x',175)////////////////
        .attr('y',function(d,i){return (0.155+i*0.06)*H;})
        .attr('width',function(d){return d;})
        .attr('height',0.04*H);

var labelsSVM = svgGraphSVM.selectAll('.label').data(_.range(5));
labelsSVM.enter()
        .append('text')
        .attr('class','label')
        .attr('x',50)
        .attr('y',function(d,i){return (0.19+i*0.06)*H;})
        .transition()
        .text(function(d){return String(d);});


function updateGraphs(){
  // renadom forest
  labelsRF.data(RF_CL_ind.slice(0,5))
      // .transition()
      .text(function(d){return String(d);});

  predictionsRF.data(RF_CL_ind.slice(0,5))
      .transition()
      .attr('width',function(d){return RF_CL[d]*200;});

  // svm
  labelsSVM.data(SVM_CL_ind.slice(0,5))
      // .transition()
      .text(function(d){return String(d);});

  predictionsSVM.data(SVM_CL_ind.slice(0,5))
      .transition()
      .attr('x',function(d){return (SVM_CL[d]>0) ?  175 : 175 + SVM_CL[d]*100;})
      .attr('width',function(d){return Math.abs(SVM_CL[d])*100;});
}

function resetGraphs(){
  labelsRF.data(_.range(5))
      .text(function(d){return String(d);});

  predictionsRF.data([0,0,0,0,0])
      .attr('width',function(d){return d;});

  labelsSVM.data(_.range(5))
      .text(function(d){return String(d);});

  predictionsSVM.data([0,0,0,0,0])
      .attr('width',function(d){return d;});
}
