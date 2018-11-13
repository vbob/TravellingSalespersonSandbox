/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import {
    BFS
} from './bfs'

import {
    DFS
} from './dfs'

import {
    Subject
} from 'rxjs';
import {
    TSP
} from '../tsp';


let statusAnnounceSource = new Subject();
let stepAnnounceSource = new Subject();
let currentNodeAnnouceSource = new Subject();

let _self

class AlgorithmManager {
    constructor(citiesArray) {
        _self = this

        this.citiesArray = citiesArray

        this.algorithmList = {
            bfs: BFS,
            dfs: DFS
        }

        this.initializeAnnoucers()
        this.selectedAlgorithm = ''
        this.running = false;
        this.currentNode = null
    }

    initializeAnnoucers() {
        this.statusAnnounce$ = statusAnnounceSource.asObservable()
        this.stepAnnounce$ = stepAnnounceSource.asObservable()
        this.currentNodeAnnounce$ = currentNodeAnnouceSource.asObservable()
    }

    announceStatus(status) {
        statusAnnounceSource.next(status)
    }

    announceStep(step) {
        stepAnnounceSource.next(step)
    }

    announceCurrentNode(node) {
        currentNodeAnnouceSource.next(node)
    }

    changeAlgorithm(algorithm) {
        _self.selectedAlgorithm = algorithm
        _self.problem = new TSP(_self.citiesArray)
    }

    play() {
        if (_self.validAlgorithmSelected()) {
            _self.algorithmList[_self.selectedAlgorithm].start(_self.problem)
            _self.announceStatus('running')

            _self.running = true
            _self.step()
        }
    }

    validAlgorithmSelected() {
        let isSelected = false

        for (let algorithm in _self.algorithmList) {
            if (_self.selectedAlgorithm === _self.algorithmList[algorithm].id) isSelected = true
        }

        return isSelected
    }

    pause() {
        if (_self.validAlgorithmSelected())
            console.log('pause')
    }

    stop() {
        this.border = new Array()
    }

    forward() {
        console.log('forward')
    }

    backward() {
        console.log('backward')
    }

    step() {
        let currNode = _self.algorithmList[_self.selectedAlgorithm].step(_self.problem)

        this.announceCurrentNode(currNode)

        if (!_self.problem.goalTest(currNode))
            setTimeout(() => {
                this.step()
            }, 1000)
    }
}

export {
    AlgorithmManager
}