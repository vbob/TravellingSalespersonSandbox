var assert = require('assert');
let City = require('../public_html/city')

describe('City', function () {
  it('should create a city', function () {
    let city1 = new City({ id: 0, x: 1000, y: 2000 })

    assert.strictEqual(city1.id, 0)
    assert.strictEqual(city1.x, 1000)
    assert.strictEqual(city1.y, 2000)
  });

  it('should throw error if invalid arguments are passed', function () {
    assert.throws(function () { new City({}) }, Error)
  });

  describe('City.calculateDistance', function () {
    let city2 = new City({ id: 1, x: 0, y: 0 })
    let city3 = new City({ id: 2, x: 3, y: 4 })

    it('should calculate the distance between two cities', function () {
      assert.strictEqual(city2.distanceTo(city3), 5)
    })

    it('should refuses wrong parameters', function () {
      assert.throws(function () { new City({}) }, Error)
    })
  })

  describe('City.equals', function() {
    let city4 = new City({ id: 1, x: 0, y: 0 })
    let city5 = new City({ id: 1, x: 0, y: 0 })
    let city6 = new City({ id: 2, x: 3, y: 4 })

    let city7 = new City({ id: 2, x: 5, y: 6 })
    let city8 = new City({ id: 3, x: 5, y: 6 })

    it('should return true if it is the same object', function() {
      assert.strictEqual(city4.equals(city4), true)
    })

    it('should return true if they are different objects with same properties', function() {
      assert.strictEqual(city4.equals(city5), true)
    })

    it('should return false if they have different ids and different x and y values', function() {
      assert.strictEqual(city5.equals(city6), false)
    })

    it('should return false if they have same ids but different x and y values', function() {
      assert.strictEqual(city6.equals(city7), false)
    })

    it('should return false if it has different ids but same x and y values', function() {
      assert.strictEqual(city7.equals(city8), false)
    })
  })
});