/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import * as d3 from 'd3'
import { City } from './city'

class Grid {
    constructor(container) {
        this.container = container
        this.citiesArray = new Array()
        this.cityRadius = 12
        this.width = 1600
        this.height = 500

        this.drag = d3.drag()
            .subject(function (d) { return d; })
            .on("start", this.dragstarted)
            .on("drag", this.dragged)
            .on("end", this.dragended);


        this.mouseenter = (city) => {
            d3.select(`#city${city.id}`)
                .classed("hover", true);
        }

        this.mouseleave = (city) => {
            d3.select(`#city${city.id}`)
                .classed("hover", false);
        }
    }

    drawContainer() {
        d3.select(this.container)
            .select('svg')
            .remove()

        d3.select(this.container)
            .style('padding', '0')
            .append('svg')
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr('viewBox', `0 0 ${this.width} ${this.height}`)
            .append("rect")
            .attr("width", '100%')
            .attr("height", '100%')
            .style('fill', 'none')
    }

    drawCities() {
        d3.select(this.container)
            .selectAll('.map')
            .remove()

        d3.select(this.container)
            .select('svg')
            .append('g')
            .attr("class", "map")
            .selectAll("circle")
            .data(this.citiesArray)
            .enter()
            .append('g')
            .attr("id", function (d) { return `city${d.id}_cont` })
            .attr("class", 'city_cont')
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")" })
            .on('mouseenter', this.mouseenter)
            .on('mouseleave', this.mouseleave)
            .call(this.drag)
            .append('circle')
            .attr('r', this.cityRadius)
            .attr("id", function (d) { return `city${d.id}` })

        d3.selectAll('.city_cont')
            .each((d) => {
                d3.select(`#city${d.id}_cont`)
                    .append('text')
                    .style('font-size',  this.cityRadius*1.5)
                    .text((d) => { return d.id })
            })



    }

    draw() {
        this.drawContainer()

        if (this.citiesArray.length > 0)
            this.drawCities()
    }

    addCity(city) {
        this.citiesArray.push(city)
        this.drawCities()
    }

    removeCity(city) {
        this.citiesArray = this.citiesArray.filter((item) => {
            return item !== city
        })

        if (this.citiesArray.length > 0)
            this.drawCities()
    }

    dragstarted(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
    }


    /**
     * Event handler while dragging
     *
     * @param {*} d
     */
    dragged(d) {
        // Define border limits
        if (d3.event.x >= 0 && d3.event.x <= this.width - this.cityRadius && d3.event.y >= 0 && d3.event.y <= this.height - this.cityRadius) {
            d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
            div.style("opacity", .9);

            // Show current position in coordinates indicator
            div.html('x: ' + Number(d3.select(this).attr("cx")).toFixed(0) + ', y: ' + 'x: ' + Number(d3.select(this).attr("cy")).toFixed(0))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            updateConnections()

        }

    }

    /**
     * Event handler when drag ends
     *
     * @param {*} d
     */
    dragended(d) {
        d3.select(this).classed("dragging", false);
    }
}

export { Grid }