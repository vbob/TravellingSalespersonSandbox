/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

class TSP {
    constructor(citiesArray) {
        this.frontier = new Array()
        this.citiesArray = citiesArray
        this.initialState = citiesArray[0]
        console.log(citiesArray[0])
    }

    solution(node) {
        let solution = new Array()
        solution.unshift(node.state)

        while (node.parent) {
            node = node.parent
            solution.unshift(node.state)
        }

        return solution
    }

    actions(node) {
        let sol = this.solution(node)

        return this.citiesArray.filter(city => !sol.find(solCity => city.equals(solCity)))
    }

    goalTest(node) {
        let sol = this.solution(node)

        return this.citiesArray.filter(city => !sol.find(solCity => city.equals(solCity))).length == 0
    }

    finish({
        status,
        message
    }) {
        console.log('Exited with status ' + status + ': ' + message)
    }
}

export {
    TSP
}