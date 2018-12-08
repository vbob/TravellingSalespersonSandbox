import {
    SNode
} from "../snode";

/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

let _id = 'kopt'
let _displayName = '2-Opt'

function twoOptSwap(route, i, k) {
    if (i == 0 || i == route.length - 1 || k == 0 || k == route.length - 1 || i == k)
        return route

    let newRoute = route.slice()

    let j = newRoute[k]
    newRoute[k] = newRoute[i]
    newRoute[i] = j

    return newRoute
}

function calculateTotalDistance(route) {
    let distance = 0;

    route.forEach((element, i) => {
        if (i > 1)
            distance += element.distanceTo(route[i - 1])
    });

    return distance
}

class KOpt {
    static get id() {
        return _id
    }

    static get displayName() {
        return _displayName
    }

    static calculate(problem, currentNode, announceNode, announceStep) {
        if (problem.goalTest(currentNode)) {
            let lastExistingRoute = problem.solution(currentNode)
            let existingRoute = problem.solution(currentNode)

            let optimizationMade = false
            do {
                optimizationMade = false

                for (let i = 1; i < problem.citiesArray.length; i++) {
                    for (let k = 1; k < problem.citiesArray.length; k++) {
                        let newRoute = twoOptSwap(existingRoute, i, k)

                        let node = new SNode(problem.initialState, null, 0)

                        newRoute.forEach((city, i) => {
                            if (i > 0)
                                node = node.createChildNode(city, node.state.distanceTo(city))
                        })

                        if (problem.goalTest(node) && node.pathCost < currentNode.pathCost) {
                            console.log('want announce')
                            console.log(`announced node`)
                            console.log(node)
                            optimizationMade = true
                            existingRoute = newRoute
                            currentNode = node
                            announceNode(node)
                            announceStep()
                        }

                    }
                }
            } while (optimizationMade)

            return currentNode
        }
    }
}

export {
    KOpt
}