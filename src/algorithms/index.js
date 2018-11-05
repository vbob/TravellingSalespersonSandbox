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


let statusAnnounceSource = new Subject();
let stepAnnounceSource = new Subject();

let _self

class AlgorithmManager {
    constructor() {
        _self = this

        this.algorithmList = {
            bfs: BFS,
            dfs: DFS
        }

        this.initializeAnnoucers()
        this.selectedAlgorithm = ''

        this.border = new Array()

        this.status = 'stopped'
    }

    initializeAnnoucers() {
        this.statusAnnounce$ = statusAnnounceSource.asObservable()
        this.stepAnnounce$ = stepAnnounceSource.asObservable()
    }

    announceStatus(status) {
        statusAnnounceSource.next(status)
    }

    announceStep(step) {
        stepAnnounceSource.next(step)
    }

    changeAlgorithm(algorithm) {
        this.selectedAlgorithm = algorithm
    }

    play() {
        if (_self.validAlgorithmSelected())
            _self.algorithmList[_self.selectedAlgorithm].start()
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
}

export {
    AlgorithmManager
}