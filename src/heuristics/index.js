/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import {
    MinimumSpanningTree
} from "./mst";

class HeuristicsManager {
    constructor() {
        this.heuristicsList = [
            MinimumSpanningTree
        ]
    }
}

export {
    HeuristicsManager
}