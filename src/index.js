/*
 * travelling_salesperson_sandbox
 * https://github.com/vbob/travelling_salesperson_sandbox
 * 
 * Copyright (c) 2018 Vitor Barth
 * Licensed under the MIT License
 * 
 */

import css1 from './css/cities_map.css'
import css2 from './css/style.css'

import "babel-polyfill"

import { Grid } from './grid';
import { City } from './city'
import { ControlPanel } from './control_panel';

let grid = new Grid('#cities_map_container')
grid.draw()

let city1 = new City({id: 1, x: 1580, y:300})
let city2 = new City({id: 2, x: 1200, y:180})
let city3 = new City({id: 3, x: 1330, y:200})
let city4 = new City({id: 4, x: 900, y:230})
let city5 = new City({id: 5, x: 330, y:25})
let city6 = new City({id: 6, x: 700, y:128})

grid.addCity(city1)
grid.addCity(city2)
grid.addCity(city3)
grid.addCity(city4)
grid.addCity(city5)
grid.addCity(city6)

let controlPanel = new ControlPanel('algorithms', 'heuristics')
