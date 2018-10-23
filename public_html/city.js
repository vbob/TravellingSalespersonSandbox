class City {
    /**
     *Creates an instance of City.
     * @param {*} city
     * @memberof City
     */
    constructor(city) {
        var { id, x, y } = city

        if (isNaN(id) || isNaN(x) || isNaN(y))
            throw new Error('Not a city')

        this.id = id
        this.x = x
        this.y = y
    }

    /**
     * Calculate the distance from this city to another city
     *
     * @param {*} otherCity
     * @returns
     * @memberof City
     */
    calculateDistanceTo(otherCity) {
        if (!(otherCity instanceof City))
            throw new Error('Not a city')

        return Math.sqrt((otherCity.x - this.x) ** 2 + (otherCity.y - this.y) ** 2)
    }

    /**
     * Verify if two cities are the same
     *
     * @param {*} otherCity
     * @memberof City
     */
    equals(otherCity) {
        if (!(otherCity instanceof City))
            throw new Error('Not a city')

        return (this.id == otherCity.id) && (this.x == otherCity.x) && (this.y==otherCity.y)
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = City;
}
