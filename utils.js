/**
 * drawGraph - Draw the grpah using vis-network
 *
 * @param  {type} data      description
 * @param  {type} allBoxes  description
 * @param  {type} allRoutes description
 * @return {type}           description
 */
function drawGraph(data, allBoxes, allRoutes) {
  var container = document.getElementById("mynetwork");
  var tempNodes = [];
  var tempEdges = [];
  for (var i = 0; i < allBoxes.length; i++) {
    var obj = {
      id: allBoxes[i].id,
      label: allBoxes[i].id
    };
    tempNodes.push(obj);
  }
  for (var i = 0; i < allRoutes.length; i++) {
    var obj = {
      id: allRoutes[i].id,
      from: allRoutes[i].start.id,
      to: allRoutes[i].end.id,
      label: allRoutes[i].cost.toString(),
      arrows: 'to'
    }
    tempEdges.push(obj);
  };

  data.nodes = new vis.DataSet(tempNodes);
  data.edges = new vis.DataSet(tempEdges);
  options = {};
  network = new vis.Network(container, data, options);

  return data;
};


/**
 * getTotalPathCost - get the sum of the cost of all routes in a given path array
 *
 * @param  {type} path description
 * @return {type}      description
 */
function getTotalPathCost(path) {
  var cost = 0;
  for (var j = 0; j < path.length; j++)
    cost = cost + path[j].cost;
  return cost;
};


/**
 * logAndGetFinalRoute - log and add to final route
 *
 * @param  {type} msg            description
 * @param  {type} finalRouteText description
 * @return {type}                description
 */
function logAndGetFinalRoute(msg, finalRouteText) {
  console.log(msg);
  return (finalRouteText + msg + "\n");
};


/**
 * create2DArray - create dummy 2d array
 *
 * @param  {type} size description
 * @return {type}      description
 */
function create2DArray(size) {
  var cols = [];
  for (var i = 0; i < size; i++) {
    cols[i] = [];
  }
  return cols;
};


/**
 * getCellValues - Given the input table of route costs, get all cell contents
 *
 * @param  {type} costInputs description
 * @return {type}            description
 */
function getCellValues(costInputs) {
  var table = document.getElementById('resultTable');
  for (var r = 1, n = table.rows.length; r < n; r++) {
    for (var c = 1, m = table.rows[r].cells.length; c < m; c++) {
      var cell = table.rows[r].cells[c].childNodes[0];
      var cellValue = "";
      if (cell !== undefined && cell.tagName === 'INPUT')
        cellValue = cell.value;
      else
        cellValue = cell.textContent;

      if (validateNum(cellValue) === false)
        return undefined; // returning undefined for costInputs

      costInputs[r - 1][c - 1] = parseInt(cellValue, 10);
    };
  };
  return costInputs;
};


/**
 * validateNum - validate negative number 
 *
 * @param  {type} num description
 * @return {type}     description
 */
function validateNum(num) {
  if (parseInt(num, 10) < 0) {
    msg = "Invalid negative input :" + num + ". Please retry "
    alert(msg);
    console.log(msg);
    return false;
  }
  return true;
};


/**
 * genCharArray - Given a starting character and number, returns the following alphabets
 *
 * @param  {type} startChar     description
 * @param  {type} numberOfChars description
 * @return {type}               description
 */
function genCharArray(startChar, numberOfChars) {
  var charArray = [],
    i = startChar.charCodeAt(0);
  var j = i + numberOfChars;
  for (; i < j; ++i) {
    charArray.push(String.fromCharCode(i));
  }
  return charArray;
}
