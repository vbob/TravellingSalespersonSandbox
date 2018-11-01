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

let _this;

class Grid {
    constructor(container) {
        this.container = container
        this.citiesArray = new Array()
        this.cityRadius = 12
        this.width = 1600
        this.height = 400

        this.drag = d3.drag()
            .subject(function (d) { return d; })
            .on("start", this.dragStarted)
            .on("drag", this.dragged)
            .on("end", this.dragEnded);


        this.mouseenter = (city) => {
            d3.select(`#city${city.id}`)
                .classed("hover", true);
        }

        this.mouseleave = (city) => {
            d3.select(`#city${city.id}`)
                .classed("hover", false);
        }

        _this = this;
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

        d3.select(this.container)
            .select('svg')
            .append('g')
            .append('text')
            .attr('class', 'bottom-text')
            .text('')
            .attr("transform", function (d) { return "translate(" + _this.width / 2 + "," + (_this.height - 5) + ")" })

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
                    .style('font-size', this.cityRadius * 1.5)
                    .attr("dy", ".35em")
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
            return !city.equals(item)
        })

        if (this.citiesArray.length > 0)
            this.drawCities()
    }

    dragStarted(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).select('circle').classed("dragging", true);
        console.log(d)
        //d3.select(
    }

    dragged(d) {
        let x = () => {
            if (d3.event.x < (0 + _this.cityRadius))
                return 0 + _this.cityRadius
            else if ((d3.event.x > (_this.width - _this.cityRadius)))
                return _this.width - _this.cityRadius
            else return d3.event.x
        }

        let y = () => {
            if (d3.event.y < (0 + _this.cityRadius))
                return 0 + _this.cityRadius
            else if ((d3.event.y > (_this.height - _this.cityRadius)))
                return _this.height - _this.cityRadius
            else return d3.event.y
        }

        d.x = x()
        d.y = y()

        d3.select(this).attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")" })
        d3.select('.bottom-text').text(`x: ${d.x.toFixed(0)} y: ${d.y.toFixed(0)}`)

    }

    dragEnded(d) {
        d3.select(this).select('circle').classed("dragging", false);
        d3.select('.bottom-text').text('')
    }

}

export { Grid }