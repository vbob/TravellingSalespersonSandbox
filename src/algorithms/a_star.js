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

    static set heuristc(heuristic) {
        this.heuristic = heuristic
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

            problem.actions(node).forEach(action => {
                let child = node.createChildNode(action, node.state.distanceTo(action), 0)
                problem.frontier.unshift(child)
            })

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