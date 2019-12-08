var Hambotic = (function() {

  /**
   * Disclaimer - Assumption
   *
   * Charging station -'A' has been considered as a box for all purposes in thsi program
   */
  var alphabets = ['A'];
  var allBoxes = [];
  var allRoutes = [];


  /**
   * initBoxes - initializes boxes with the alphabets
   *
   * @param  {type} alphabets Array of alphabets for box data input
   * @return {type}           Array of all box objects
   */
  function initBoxes(alphabets) {
    console.log('\n');
    console.log('Reinitializing all the Boxes and Routes');
    if (alphabets.length > 1)
      console.log('A charging station and ' + (alphabets.length - 1) + ' Boxes defined.')
    allBoxes = [];

    for (var i = 0; i < alphabets.length; i++) {
      var hamBox = new box(alphabets[i]);
      allBoxes.push(hamBox);
    };
    return allBoxes;
  };

  /**
   * initRoutes - populate all routes based on the cost inputs and boxes
   *
   * @param  {type} alphabets  array of alphabets
   * @param  {type} costInputs cost of each route
   * @param  {type} allBoxes   array of all boxes
   * @return {type}            array of all rutes
   */
  function initRoutes(alphabets, costInputs, allBoxes) {
    console.log('Routes:');
    allRoutes = [];
    for (var i = 0; i < alphabets.length; i++) {
      for (var j = 0; j < alphabets.length; j++) {
        if (j === i)
          continue;
        var tempRoute = new route(allBoxes[i], allBoxes[j], costInputs[i][j]);
        allRoutes.push(tempRoute);
        tempRoute.print();
      };
    };
    return allRoutes;
  };


  /**
   * shortestPath - Recursive function to find the shortest path between two nodes
   *
   * @param  {type} begin       stating node
   * @param  {type} dest        destination node
   * @param  {type} currentCost cost of this path up until now
   * @param  {type} processed   processed nodes up until now
   * @param  {type} lowest      lowest route cost up until now
   * @param  {type} currentPath Current path
   * @param  {type} lowestPath  path of the lowest cost
   * @return {type}             shortest path between begin and end
   */
  function shortestPath(begin, dest, currentCost, processed, lowest, currentPath, lowestPath) {
    //console.log(`${begin.id}, ${dest.id}, ${currentCost}, ${lowest}.`);
    var latestProcessed = [];
    for (var i = 0; i < processed.length; i++)
      latestProcessed.push(processed[i]);

    for (var index = 0; index < allRoutes.length; index++) {
      var currentRoute = allRoutes[index];
      if (latestProcessed.includes(currentRoute.start) || latestProcessed.includes(currentRoute.end))
        continue;

      if (currentRoute.start === begin) {
        if (currentRoute.end === dest) {
          if (lowest === undefined || (currentCost + currentRoute.cost) < lowest) {
            lowest = currentCost + currentRoute.cost;
            lowestPath = [];
            for (var i = 0; i < currentPath.length; i++)
              lowestPath.push(currentPath[i]);
            lowestPath.push(currentRoute);
          }
        } else {
          latestProcessed.push(currentRoute.start);
          currentPath.push(currentRoute);
          var returnedPath = shortestPath(currentRoute.end, dest, currentCost + currentRoute.cost,
            latestProcessed, lowest, currentPath, lowestPath);
          var returnedCost = getTotalPathCost(returnedPath);
          // reset some variables that were changed within the recursion
          latestProcessed.pop();
          currentPath.pop();
          if (lowest === undefined || (currentCost + returnedCost) < lowest) {
            lowest = currentCost + returnedCost;
            lowestPath = [];
            for (var i = 0; i < currentPath.length; i++)
              lowestPath.push(currentPath[i]);
            for (var i = 0; i < returnedPath.length; i++)
              lowestPath.push(returnedPath[i]);
          }
        }
      }
    }
    return lowestPath;
  };


  /**
   * processBoxes - process all boxes
   *
   * @param  {type} allBoxes  Array of all boxes
   * @param  {type} allRoutes Arry of all routes
   * @return {type}           description
   */
  function processBoxes(allBoxes, allRoutes) {
    console.log('Processing Boxes...')
    var begin = allBoxes[0];
    var processed = [];
    var totalCost = 0;
    var finalPathIds = [];
    var finalRouteText = "Hambotic's Shortest Route :" + "\n\n";
    var msg = "Starting from charging station : " + begin.id;
    finalRouteText = logAndGetFinalRoute(msg, finalRouteText);

    while (processed.length < (allBoxes.length - 1)) {
      processed.push(begin);
      var lowestRoutes = new Map();
      for (var i = 0; i < allBoxes.length; i++) {
        if (processed.includes(allBoxes[i]))
          continue;
        var returnedPath = shortestPath(begin, allBoxes[i], 0, [], undefined, [], []);
        lowestRoutes.set(allBoxes[i], returnedPath);
      }

      var nearestBox = undefined;
      var nearest = undefined;
      var nearestBoxPath = undefined;
      for (var boxKey of lowestRoutes.keys()) {
        var boxKeyPath = lowestRoutes.get(boxKey);
        var lowestRoute = getTotalPathCost(boxKeyPath);
        if (nearest === undefined || lowestRoute < nearest) {
          nearest = lowestRoute;
          nearestBox = boxKey;
          nearestBoxPath = boxKeyPath;
        }
      }

      begin = nearestBox;
      totalCost = totalCost + nearest;

      if (begin !== undefined) {
        msg = "Collected Box : " + begin.id + ", cost : " + nearest;
        finalRouteText = logAndGetFinalRoute(msg, finalRouteText);

        var pathString = "";
        for (var j = 0; j < nearestBoxPath.length; j++) {
          pathString = pathString + nearestBoxPath[j].fromTo + ";";
          finalPathIds.push(nearestBoxPath[j]);
        }
        msg = "Path Used : " + pathString;
        finalRouteText = logAndGetFinalRoute(msg, finalRouteText);
      };
    }

    if (allBoxes.length === 1) {
      msg = "No boxes defined, nothing to collect";
      finalRouteText = logAndGetFinalRoute(msg, finalRouteText);
    } else {
      var returnedPathToStation = shortestPath(begin, allBoxes[0], 0, [], undefined, [], []);
      lowestRoute = getTotalPathCost(returnedPathToStation);
      totalCost = totalCost + lowestRoute;
      msg = "Returned to charging station : " + allBoxes[0].id + ", cost : " + lowestRoute;
      finalRouteText = logAndGetFinalRoute(msg, finalRouteText);

      var pathString = "";
      for (var j = 0; j < returnedPathToStation.length; j++) {
        pathString = pathString + returnedPathToStation[j].fromTo + ";";
        finalPathIds.push(returnedPathToStation[j]);
      }

      msg = "Path Used : " + pathString;
      finalRouteText = logAndGetFinalRoute(msg, finalRouteText);

      msg = "Total Cost : " + totalCost;
      finalRouteText = finalRouteText + "\n";
      finalRouteText = logAndGetFinalRoute(msg, finalRouteText);

      var pathString = "";
      for (var j = 0; j < finalPathIds.length; j++) {
        pathString = pathString + finalPathIds[j].fromTo + ";";
      }

      msg = "Final path : " + pathString;
      finalRouteText = logAndGetFinalRoute(msg, finalRouteText);
      $("#finalRoute").html(finalRouteText).wrap('<pre />');

      var config = {
        color: '#ee0000'
      };
      var arr = [];
      for (var n = 0; n < finalPathIds.length; n++) {
        var obj = {};
        Object.assign(obj, config);
        obj.id = finalPathIds[n].id;
        obj.from = finalPathIds[n].start.id;
        obj.to = finalPathIds[n].end.id;
        obj.dashes = true;
        arr.push(obj);
      }
      network.body.data.edges.update(arr);
    }
  };

  /**
   * Submit button handler
   * Generates the table required to input Routes
   * initializes all the boxes
   */
  $("#submitButton").closest("form").submit(function() {
    var table = $("#resultTable");
    var boxCountInput = $("#table-row-num").val();
    if (validateNum(boxCountInput) === false)
      return false;
    document.getElementById("table-gen").style.visibility = 'visible';
    // Need to add one for the extra charging station at the start
    var rowNum = parseInt(boxCountInput, 10) + 1;
    var resultHtml = '';

    alphabets = [];
    alphabets = genCharArray('A', rowNum);

    resultHtml += ["<tr>",
      "<th>",
      " => ",
      "</t>"
    ].join("\n");
    for (var j = 0; j < rowNum; j++) {
      resultHtml += ['<th>', alphabets[j], '</th>'].join("\n");
    }
    resultHtml += ['</tr>'].join("\n");

    for (var i = 0; i < rowNum; i++) {
      resultHtml += ["<tr>",
        "<td align='center'>",
        alphabets[i],
        "</td>"
      ].join("\n");
      for (var j = 0; j < rowNum; j++) {
        if (i === j) {
          resultHtml += ["<td  align='center'>",
            "[X]",
            "</td>"
          ].join("\n");
        } else {
          resultHtml += ['<td align="center" style="width:80px" ><input type="number" min="0" style="width:80px" placeholder="Input route cost..."></td>', ].join("\n");
        }
      }
      resultHtml += ['</tr>'].join("\n");
    }

    table.html(resultHtml);
    allBoxes = initBoxes(alphabets);
    return false;
  });

  /**
   * calcButton - handler
   * creates the cost routes from inputs
   * draws the graph for the input data
   * calculates the lowest path in processBoxes and updates the graph with sshortest path in red dashed lines     
   */
  $("#calcButton").click(function() {
    console.log("Calculating Route ...");
    var costInputs = create2DArray(alphabets.length);
    costInputs = getCellValues(costInputs);
    if (costInputs === undefined) // returns undefined on error
      return;

    allRoutes = initRoutes(alphabets, costInputs, allBoxes);
    var data = {
      nodes: [],
      edges: []
    };
    data = drawGraph(data, allBoxes, allRoutes);
    processBoxes(allBoxes, allRoutes);
  });
})();
