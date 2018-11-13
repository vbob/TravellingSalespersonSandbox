/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

//eslint-disable-next-line no-unused-vars
import css1 from './css/cities_map.css'

//eslint-disable-next-line no-unused-vars
import css2 from './css/style.css'

import {
    Grid
} from './grid';

import {
    City
} from './city'

import {
    ControlPanel
} from './control_panel';

import {
    PlotsManager,
    Point
} from './plots';

let grid = new Grid('#cities_map_container')
grid.draw()

let selectorsCPanel = {
    algorithmSelector: '#algorithms',
    backwardButtonSelector: '#btn_backward',
    citiesQttySelector: '#num_cities',
    forwardButtonSelector: '#btn_forward',
    heuristicsContainerSelector: '#heuristic_options',
    heuristicsSelector: '#heuristics',
    pauseButtonSelector: '#btn_pause',
    playButtonSelector: '#btn_start',
    saveButtonSelector: '#btn_save',
    stopButtonSelector: '#btn_stop'

}

let controlPanel = new ControlPanel(selectorsCPanel, grid)

// let plots = new PlotsManager()
// plots.createPlot('#covergence_plot', document.getElementById('main_stats').clientHeight * 2, document.getElementById('main_stats').clientHeight + 5)
// plots.createPlot('#distance_plot', document.getElementById('main_stats').clientHeight * 2, document.getElementById('main_stats').clientHeight + 5)
// plots.createPlot('#memory_plot', document.getElementById('main_stats').clientHeight * 2, document.getElementById('main_stats').clientHeight + 5)
// plots.createPlot('#processor_plot', document.getElementById('main_stats').clientHeight * 2, document.getElementById('main_stats').clientHeight + 5)

// let i = 0
// let j = 0;
// let k = 0;
// let l = 0;


// plots.addPoint('#covergence_plot', new Point('convergence', i++, Math.log10(i)))
// plots.addPoint('#distance_plot', new Point('convergence', j++, Math.cos(j)))
// plots.addPoint('#memory_plot', new Point('convergence', k++, Math.pow(k - 1000, 2)))

// plots.addPoint('#processor_plot', new Point('convergence', l++, Math.pow(l - 1000, 3)))

// plots.addPoint('#covergence_plot', new Point('convergence', i++, Math.log10(i)))
// plots.addPoint('#distance_plot', new Point('convergence', j++, Math.cos(j)))
// plots.addPoint('#memory_plot', new Point('convergence', k++, Math.pow(k - 1000, 2)))

// plots.addPoint('#processor_plot', new Point('convergence', l++, Math.pow(l - 1000, 3)))

// plots.addPoint('#covergence_plot', new Point('convergence', i++, Math.log10(i)))
// plots.addPoint('#distance_plot', new Point('convergence', j++, Math.cos(j)))
// plots.addPoint('#memory_plot', new Point('convergence', k++, Math.pow(k - 1000, 2)))

// plots.addPoint('#processor_plot', new Point('convergence', l++, Math.pow(l - 1000, 3)))