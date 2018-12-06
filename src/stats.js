/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import {
    PlotsManager,
    Point
} from './plots'

// eslint-disable indent 
class StatsManager {
    constructor(selectors) {
        this.defineSelectors(selectors)
        this.stepNumber = 0;
        this.timeElapsed = 0;
        this.memoryUsage = 0;
        this.currentPath = 0;
        this.status = 'Parado';
        this.createPlots()
    }

    createPlots() {
        this.plots = new PlotsManager()
        this.plots.createPlot('#distance_plot', document.getElementById('main_stats').clientHeight * 2, document.getElementById('main_stats').clientHeight + 5)
        this.plots.createPlot('#memory_plot', document.getElementById('main_stats').clientHeight * 2, document.getElementById('main_stats').clientHeight + 5)

        this.distancePlotPoints = 0;
        this.memoryPlotPoints = 0;
    }

    defineSelectors(selectors) {
        this.stepNumberSelector = document.querySelector(selectors.stepNumberSelector)
        this.timeElapsedSelector = document.querySelector(selectors.timeElapsedSelector)
        this.currentPathSelector = document.querySelector(selectors.currentPathSelector)
        this.memoryUsageSelector = document.querySelector(selectors.memoryUsageSelector)
        this.runSpeedSelector = document.querySelector(selectors.runSpeedSelector)
        this.statusSelector = document.querySelector(selectors.statusSelector)
    }

    updateStats() {
        // this.timeElapsedSelector.innerHTML = this.timeElapsed;
        this.stepNumberSelector.innerHTML = this.stepNumber;
        this.memoryUsageSelector.innerHTML = this.memoryUsage;
        this.statusSelector.innerHTML = this.status;
        this.currentPathSelector.innerHTML = this.currentPath;


    }

    changeProperty(property, newValue) {
        if (property != 'status')
        //eslint-disable-next-line no-eval
            eval(`this.${property} = ${newValue}`)
        else if (property == 'status')
        //eslint-disable-next-line no-eval
            eval(`this.${property} = '${newValue}'`)

        if (property == 'currentPath') {
            this.plots.addPoint('#distance_plot', new Point('distance', this.distancePlotPoints, Number(newValue)))
            this.distancePlotPoints += 1
        } else if (property == 'memoryUsage') {
            this.plots.addPoint('#memory_plot', new Point('memory', this.memoryPlotPoints, Number(newValue)))
            this.memoryPlotPoints += 1
        }

        this.updateStats();
    }
}

export {
    StatsManager
}