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
    }

    solution(node) {
        let solution = new Array()
        node.state.cost = 0

        solution.unshift(node.state)

        while (node.parent) {
            node.parent.cost = node.state.distanceTo(node.parent.state) + node.state.cost
            node = node.parent
            solution.unshift(node.state)
        }

        return solution
    }

    actions(node) {
        let sol = this.solution(node)
        let actions = this.citiesArray.filter(city => !sol.find(solCity => city.equals(solCity)))

        if (actions.length == 0)
            actions.push(this.initialState)

        return actions
    }

    goalTest(node) {
        let sol = this.solution(node)
        let checkVisitedCities = this.citiesArray.filter(city => !sol.find(solCity => city.equals(solCity)))

        return checkVisitedCities.length == 0 && sol[sol.length - 1] == this.initialState && sol[0] == this.initialState;;
    }

    finish({
        status,
        message
    }) {

        console.log('Exited with status ' + status)

        if (status == 0) {
            this.solution = () => {
                return message
            }
        } else console.log(message)
    }
}

export {
    TSP
}