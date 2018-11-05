/* eslint-disable max-statements */
/* eslint-disable no-eval */
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
import {
    City
} from "./city";
import {
    StatsManager
} from "./stats";

let _self;

class ControlPanel {
    constructor(selectors, grid) {
        _self = this
        this.grid = grid

        this.algorithmManager = new AlgorithmManager()
        this.heuristicsManager = new HeuristicsManager()

        this.defineSelectors(selectors)
        this.hideHeuristicsMenu()
        this.importAlgorithms()
        this.importHeuristics()
        this.startListeners()

        this.createCities()
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

        this.citiesQttySelector = document.querySelector(selectors.citiesQttySelector)
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

        fromEvent(this.citiesQttySelector, 'change').subscribe(this.updateCitiesMap)
        fromEvent(this.playButtonSelector, 'click').subscribe(this.algorithmManager.play)
        fromEvent(this.pauseButtonSelector, 'click').subscribe(this.algorithmManager.pause)
        fromEvent(this.stopButtonSelector, 'click').subscribe(this.algorithmManager.stop)
        fromEvent(this.forwardButtonSelector, 'click').subscribe(this.algorithmManager.forward)
        fromEvent(this.backwardButtonSelector, 'click').subscribe(this.algorithmManager.backward)

        //fromEvent(this.saveButtonSelector, 'click').subscribe(this.save)

        fromEvent(this.algorithmSelector, 'change').subscribe(this.changeAlgorithm)

        this.startStatsManager()

        this.disableButton('stop')
        this.disableButton('play')
        this.disableButton('pause')
        this.disableButton('forward')
        this.disableButton('backward')
    }

    save() {
        //ToBeImplemented
    }

    changeAlgorithm() {
        let selectedAlgorithm = _self.algorithmSelector.value
        _self.algorithmManager.changeAlgorithm(selectedAlgorithm)

        if (_self.algorithmManager.validAlgorithmSelected()) {
            _self.enableButton('play')
            _self.enableButton('forward')
        } else {
            _self.disableButton('stop')
            _self.disableButton('play')
            _self.disableButton('pause')
            _self.disableButton('forward')
            _self.disableButton('backward')
        }
    }

    hideHeuristicsMenu() {
        _self.heuristicsContainerSelector.classList.add('d-none')
    }

    showHeuristicsMenu() {
        _self.heuristicsContainerSelector.classList.remove('d-none')
    }

    createCities() {
        let numCities = _self.citiesQttySelector.value

        let rndmX, rndmY;

        let f = (a1, a2) => {
            if (a1 < (0 + _self.grid.cityRadius))
                return 0 + _self.grid.cityRadius
            else if ((a1 > (a2 - _self.grid.cityRadius)))
                return a2 - _self.grid.cityRadius
            else return a1
        }


        for (let i = 0; i < numCities; i++) {
            rndmX = Math.random() * (_self.grid.width - _self.grid.cityRadius)
            rndmY = Math.random() * (_self.grid.height - _self.grid.cityRadius)

            _self.grid.addCity(new City({
                id: i + 1,
                x: f(rndmX, _self.grid.width),
                y: f(rndmY, _self.grid.height)
            }))
        }
    }

    //eslint-disable-next-line max-statements
    updateCitiesMap() {
        if (_self.citiesQttySelector.value > 3 && _self.citiesQttySelector.value < 21) {
            let numCities = _self.citiesQttySelector.value

            if (numCities > _self.grid.citiesArray.length) {
                let rndmX, rndmY;

                let f = (a1, a2) => {
                    if (a1 < (0 + _self.grid.cityRadius))
                        return 0 + _self.grid.cityRadius
                    else if ((a1 > (a2 - _self.grid.cityRadius)))
                        return a2 - _self.grid.cityRadius
                    else return a1
                }

                for (let i = _self.grid.citiesArray.length; i < numCities; i++) {
                    rndmX = Math.random() * (_self.grid.width - _self.grid.cityRadius)
                    rndmY = Math.random() * (_self.grid.height - _self.grid.cityRadius)

                    _self.grid.addCity(new City({
                        id: i + 1,
                        x: f(rndmX, _self.grid.width),
                        y: f(rndmY, _self.grid.height)
                    }))
                }

            } else if (numCities < _self.grid.citiesArray.length) {
                let toBeRemoved = _self.grid.citiesArray.length - numCities

                for (let i = 0; i < toBeRemoved; i++) {
                    _self.grid.removeCity(_self.grid.citiesArray[_self.grid.citiesArray.length - 1])
                }
            }
        }
    }

    startStatsManager() {
        let selectorsStats = {
            longestPathSelector: '#longest_path',
            memoryUsageSelector: '#ram_usage',
            processorUsageSelector: '#processor_usage',
            runSpeedSelector: '#exec_speed',
            shortestPathSelector: '#shortest_path',
            statusSelector: '#status',
            stepNumberSelector: '#step_number',
            timeElapsedSelector: '#time_elapsed'
        }

        let stats = new StatsManager(selectorsStats)
    }

    disableButton(button) {
        eval(`_self.${button}ButtonSelector.disabled = true`)
    }

    enableButton(button) {
        eval(`_self.${button}ButtonSelector.disabled = false`)
    }

    changeStatus(status) {


        if (status == 'parado') {
            _self.statsManager.changeProperty('status', 'Parado')
            if (_self.algorithmManager.validAlgorithmSelected()) {
                _self.enableButton('play')
                _self.enableButton('forward')
            } else {
                _self.disableButton('stop')
                _self.disableButton('play')
                _self.disableButton('pause')
                _self.disableButton('forward')
                _self.disableButton('backward')
            }
        }
    }
}

export {
    ControlPanel
}