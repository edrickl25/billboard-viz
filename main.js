 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
   height = window.innerHeight * 0.7,
   margin = {top: 20, bottom: 50, left: 60, right:60};


// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.

let svg;
let xScale;
let yScale;
let xAxis;
let yAxis;
let xAxisGroup;
let yAxisGroup;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};



/* LOAD DATA */
  d3.csv('billboard.csv', d => {
  return {
    year: +d.year,
    month: +d.month,
    peak: +d.peak_position,
    longevity: +d.weeks_on_chart,
    debut: +d.debut_position,
    song: d.song,
    artist: d.artist,
    genre: d.genre,
  }
})
  .then(data => {
  console.log('data :>> ', data);
  state.data = data;
  init();
  });


/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in

function init() {

  // SCALES
  xScale = d3.scaleTime()
    .domain(d3.extent(state.data, d => d.year))
    .range([margin.left, width - margin.right])

  yScale = d3.scaleLinear()
    .domain([0, d3.max(state.data, d => d.longevity)])
    .range([height - margin.bottom, margin.top])

/*  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d=>d.year))
    .range(margin, width-margin)

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d=> d.population))
    .range(height-margin, margin) */

// + AXES

  xAxis = d3.axisBottom(xScale)
  yAxis = d3.axisLeft(yScale)

// + UI ELEMENT SETUP

  const selectElement = d3.select("#dropdown")

  selectElement.selectAll("option")
/*  .data(["Select a Country",
        ...new Set(state.data.map(d => d.country))])
  */
    .data(["Select a Genre",
      ...new Set(state.data.map(d => d.genre))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d) // just using d, not manipulating anything
  
  selectElement.on("change", event => {
    state.selection = event.target.value
    console.log("updated state = ", state)
    draw();
  });

  // CREATE SVG ELEMENT

  svg = d3.select("#container")
    .append("svg")
    .attr("width",width)
    .attr("height",height)

  // BUILD AND CALL AXES
  xAxisGroup = svg.append("g")
    .attr("class", "xAxis")
    .attr("transform", `translate(${0},${height - margin.bottom})`)
    .call(xAxis)

  yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left},${0})`)
    .call(yAxis)

  draw();
}  

/* DRAW FUNCTION*/
// we call this every time there is an update to the data/state 

  function draw() {
    // + FILTER DATA BASED ON STATE
    const filteredData = state.data
    .filter(d => d.genre === state.selection)
    console.log(filteredData);
  
  // UPDATE SCALE(S), if needed

//  yScale.domain([0,d3.max(filteredData, d => d.longevity)])

  // UPDATE AXES if needed

/*   yAxisGroup
    .transition()
    .duration(1000)
    .call(yAxis.scale(yScale)) // generates updated scale */

  // UPDATE LINE GENERATOR FUNCTION

  const lineGen = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.longevity))
  
  // DRAW LINE
  svg.selectAll(".line")
    .data([filteredData])
    .join("path")
    .attr("class","line")
    .attr("stroke","blue")
    .attr("fill","none")
    .attr("d", d => lineGen(d))
  
}

