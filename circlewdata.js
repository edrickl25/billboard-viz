var circleData = [
    {
        "date":"07-Apr-2001",
        "duration":53,
        "song":"Kryptonite",
        "artist":"3 Doors Down"
    },
        {
        "date":"26-May-2001",
        "duration":56,
        "song":"The Way You Love Me",
        "artist":"Faith Hill"
      },
      {
          "date":"16-Feb-2002",
          "duration":54,
          "song":"Hanging By A Moment",
          "artist":"Lifehouse"    
      },
      {
        "date":"16-Mar-2002",
        "duration":53,
        "song":"Drops of Jupiter",
        "artist":"Train"
     },
      {
          "date":"27-Mar-2004",
          "duration":54,
          "song":"Unwell",
          "artist":"Matchbox Twenty"
      },
    {
      "date":"22-Apr-2006",
      "duration":62,
      "song":"You And Me",
      "artist":"Lifehouse"
    },
    {
      "date":"02-Jun-2007",
      "duration":58,
      "song":"How To Save A Life",
      "artist":"The Fray"
    },
    {
        "date":"01-Dec-2007",
        "duration":64,
        "song":"Before He Cheats",
        "artist":"Carrie Underwood"
      },
    {
        "date":"10-Oct-2009",
        "duration":76,
        "song":"I'm Yours",
        "artist":"Jason Mraz"
      }
  ];

// set the time format 
var parseDate = d3.timeParse("%d-%b-%Y");

circleData.forEach(function(d) {
  d.date = parseDate(d.date);
  d.duration = + d.duration;
});
console.log('data:>>', circleData);

// set the color 

// set the margins
var margin = { top: 10, left: 10, right: 10, bottom: 10};

// set the dimensions of the svg
var w = 2000 - margin.left - margin.right;
var h = 225 - margin.top - margin.bottom;


// define the scale and axes
var x = d3.scaleTime()
        .range([0, w]);

/* var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(5);  */

// var rScale = d3.scale.linear();

// add the svg canvas
var svg = d3.select('#chart').append('svg')
          .attr('width', w)
          .attr('height', h)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.select('svg')
          .style('background-color', "#4299de");

// add the circles and bind the data
var chart1 = svg.selectAll('circle')
          .data(circleData)
          .enter()
          .append('circle')
          .attr('r', function(d) { return d.duration }) // visit duration
          .attr('cy', h/2.25) // centers circle
          .attr('cx', function(d,i) { return (d.date/(99999999) - 9800)/1.45 +80 }  ) // not final. Should be aligned to x axis time
          .attr('fill', "steelblue") // color change depending on country
          .attr("opacity", 0.8);
          console.log('cx', d => d.date);

// Scale the range of the data
x.domain(d3.extent(circleData, function(d) { return d.date; }));

// Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, 175)")
        .call(d3.axisBottom(x));

    svg.append("text")      
        .attr("x",  w / 3 )
        .attr("y",  margin.top-2)
        .text("Timeline of Songs with the Highest Longevity");

/* const tooltip = d3.select("body")
  .append("div")
  .attr("class","tooltip")
  .style("background","red")
  .style("padding","6px")
  .style("font-family","Quantico")
  .style("border-radius","10px")
  .style("z-index","10")
  .style("position","absolute") 
  .style("visibility","hidden")
  .text("tooltip");

draw();

function draw() {
  
    const dot = svg
      .selectAll("circle")
      .data(circleData, d => d.song)
      .join(
        // + HANDLE ENTER SELECTION
        enter => enter
        .append("circle")
        .attr("r", d => y(d.duration)/2)
        .attr("cx",0)
        .attr("cy", h/2.25)
        .attr("fill", "black")
        .call(enter => enter
          .transition()
          .duration(1000)
          .attr("r", d => y(d.duration)/2)
          .attr("cx", d => x(d.date))
          //.attr("cy", d => yScale(d.envScore2020))
          .attr("fill", "#F46D25"))
          // add tooltip code for mouseover
          .on("mouseover", function(event,d,i) {
              return tooltip
              .html(`<div>${d.artist} - ${d.song} <br>Weeks on Chart: ${d.duration}</div>`)
              .style("visibility","visible");
          })
          .on("mousemove", function(event) {
              return tooltip.style("top",(event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
          })
          .on("mouseout", function(){
              return tooltip.style("visibility","hidden");
          })
        ,
  
        // + HANDLE UPDATE SELECTION
        update => update,
  
        // + HANDLE EXIT SELECTION
        exit => exit
          .transition()
          .duration(1000)
          .attr("fill","gray")
          .attr("r", d => y(d.duration)/4)
          .delay(200)
          .attr("cx",0)
          .remove()
      )
  } */