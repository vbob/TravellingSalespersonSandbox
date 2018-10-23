/*
 * travelling_salesperson_sadbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

// Cities Map container

class Grid {
    constructor(d3) {
        this.d3 = d3
        
        var chartDiv = d3.select("cities_map_container");
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Grid;
}