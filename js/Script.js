    // Some globals
    var NS = 50; // Number of Samples to which every path should be mapped.

    var activeLine;

    var lastSVG;

    var data = []; // for storing all paths that are drawn

    var bb; // box characteristics of the handwritten path
    //var features;
    var lastInd;
    var idStr;

    var added;

    var label;

    // Some flags
    var haveDragged;
    var editMode = true;
    var eraserMode = false;


    var fCoords = false;

    // //to prevent body movement in mobile devices
    //   d3.select("body")
    //     .on("touchmove", nozoom);

    //   function nozoom() {
    //     d3.event.preventDefault();
    //   };

    var renderPath = d3.svg.line()
    .x(function(d) { return d[0]; })
    .y(function(d) { return d[1]; })
    .interpolate("basis");

    var renderPolygon = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("linear");

    //SVGs
    var svg = d3.select('#drawings')
                .append('svg')
                .attr('id','svg')
              .call(d3.behavior.drag()
                .on("dragstart", dragstarted)
                .on("drag", dragged)
                // .on("dragend", dragended)
              );
    // svg.on('click',clickSvgContainer); //needed for erasing rendered objects while at edit mode

    // var drawings = d3.select('#drawings');
    var svgGraphRF = d3.select('#graphRF')
                      .append('svg')
                      .attr('class','svgGraph');

    var svgGraphSVM = d3.select('#graphSVM')
                      .append('svg')
                      .attr('class','svgGraph');

    //to prevent body movement in mobile devices
    d3.select("#drawings").on("touchmove", noScroll);
    function noScroll() {
		    d3.event.preventDefault();
	     };

    // $( "#drawings" ).bind( "tap", dragended);

    //this is necessary to avoid double execution of next() on mobile devices
    svg.on("ontouchstart" in document ? "touchend" : "mouseup", dragended)


    var activeLine = svg.append("path").datum([]).attr("class", "line");

    function dragstarted() {
      // From http://bl.ocks.org/mbostock/f705fc55e6f26df29354
      // activeLine = svg.append("path").datum([]).attr("class", "line");
      activeLine.datum([]).attr("d", renderPath);

      resetGraphs();

    }

    function dragged() {
      // aux=Date.now()
      activeLine.datum().push(d3.mouse(this));
      activeLine.attr("d", renderPath);
      haveDragged = true;

      // update plots
      var fb = characteristics(activeLine.datum());

      var y = fb.featuresCoords.slice(0,NS);
      var x = _.range(y.length);
      updatePlot(plotX,x,y);

      var y = fb.featuresCoords.slice(NS,2*NS);
      var x = _.range(y.length);
      updatePlot(plotY,x,y);

      var y = fb.featuresSlopes;
      var x = _.range(y.length);
      updatePlot(plotSlopes,x,y);
    }

    function dragended() {
      // console.log(Date.now()-aux)

      // If you came here because of a 'click' event, next object
      if (!haveDragged) {
          var path = data[data.length-1].coords;
          activeLine.datum(path).attr("d", renderPath);

        updateGraphs();
        return;
      }
      haveDragged = false;

      lastInd = 0;

      // Train THE models
      genCLarrays();

    }

    function switchTrainingFeatures() {
      fCoords=!fCoords;
      var overlay = d3.select('#overlay');
      if (fCoords) {
        overlay.transition().style('top',0).style('height','66.666666%');
      } else {
        overlay.transition().style('top','66.666666%').style('height','33.333333%');
      }

      // retrain
      trainIT(training_data,forest);
      trainIT(training_data,svm);

      genCLarrays();
      updateGraphs();
    }

    function descIndexSort(arr){ // inspired by http://stackoverflow.com/a/14439442/4564295
      var indices = _.map(arr,function(d,i){return i;});
      indices.sort(function (a, b) { return arr[a] > arr[b] ? -1 : arr[a] < arr[b] ? 1 : 0; });
      return indices;
    }


    function next(){ // convert successively to SVG from more to less probable according to prediction
      // lastSVG.remove();
      lastInd += 1;
      lastInd %= icons.length;
      var label = icons[CL_ind[lastInd]];

      listOfBlocks[listOfBlocks.length-1].changeImage(label);

      training_data[training_data.length-1].label = label;

      }

    function classifyRF(features) {
      var p_forest = _.map(forest, function(d){return d.predictOne(features)});
      return p_forest;
    }

    function classifySVM(features) {
      var p_svm = _.map(svm, function(d){return d.marginOne(features)});
      return p_svm;
    }
