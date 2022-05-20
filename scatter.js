// RECIPE - reminder of what to look for below:
/* CONSTANTS AND GLOBALS */
/* APPLICATION STATE */
/* LOAD DATA */
/* INITIALIZING FUNCTION */
/* DRAW FUNCTION */

    // CONSTANTS AND GLOBALS - Variables  - set variables - const (unchanging) and let (changeable)
    // APPLICATION STATE - State -  create an object that holds our state can rewrite properties based on interactivity
    // LOAD DATA - Data -  this time store it in State
    // INITIALIZING FUNCTION - init() -  do all the things that run once (scales, main svg)
    // DRAW FUNCTION - draw() -  do all the things that can rewrite viz based on interactivity (append) or data change 

// --------

/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8,
  height = window.innerHeight * .8,
  margin = {top: 10, bottom: 30, left: 40, right: 10},
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let xAxis;
let yAxis;
let xAxisGroup;
let yAxisGroup;
let colorScale;
let tooltip;


/* APPLICATION STATE */
let state = {
  data: [],
  selectedGenre: "All" // + YOUR INITIAL FILTER SELECTION
};



/* LOAD DATA */
d3.csv("billboard_40.csv", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  console.log(state.data)
  init();

});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {

  // + SCALES

  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.weeks_on_chart))
    .range([margin.left,width-margin.right])

  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.debut_position))
    .range([margin.top,height-margin.bottom])


  // + AXES
  xAxis = d3.axisBottom(xScale)
  yAxis = d3.axisLeft(yScale)

  // + UI ELEMENT SETUP
 const selectElement = d3.select("#dropdown")

 selectElement.selectAll("option")
  .data([{key: "All", label:"All"}, 
        {key: "pop", label:"Pop"},
        {key: "country", label:"Country"},
        {key: "rock", label:"Rock"},
        {key: "alternative", label:"Alternative"},
        {key: "r&b", label:"R&B"},
        {key:"hip-hop", label:"Hip-Hop"}])
  .join("option")
  .attr("value", d => d.key)
  .text(d => d.label)

  selectElement.on("change", event =>
  { 
    // console.log("something changed")
    state.selectedGenre = event.target.value
    console.log(event.target.value)
    draw();
  } )

  ;
console.log(state.selectedGenre)



  // + CREATE SVG ELEMENT
svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  // + CALL AXES
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0},${height - margin.bottom})`)
    .call(xAxis)

  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},${0})`)
    .call(yAxis)

// add tooltip general def

    tooltip = d3.select("body")
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

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedGenre === d.genre || state.selectedGenre === "All")
    console.log(filteredData)

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.song)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter
      .append("circle")
      .attr("r", (radius*.5))
      .attr("cx",0)
      .attr("cy", d => yScale(d.debut_position))
      .attr("fill", "black")
      .call(enter => enter
        .transition()
        .duration(1000)
        .attr("r", radius)
        .attr("cx", d => xScale(d.weeks_on_chart))
        //.attr("cy", d => yScale(d.envScore2020))
        .attr("fill", "#d248be"))
        // add tooltip code for mouseover
        .on("mouseover", function(event,d,i) {
            return tooltip
            .html(`<div>${d.artist} - ${d.song} (${d.year}) <br>Debut Position:${d.debut_position} <br> Weeks on Chart: ${d.weeks_on_chart}<br> Peak Position: ${d.peak_position}</div>`)
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
        .attr("r", (radius* .25))
        .delay(200)
        .attr("cx",0)
        .remove()
    )
}

/* 5/17 - make a visual aid legend using the Rachel's meeting chat text (ben and gemma's viz), make another viz with subset of biggest songs probably in the form of bubbles organized by size, label axes, make tooltip rectangle background, FAQ type writing section, work in the line graph*/