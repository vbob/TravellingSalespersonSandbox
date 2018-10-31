/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import * as d3 from 'd3'

class Grid {
    constructor(container, width, height) {
        this.container = container
        this.width = width
        this.height = height
    }

    draw() {
        d3.select(this.container)
            .style('padding', '0')
            .append('svg')
            .attr('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight / 1.8}`)
            .append("rect")
            .attr("width", '100%')
            .attr("height", '100%')
            .style('fill', 'none')

    }
}

export { Grid }