/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

let _id = 'dfs'
let _displayName = 'Depht-First Search (DFS)'
let _useHeuristics = true

class DFS {
    static get id() { return _id }
    static get displayName() { return _displayName }
    static get useHeuristics() { return _useHeuristics }
}

export { DFS }