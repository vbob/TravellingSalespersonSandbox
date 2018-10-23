let d3 = require('../public_html/assets/d3.v5.min')
let Grid = require('../public_html/grid')

describe('Grid', function () {
    var c;

    beforeEach(function () {
        c = new Grid(d3)
        c.render()
    })

    afterEach(function () {
        d3.selectAll('svg').remove();
    });
})