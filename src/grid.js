/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import * as d3 from 'd3'
import {
    City
} from './city'

let _this;

class Grid {
    constructor(container) {
        this.container = container
        this.citiesArray = new Array()

        this.width = window.innerWidth
        this.height = this.width / 3
        this.cityRadius = this.width / 140
        _this = this;
        this.dragEnabled = true

        this.drag = d3.drag()
            .subject(function(d) {
                return d;
            })
            .on("start", this.dragStarted)
            .on("drag", this.dragged)
            .on("end", this.dragEnded);


        this.mouseenter = (city) => {
            if (_this.dragEnabled) {
                d3.select(`#city${city.id}`)
                    .classed("hover", true);
            }
        }

        this.mouseleave = (city) => {
            if (_this.dragEnabled) {
                d3.select(`#city${city.id}`)
                    .classed("hover", false);
            }
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

        d3.select(this.container)
            .select('svg')
            .append('g')
            .attr('class', 'temp-paths')

        d3.select(this.container)
            .select('svg')
            .append('g')
            .append('text')
            .attr('class', 'bottom-text')
            .text('')
            .attr("transform", function(d) {
                return "translate(" + _this.width / 2 + "," + (_this.height - 5) + ")"
            })
            .style('font-size', _this.cityRadius * 1.2)

    }

    //eslint-disable-next-line max-lines-per-function
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
            .attr("id", function(d) {
                return `city${d.id}_cont`
            })
            .attr("class", 'city_cont')
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")"
            })
            .on('mouseenter', this.mouseenter)
            .on('mouseleave', this.mouseleave)
            .call(this.drag)
            .append('circle')
            .attr('r', this.cityRadius)
            .attr("id", function(d) {
                return `city${d.id}`
            })

        d3.selectAll('.city_cont')
            .each((d) => {
                d3.select(`#city${d.id}_cont`)
                    .append('text')
                    .style('font-size', this.cityRadius * 1.2)
                    .attr("dy", ".35em")
                    .text((d) => {
                        return d.id
                    })

                d3.select(`#city${d.id}_cont`)
                    .append('text')
                    .attr('id', `city${d.id}_d`)
                    .attr('class', 'city_d')
                    .style('font-size', Number(this.cityRadius) * 1)
                    .attr('visibility', 'hidden')
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
        if (_this.dragEnabled) {
            d3.event.sourceEvent.stopPropagation();
            d3.select(this).select('circle').classed("dragging", true);

            _this.drawDistances(d)
        }
    }

    dragged(d) {
        if (_this.dragEnabled) {
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

            d3.select(this).attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")"
            })
            d3.select('.bottom-text').text(`x: ${d.x.toFixed(0)} y: ${d.y.toFixed(0)}`)
            _this.drawDistances(d)
        }
    }

    dragEnded(d) {
        if (_this.dragEnabled) {
            d3.select(this).select('circle').classed("dragging", false);
            d3.select('.bottom-text').text('')

            d3.select('.temp-paths')
                .selectAll('line')
                .remove()

            d3.selectAll('.city_d')
                .attr('visibility', 'hidden')
                .text((a) => {
                    return ``
                })
        }
    }

    drawDistances(d) {
        d3.select('.temp-paths')
            .selectAll('line')
            .remove()

        let distances = _this.citiesArray.map((city) => {
            if (!d.equals(city))
                return {
                    city,
                    distance: d.distanceTo(city)
                }
        })

        distances.forEach((city) => {
            if (city) {
                this.drawTempConnection(d, city.city)
                this.showDistance(city)
            }
        });
    }

    drawTempConnection(c1, c2) {
        d3.selectAll(`#tempConn${c1.id}-${c2.id}`)
            .remove()

        d3.select('.temp-paths')
            .append('line')
            .attr('id', `tempConn${c1.id}-${c2.id}`)
            .style('stroke', '#e0e0e0')
            .style('stroke-width', `${ _this.cityRadius / 5}px`)
            .style('stroke-dasharray', "3,5")
            .attr("x1", c1.x)
            .attr("y1", c1.y)
            .attr("x2", c2.x)
            .attr("y2", c2.y);
    }

    drawConnection(c1, c2) {
        d3.selectAll(`#conn${c1.id}-${c2.id}`)
            .remove()

        d3.select('.temp-paths')
            .append('line')
            .attr('class', 'conn_city')
            .attr('id', `tempConn${c1.id}-${c2.id}`)
            .style('stroke', '#444')
            .style('stroke-width', `${ _this.cityRadius / 5}px`)
            .style('stroke-dasharray', "3,5")
            .attr("x1", c1.x)
            .attr("y1", c1.y)
            .attr("x2", c2.x)
            .attr("y2", c2.y);
    }

    deleteConnections() {
        d3.selectAll(`.conn_city`)
            .remove()
    }

    markCurrent(city) {
        _this.clearCurrent()

        d3.select(`#city${city.id}`)
            .classed('current', true)
    }

    clearCurrent() {
        d3.selectAll('.current')
            .classed('current', false)
    }

    showDistance(d) {
        let yPos = _this.cityRadius + 5
        let xPos = (_this.cityRadius + 2)
        let xAlign = 'start'

        if (d.city.x > _this.width / 2) {
            xPos *= -1
            xAlign = 'end'
        }

        if (d.city.y > _this.height / 2)
            yPos *= -1


        d3.select(`#city${d.city.id}_d`)
            .attr('visibility', 'visible')
            .attr("dy", yPos)
            .attr("dx", xPos)
            .style('text-anchor', xAlign)
            .text((a) => {
                return `d: ${d.distance.toFixed(0)}`
            })
    }

    showHeuristic(city) {
        let yPos = _this.cityRadius + 5
        let xPos = (_this.cityRadius + 2)
        let xAlign = 'start'

        if (city.x > _this.width / 2) {
            xPos *= -1
            xAlign = 'end'
        }

        if (city.y > _this.height / 2)
            yPos *= -1

        d3.select(`#city${city.id}_d`)
            .attr('visibility', 'visible')
            .attr("dy", yPos)
            .attr("dx", xPos)
            .style('text-anchor', xAlign)
            .text((a) => {
                return `h: ${city.heuristics}`
            })
    }

    disableDrag() {
        _this.dragEnabled = false
    }

    enableDrag() {
        _this.dragEnabled = true
    }
}

export {
    Grid
}