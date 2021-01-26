// @TODO: YOUR CODE HERE!

// svg container
var svgHeight = 400;
var svgWidth = 1000;

// margins
var margin = { top: 50, right: 50, bottom: 50, left: 50 };

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function(datas) {
  
  console.log(datas);
  
  datas.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;  
  });
 
// Create a scale for your independent (x) coordinates
  var xScale = d3.scaleLinear()
    .domain(d3.extent(datas, d => d.age))
    .range([0, chartWidth])
    .nice();

// Create a scale for your dependent (y) coordinates
  var yScale = d3.scaleLinear()
    .domain([6,d3.max(datas, d => d.smokes)])
    .range([chartHeight, 0])
  
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(xAxis);
  chartGroup.append("g").call(yAxis);

// append circles

chartGroup.selectAll("circle")
.data(datas)
.enter()
.append("circle")
.attr("cx", d => xScale(d.age))
.attr("cy", d => yScale(d.smokes))
.attr("r", "10")
.attr("stroke-width", "1")

chartGroup.append("g")
  .selectAll('text')
  .data(datas)
  .enter()
  .append("text")
  .text(d=>d.abbr)
  .attr("x",d=>xScale(d.age))
  .attr("y",d=>yScale(d.smokes))
  .classed(".stateText", true)
  .attr("text-anchor", "middle")
  .attr("fill", "white")
  .attr("font-size", "10px")
  .style("font-weight", "bold");
    
}).catch(function(error) {
  console.log(error);
});
