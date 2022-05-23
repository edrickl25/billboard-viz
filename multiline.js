// set the dimensions and margins of the graph
var margin = {top: 60, right: 20, bottom: 50, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([0,height]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.pop); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.hiphop); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select('#line').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("billboard_40avg.csv").then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.year = parseTime(d.year);
      d.close = +d.close;
      d.open = +d.open;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.year; }));
  y.domain([15, 100]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke","#F46D25")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "#e33056")
      .attr("d", valueline2);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")      
      .attr("x",  width / 2 )
      .attr("y",  margin.top-70)
      .text("Longevity of Pop Songs vs. Hip-hop Songs");


      svg.append("text")
      .attr("class","xLabel")
      .attr("y",height+40)
      .attr("x",width/2)
      .attr("fill","navy")
      .text("Year")
  
    svg.append("text")
      .attr("class","yLabel")
      .attr("transform","rotate(-90)")
      .attr("y", -40)
      .attr("x", 0-(height / 2))
      .text("Average Debut Position")

});