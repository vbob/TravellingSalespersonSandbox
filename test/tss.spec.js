var assert = require('assert');
let TSS = require('../public_html/tss')

describe('TSS', function () {
  it('should create a empty array of cities', function () {
    let tss1 = new TSS()
    assert.strictEqual(tss1.cities.length, 0)
  });
});