// This file handles the cities map on the index page

class City {
    constructor(id, x, y) {
        this.id = id
        this.x = x
        this.y = y
    }
}

// Cities Map container
var chartDiv = document.getElementById("cities_map_container");

// Cities map container size
var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = 1800,
    height = 514;

// Drag cities event manager
var drag = d3.drag()
    .subject(function (d) { return d; })
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);

// Creates the city map
var svg = d3.select("#cities_map").append("svg")
    .attr('viewBox', `0 0 ${width} ${height}`)
    .append("g")
    .style("stroke", "#000")
    .style("fill", "none")
    .style("stroke-width", "#000");

// Draw the city map with defined size
var rect = svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")

// Connections Container are Behind Cities
var connections = svg.append("a")

// Cities container
var container = svg.append("g");



// Define x axis
container.append("g")
    .attr("class", "x axis")
    .selectAll("line")
    .data(d3.range(0, width, 10))
    .enter().append("line")
    .attr("x1", function (d) { return d; })
    .attr("y1", 0)
    .attr("x2", function (d) { return d; })
    .attr("y2", height)

// Defines y axis
container.append("g")
    .attr("class", "y axis")
    .selectAll("line")
    .data(d3.range(0, height, 10))
    .enter().append("line")
    .attr("x1", 0)
    .attr("y1", function (d) { return d; })
    .attr("x2", width)
    .attr("y2", function (d) { return d; });

// Cities array
let cities_array = []

// Start with four random cities
for (i = 0; i < 4; i++)
    cities_array.push(new City(cities_array.length, Math.random() * width, Math.random() * height))

// Creates box with coordinates indication
var div = d3.select("#cities_map_container").append("div")
    .attr("class", "tooltip s-tooltip-top")
    .style("opacity", 10);

// Draw points
dot = container.append("g")
    .attr("class", "dot")
    .selectAll("circle")
    .data(cities_array)
    .enter().append("circle")
    .attr("r", 5)
    .attr("id", function (d) { return `city${d.id}`; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .call(drag)
    .each(function (d, i) {
        if (i === 0) {
            // color the initial city
            d3.select(this).classed("initial_city", true);
        }
    });


let connection_array = []

// Draw Lines
function connectCities(city1, city2) {
    connection_array.push({ c1: city1, c2: city2 })

    console.log(connection_array)

    connections.append('line')
        .attr("class", "lines")
        .attr("id", `conn${connection_array.length - 1}`)
        .style('stroke', 'black')
        .attr('x1', city1.x)
        .attr('y1', city1.y)
        .attr('x2', city2.x)
        .attr('y2', city2.y)
        .append('a');
}

// Delete Lines
function disconnectCities(city1, city2) {
    let index = connection_array.findIndex((x) => {
        return x.c1 == city1 && x.c2 == city2
    })

    if (index > -1)
        connections.select(`#conn${index}`)
            .remove()
}

function deleteConnections() {
    connections.selectAll(`.lines`)
        .remove()

    connection_array = []
}

function updateConnections() {
    connection_array.forEach((connection, i) => {
        connections.select(`#conn${i}`)
            .attr('x1', connection.c1.x)
            .attr('y1', connection.c1.y)
            .attr('x2', connection.c2.x)
            .attr('y2', connection.c2.y)
    })
}


/**
 * Event handler to start dragging
 *
 * @param {*} d
 */
function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
}


/**
 * Event handler while dragging
 *
 * @param {*} d
 */
function dragged(d) {
    // Define border limits
    if (d3.event.x >= 0 && d3.event.x <= width && d3.event.y >= 0 && d3.event.y <= height) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
        div.style("opacity", .9);

        // Show current position in coordinates indicator
        div.html('x: ' + Number(d3.select(this).attr("cx")).toFixed(0) + ', y: ' + 'x: ' + Number(d3.select(this).attr("cy")).toFixed(0))
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");

        let cityId = cities_array.findIndex(x => { return `city${x.id}` == d3.select(this).attr("id") })
        cities_array[cityId].x = Number(d3.select(this).attr("cx"))
        cities_array[cityId].y = Number(d3.select(this).attr("cy"))

        connection_array.forEach((element, index) => {
            if (element.c1.id == cityId) {
                connection_array[index].c1.x = Number(d3.select(this).attr("cx"))
                connection_array[index].c1.y = Number(d3.select(this).attr("cy"))
            }

            else if (element.c2.id == cityId) {
                connection_array[index].c2.x = Number(d3.select(this).attr("cx"))
                connection_array[index].c2.y = Number(d3.select(this).attr("cy"))
            }
        })

        updateConnections()

    }

}

/**
 * Event handler when drag ends
 *
 * @param {*} d
 */
function dragended(d) {
    d3.select(this).classed("dragging", false);
    div.style("opacity", 0);
}

/**
 * Delete all cities
 *
 */
function clearMap() {
    container.selectAll('.dot')
        .selectAll("circle")
        .remove()
}

/**
 * Redraw points according to cities array
 *
 */
function updateMap() {
    clearMap()

    // Draw points
    dot = container.append("g")
        .attr("class", "dot")
        .selectAll("circle")
        .data(cities_array)
        .enter().append("circle")
        .attr("r", 5)
        .attr("id", function (d) { return `city${d.id}`; })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .call(drag)
        .each(function (d, i) {
            if (i === 0) {
                // color the initial city
                d3.select(this).classed("initial_city", true);
            }
        });
}


updateConnections()