/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import {
    AlgorithmManager
} from "./algorithms";

import {
    HeuristicsManager
} from "./heuristics"

import {
    fromEvent
} from 'rxjs'

let _self;

class ControlPanel {
    constructor(selectors) {
        _self = this

        this.algorithmManager = new AlgorithmManager()
        this.heuristicsManager = new HeuristicsManager()

        this.defineSelectors(selectors)
        this.hideHeuristicsMenu()
        this.importAlgorithms()
        this.importHeuristics()
        this.startListeners()
    }

    defineSelectors(selectors) {
        this.algorithmSelector = document.querySelector(selectors.algorithmSelector)

        this.heuristicsContainerSelector = document.querySelector(selectors.heuristicsContainerSelector)
        this.heuristicsSelector = document.querySelector(selectors.heuristicsSelector)

        this.playButtonSelector = document.querySelector(selectors.playButtonSelector)
        this.pauseButtonSelector = document.querySelector(selectors.pauseButtonSelector)
        this.stopButtonSelector = document.querySelector(selectors.stopButtonSelector)
        this.forwardButtonSelector = document.querySelector(selectors.forwardButtonSelector)
        this.backwardButtonSelector = document.querySelector(selectors.backwardButtonSelector)
        this.saveButtonSelector = document.querySelector(selectors.saveButtonSelector)
    }

    importAlgorithms() {
        for (let i = 0; i < this.algorithmSelector.length; i++)
            this.algorithmSelector[i] = null

        let newOption = document.createElement('option')
        newOption.value = null
        this.algorithmSelector.add(newOption)

        for (let algorithm in this.algorithmManager.algorithmList) {
            if (this.algorithmManager.algorithmList[algorithm].id && this.algorithmManager.algorithmList[algorithm].displayName) {
                let newOption = document.createElement('option')
                newOption.text = this.algorithmManager.algorithmList[algorithm].displayName
                newOption.value = this.algorithmManager.algorithmList[algorithm].id
                this.algorithmSelector.add(newOption)
            }
        }
    }

    importHeuristics() {
        for (let i = 0; i < this.heuristicsSelector.length; i++)
            this.heuristicsSelector[i] = null

        let newOption = document.createElement('option')
        newOption.text = ''
        newOption.value = null
        this.heuristicsSelector.add(newOption)

        this.heuristicsManager.heuristicsList.forEach(heuristic => {
            let newOption = document.createElement('option')
            newOption.text = heuristic.displayName
            newOption.value = heuristic.id
            this.heuristicsSelector.add(newOption)
        })
    }

    startListeners() {
        fromEvent(this.playButtonSelector, 'click').subscribe(this.algorithmManager.play)
        fromEvent(this.pauseButtonSelector, 'click').subscribe(this.algorithmManager.pause)
        fromEvent(this.stopButtonSelector, 'click').subscribe(this.algorithmManager.stop)
        fromEvent(this.forwardButtonSelector, 'click').subscribe(this.algorithmManager.forward)
        fromEvent(this.backwardButtonSelector, 'click').subscribe(this.algorithmManager.backward)
        fromEvent(this.saveButtonSelector, 'click').subscribe(this.save)

        fromEvent(this.algorithmSelector, 'change').subscribe(this.changeAlgorithm)
    }

    save() {
        //ToBeImplemented
    }

    changeAlgorithm() {
        let selectedAlgorithm = _self.algorithmSelector.value

        if (selectedAlgorithm !== 'null' && _self.algorithmManager.algorithmList[selectedAlgorithm].useHeuristics) {
            _self.showHeuristicsMenu()
        } else {
            _self.hideHeuristicsMenu()
        }
    }

    hideHeuristicsMenu() {
        _self.heuristicsContainerSelector.classList.add('d-none')
    }

    showHeuristicsMenu() {
        _self.heuristicsContainerSelector.classList.remove('d-none')
    }
}

export {
    ControlPanel
}