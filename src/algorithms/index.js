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

class AlgorithmManager {
    constructor() {
        this.algorithmList = {
            bfs: BFS,
            dfs: DFS
        }

        this.initializeAnnoucers()
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

    play() {
        console.log('play')
    }

    pause() {

    }

    stop() {

    }

    forward() {

    }

    backward() {

    }
}

export {
    AlgorithmManager
}