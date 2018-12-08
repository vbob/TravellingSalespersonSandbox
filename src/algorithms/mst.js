/* eslint-disable max-classes-per-file */
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

let _id = 'mst'
let _displayName = 'Minimum Spanning Tree (MST)'

class Edge {
    constructor(a, b) {
        this.A = a
        this.B = b
        this.distance = a.distanceTo(b)
    }
}


function addOrdered(edges, newEdge) {
    if (edges.length == 0)
        edges.push(newEdge)

    else
        edges.forEach((edge, i) => {
            if (edge.distance > newEdge.distance &&
                !edges.find(element => {
                    return element.A == newEdge.A && element.B == newEdge.B
                }))
                edges.splice(i, 0, newEdge)
        })
}

function createEdges(actions, cb) {
    let edges = new Array()

    actions.forEach((actionOuter, i) => {
        actions.forEach((actionInner, j) => {
            if (actionInner != actionOuter)
                addOrdered(edges, new Edge(actionInner, actionOuter))
        })
    })

    return edges

}


class MST {
    static get id() {
        return _id
    }

    static get displayName() {
        return _displayName
    }

    static calculate(problem, city, currentNode) {
        let child = currentNode.createChildNode(city, currentNode.state.distanceTo(city), 0)

        let h = 0

        let actions = problem.actions(child)

        let edges = createEdges(actions)
        let subgraph = new Array()

        edges.forEach(edge => {
            if (!subgraph.find(element => {
                    return element.A == edge.A
                }) ||
                !subgraph.find(element => {
                    return element.B == edge.B
                }))
                h += edge.distance
            subgraph.push(edge)
        });

        return h;
    }
}



export {
    MST
}