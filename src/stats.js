/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

// eslint-disable indent 
class StatsManager {
    constructor(selectors) {
        this.defineSelectors(selectors)
    }

    defineSelectors(selectors) {
        this.stepNumberSelector = document.querySelector(selectors.stepNumberSelector)
        this.timeElapsedSelector = document.querySelector(selectors.timeElapsedSelector)
        this.longestPathSelector = document.querySelector(selectors.longestPathSelector)
        this.shortestPathSelector = document.querySelector(selectors.shortestPathSelector)
        this.memoryUsageSelector = document.querySelector(selectors.memoryUsageSelector)
        this.processorUsageSelector = document.querySelector(selectors.processorUsageSelector)
        this.runSpeedSelector = document.querySelector(selectors.runSpeedSelector)
        this.statusSelector = document.querySelector(selectors.statusSelector)
    }

    changeProperty(property, newValue) {
        //eslint-disable-next-line no-eval
        eval(`this.${property}Selector.innerHTML = '${newValue}'`)
    }
}

export {
    StatsManager
}