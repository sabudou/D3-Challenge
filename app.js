// @TODO: YOUR CODE HERE!
// svg container
var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = { top: 50, right: 50, bottom: 50, left: 50 };

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.csv("data.csv").then(function(data) {
    console.log(data);
    console.log([data]);