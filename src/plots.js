/* eslint-disable no-ternary */
/* eslint-disable array-element-newline */
/* eslint-disable max-classes-per-file */
/*eslint-disable max-statements */
/*eslint-disable max-lines-per-function */
/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

let d3 = require('d3')

let _self;

let margin = {
    bottom: 30,
    left: 65,
    right: 30,
    top: 20
}

class Point {
    constructor(dataset, x, y) {
        this.dataset = dataset
        this.x = x
        this.y = y
    }
}

class Plot {
    constructor(container, width, height) {
        this.container = container
        this.externalWidth = width
        this.externalHeight = height
        this.width = width - (margin.left + margin.right)
        this.height = height - (margin.top + margin.bottom)
        this.curve = d3.curveMonotoneX
        this.dataset = new Array()

        this.draw()
    }

    draw() {
        d3.select(this.container).selectAll('svg').remove()

        this.svg = d3.select(this.container).append('svg')
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.externalWidth} ${this.externalHeight}`)
            .append('g')
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        this.createScales()
        this.createLine()
        this.drawAxes()
        this.drawPath()
    }


    createScales() {
        this.xScale = d3.scaleLinear()
            .domain([0, d3.max(this.dataset, function(d) {
                return d.x
            })])
            .range([0, this.width])

        let minValue = d3.min(this.dataset, function(d) {
            return d.y
        })

        this.yScale = d3.scaleLinear()
            .domain([(minValue < 0) ? minValue : 0, d3.max(this.dataset, function(d) {
                return d.y
            })])
            .range([this.height, 0])
    }

    createLine() {
        this.line = d3.line()
            .x((d, i) => {
                return this.xScale(i)
            })
            .y((d) => {
                return this.yScale(d.y)
            })
            .curve(this.curve)
    }

    drawAxes() {
        this.svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale).ticks(10).tickSize(-this.height).tickFormat(''));

        this.svg.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(this.yScale).ticks(10).tickSize(-this.width).tickFormat(''))

        this.svg.append('g')
            .attr('class', 'axis')
            .call(d3.axisLeft(this.yScale).ticks(10).tickSizeInner(30))

        this.svg.append('g')
            .attr('class', 'axis')
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale).ticks(10).tickSizeInner(6))
    }

    drawPath() {
        this.svg.selectAll('.line').remove()

        this.svg.append('path')
            .datum(this.dataset)
            .attr('class', 'line')
            .attr('d', this.line)

    }

    addPoint(point) {
        this.dataset.push(point)

        this.draw()
    }


}

class PlotsManager {

    constructor() {
        _self = this
        this.plot = []
    }

    createPlot(container, width, height) {
        this.plot[container] = new Plot(container, width, height)
    }

    addPoint(container, point) {
        this.plot[container].addPoint(point)
    }
}

export {
    PlotsManager,
    Point
}