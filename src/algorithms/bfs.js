/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

let _id = 'bfs'
let _displayName = 'Breadth-First Search (BFS)'
let _useHeuristics = false

class BFS {
    static get id() { return _id }
    static get displayName() { return _displayName }
    static get useHeuristics() { return _useHeuristics }
}

export { BFS }