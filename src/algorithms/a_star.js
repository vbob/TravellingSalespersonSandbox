/* eslint-disable require-jsdoc */
/* eslint-disable func-style */
/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import {
    SNode
} from '../snode'

let _id = 'a_star'
let _displayName = 'A*'
let _useHeuristics = true


function compareCities(a, b) {
    return a.heuristics > b.heuristics
}

function addOrdered(frontier, newNode) {
    if (frontier.length == 0)
        frontier.push(newNode)

    else
        frontier.forEach((node, i) => {
            if (node.pathCost + node.state.heuristics > newNode.pathCost + newNode.state.heuristics)
                frontier.splice(i, 0, newNode)
        })
}

class AStar {
    static get id() {
        return _id
    }

    static get displayName() {
        return _displayName
    }

    static get useHeuristics() {
        return _useHeuristics
    }

    static start(problem) {
        let node = new SNode(problem.initialState, null, 0, 0)
        problem.frontier.push(node)
    }

    static step(problem) {
        if (problem.frontier.length == 0) {
            problem.finish({
                status: 1,
                message: 'border is empty'
            })

            return null
        } else {
            let node = problem.frontier.shift()

            let actions = problem.actions(node)

            actions.forEach(action => {
                addOrdered(problem.frontier, node.createChildNode(action, node.state.distanceTo(action), 0))
            })

            console.log(problem.frontier)

            if (problem.goalTest(node)) {
                problem.finish({
                    status: 1,
                    message: problem.solution(node)
                })
            }

            return node
        }


    }
}

export {
    AStar
}