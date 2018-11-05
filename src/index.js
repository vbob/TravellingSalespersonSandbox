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
import { StatsManager } from './stats';

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