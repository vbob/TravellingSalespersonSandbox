/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import { AlgorithmManager } from "./algorithms";
import { HeuristicsManager } from "./heuristics"

class ControlPanel {
    constructor(algorithmSelectorId, heuristicsSelectorId) {
        this.algorithmManager = new AlgorithmManager()
        this.heuristicsManager = new HeuristicsManager()

        this.algorithmSelector = document.getElementById(algorithmSelectorId)
        this.heuristicsSelector = document.getElementById(heuristicsSelectorId)

        this.importAlgorithms()
        this.importHeuristics()
    }

    importAlgorithms() {
        for (let i = 0; i < this.algorithmSelector.length; i++) 
            this.algorithmSelector[i] = null

        this.algorithmManager.algorithmList.forEach(algorithm => {
            let newOption = document.createElement('option')
            newOption.text = algorithm.displayName
            newOption.value = algorithm.id
            this.algorithmSelector.add(newOption)
        })
    }

    importHeuristics() {
        for (let i = 0; i < this.heuristicsSelector.length; i++) 
            this.heuristicsSelector[i] = null

        this.heuristicsManager.heuristicsList.forEach(heuristic => {
            let newOption = document.createElement('option')
            newOption.text = heuristic.displayName
            newOption.value = heuristic.id
            this.heuristicsSelector.add(newOption)
        })
    }
}

export {
    ControlPanel
}