/* eslint-disable max-statements */
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
    AStar
} from './a_star'

import {
    KOpt
} from './kopt'

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


var startTime, endTime;

function start() {
    startTime = new Date();
};

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms

    // get seconds 
    var seconds = Math.round(timeDiff);
    return seconds
}

class AlgorithmManager {
    constructor(citiesArray) {
        _self = this

        this.citiesArray = citiesArray

        this.algorithmList = {
            bfs: BFS,
            dfs: DFS,
            a_star: AStar
        }

        this.heuristicsList = {
            kopt: KOpt
        }

        this.initializeAnnoucers()
        this.selectedAlgorithm = ''
        this.selectedHeuristic = ''

        this.status = 'stopped';
        this.currentNode = null

        this.started = false

        this.createStats()
    }

    createStats() {
        this.stepNumber = 0
        this.numberOfNodes = 0
        this.timeElapsed = 0
        this.currentPath = 0
    }

    initializeAnnoucers() {
        this.statusAnnounce$ = statusAnnounceSource.asObservable()
        this.stepAnnounce$ = stepAnnounceSource.asObservable()
        this.currentNodeAnnounce$ = currentNodeAnnouceSource.asObservable()
    }

    announceStatus(status) {
        statusAnnounceSource.next(status)
        _self.status = status
    }

    announceStep() {
        stepAnnounceSource.next({
            stepNumber: _self.stepNumber,
            numberOfNodes: _self.numberOfNodes,
            timeElapsed: _self.timeElapsed,
            currentPath: _self.currentPath.toFixed(0)
        })
    }

    announceCurrentNode(node) {
        currentNodeAnnouceSource.next(node)
    }

    changeAlgorithm(algorithm) {
        _self.selectedAlgorithm = algorithm
        _self.stop()
        _self.problem = new TSP(_self.citiesArray)
        _self.createStats()
    }

    changeHeuristics(heuristics) {
        _self.selectedHeuristics = heuristics
        _self.stop()
        _self.problem = new TSP(_self.citiesArray)
        _self.createStats()
    }

    play() {
        if (_self.validAlgorithmSelected() && _self.status == 'stopped') {
            _self.algorithmList[_self.selectedAlgorithm].start(_self.problem)
            _self.announceStatus('running')
            _self.step()
        } else if (_self.validAlgorithmSelected() && _self.status == 'paused') {
            _self.announceStatus('running')
            _self.step()
        }
    }

    validAlgorithmSelected() {
        let isSelected = false

        for (let algorithm in _self.algorithmList) {
            if (_self.selectedAlgorithm === _self.algorithmList[algorithm].id) {
                isSelected = true;

            }
        }

        return isSelected
    }

    validHeuristicsSelected() {
        let isSelected = false

        for (let heuristics in _self.heuristicsList) {
            if (_self.selectedHeuristics === _self.heuristicsList[heuristics].id) {
                isSelected = true;
            }
        }

        return isSelected
    }

    pause() {
        if (_self.status == 'running')
            _self.announceStatus('paused')

    }

    stop() {
        if (_self.status == 'running' || _self.status == 'paused' || _self.status == 'ended') {
            _self.announceStatus('stopped')
            _self.border = new Array()
            _self.problem = new TSP(_self.citiesArray)
            _self.started = false
        }
    }

    end() {
        _self.announceStatus('ended')
    }

    forward() {
        if (_self.validAlgorithmSelected() && _self.status == 'stopped') {
            _self.algorithmList[_self.selectedAlgorithm].start(_self.problem)
            _self.announceStatus('paused')
            _self.step()
        } else if (_self.validAlgorithmSelected() && _self.status == 'paused') {
            _self.step()
        }
    }

    backward() {
        console.log('backward')
    }

    step() {
        let currNode = _self.algorithmList[_self.selectedAlgorithm].step(_self.problem)

        _self.stepNumber += 1

        _self.numberOfNodes = _self.problem.frontier.length;
        _self.currentPath = currNode.pathCost;

        if (_self.algorithmList[_self.selectedAlgorithm].useHeuristics)
            _self.calculateHeuristics(currNode)

        if (_self.stepNumber % 10) {
            _self.timeElapsed = (end() * (_self.stepNumber / 10)).toFixed(0)
            start()
        }

        _self.announceCurrentNode(currNode)
        _self.announceStep()

        let algorithmCompleted = _self.problem.goalTest(currNode);

        if (!algorithmCompleted && _self.status == 'running')
            setTimeout(() => {
                if (_self.status == 'running') _self.step()
            }, 1)

        else if (algorithmCompleted) {
            _self.end()
        }
    }

    calculateHeuristics(currNode) {
        _self.citiesArray.forEach(city => {
            _self.heuristicsList[_self.selectedHeuristics].calculate(city, currNode)
        })
    }
}


export {
    AlgorithmManager
}