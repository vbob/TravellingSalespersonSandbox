// This file handles the control-panel buttons

// Enables tooltips
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

// Array of buttons to ease the access
btns_array = {
    'start': document.getElementById('btn_start'),
    'stop': document.getElementById('btn_stop'),
    'pause': document.getElementById('btn_pause'),
    'forward': document.getElementById('btn_forward'),
    'backward': document.getElementById('btn_backward'),
    'save': document.getElementById('btn_save')
}


/**
 * Disable all buttons
 *
 */
function disable_buttons() {
    // Iterate through btns_array
    for (key in btns_array) {
        // Disable it
        btns_array[key].disabled = true

        // Remove all color possibilities
        btns_array[key].classList.remove('btn-primary')
        btns_array[key].classList.remove('btn-warning')
        btns_array[key].classList.remove('btn-danger')
        btns_array[key].classList.remove('btn-info')

        // Make it grey
        btns_array[key].classList.add('btn-secondary')
    }
}


/**
 * Disable a specific button
 *
 * @param {button} button
 */
function disable_button(button) {
    // Disable it
    btns_array[button].disabled = true

    // Remove all color possibilities
    btns_array[button].classList.remove('btn-primary')
    btns_array[button].classList.remove('btn-warning')
    btns_array[button].classList.remove('btn-danger')
    btns_array[button].classList.remove('btn-info')

    // Make it grey
    btns_array[button].classList.add('btn-secondary')
}

/**
 * Enable a specific button
 *
 * @param {button} button
 */
function enable_button(button) {
    // Enable it
    btns_array[button].disabled = false

    // Remove the grey color
    if (btns_array[button].classList.contains('btn-secondary'))
        btns_array[button].classList.remove('btn-secondary')

    // Add correct color according to functionality

    // Start, Forward and Backword -> Sea-Green
    if (button == 'start' || button == 'forward' || button == 'backward') {
        btns_array[button].classList.add('btn-primary')
    }

    // Pause -> Orange
    else if (button == 'pause')
        btns_array[button].classList.add('btn-warning')

    // Stop -> Red
    else if (button == 'stop')
        btns_array[button].classList.add('btn-danger')

    // Save -> Blue
    else if (button == 'save')
        btns_array[button].classList.add('btn-info')
}

// Start with all buttons disabled
disable_buttons()

// Control Variables for Algorithm Execution
let Problem
let Algorithm
let current_run
let time = 10
let algorithm_loop
let initial_time

/**
 * Define the Problem
 *
 * @param {*} problem
 */
function define_problem(problem) {
    Problem = problem
}

/**
 * Algorithm Pause Event
 *
 */
function algorithm_pause() {
    disable_buttons()
    enable_button('start')
    enable_button('forward')
    clearInterval(algorithm_loop)
    removeFastButtons()

    hideExecSpeed()
}

/**
 * Algorithm Stop Event
 *
 */
function algorithm_stop() {
    clearInterval(algorithm_loop)
    disable_buttons()
    clearStats()

    current_run = new Problem()
    border = []
    initial_time = null

    hideExecSpeed()
    hideStatus()

    states = {
        'convergency': ['convergency'],
        'distance': ['distance'],
        'processor': ['processor'],
        'memory': ['memory']
    }

    steps = ['steps']
    update_charts()

    deleteConnections()

    if (Algorithm != '' && Algorithm) {
        if (!algorithm_list[Algorithm].heuristics) {
            enable_button('start')
            enable_button('forward')
        }

        removeFastButtons()

        algorithm_list[Algorithm].init_function()
    }
}

/**
 * Algorithm Start Event
 *
 */
function algorithm_start() {
    disable_button('start')
    enable_button('pause')
    enable_button('stop')
    enable_button('forward')
    enable_button('backward')
    addFastButtons()

    showExecSpeed()

    if (!initial_time)
        initial_time = new Date()

    else
        initial_time = new Date() - Number(Number(stats.time_elapsed))

    algorithm_loop = setInterval(algorithm_list[Algorithm].step_function, time * 1 / (stats['exec_speed'] / 100))
}

/**
 * Algorithm Change Event
 *
 * @param {*} algorithm
 */
function algorithm_change(algorithm) {
    Algorithm = algorithm

    algorithm_stop()
}


/**
 * Algorithm End Event
 *
 */
function algorithm_end(status) {
    disable_buttons()
    enable_button('stop')
    showStatus()

    if (!status)
        status = "Unknown"

    stats['status'] = status

    updateStats()

    clearInterval(algorithm_loop)

    hideExecSpeed()
}


/**
 * Increase Run Speed
 *
 */
function increase_speed() {
    clearInterval(algorithm_loop)

    if (stats['exec_speed'] < 90)
        stats['exec_speed'] += 11


    algorithm_loop = setInterval(algorithm_list[Algorithm].step_function, time * 1 / (stats['exec_speed'] / 100))
}


/**
 * Decrease Run Speed
 *
 */
function decrease_speed() {
    clearInterval(algorithm_loop)

    if (stats.exec_speed > 11)
        stats['exec_speed'] -= 11

    algorithm_loop = setInterval(algorithm_list[Algorithm].step_function, time * 1 / (stats['exec_speed'] / 100))
}


/**
 * Change step Buttons to Fast Buttons
 *
 */
function addFastButtons() {
    document.getElementById('btn_forward_icon').classList.remove('fa-step-forward')
    document.getElementById('btn_forward_icon').classList.add('fa-fast-forward')

    btns_array['forward'].removeEventListener('click', algorithm_list[Algorithm].step_function)
    btns_array['forward'].addEventListener('click', increase_speed)

    btns_array['backward'].addEventListener('click', decrease_speed);
}

/**
 * Change Fast Buttons to step Buttons
 *
 */
function removeFastButtons() {
    document.getElementById('btn_forward_icon').classList.remove('fa-fast-forward')
    document.getElementById('btn_forward_icon').classList.add('fa-step-forward')
    btns_array['forward'].removeEventListener('click', increase_speed)
    btns_array['forward'].addEventListener('click', algorithm_list[Algorithm].step_function)

    btns_array['backward'].removeEventListener('click', decrease_speed);
}

// Start Listeners
btns_array['start'].addEventListener('click', algorithm_start)
btns_array['pause'].addEventListener('click', algorithm_pause)
btns_array['stop'].addEventListener('click', algorithm_stop)
