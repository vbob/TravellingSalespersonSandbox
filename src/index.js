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

import { Grid } from './grid';

let grid = new Grid('#cities_map_container', 1800, 514)
grid.draw()