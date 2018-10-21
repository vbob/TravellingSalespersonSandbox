// This file handles the right sidebar general options

// Form Elements
num_cities = document.getElementById('num_cities')
algorithms_select = document.getElementById('algorithms')
exec_speed_container = document.getElementById('exec_speed_container')
status_container = document.getElementById('status_container')

// Event caller for number of cities update
num_cities.addEventListener('change', change_cities)

// Change focus when enter is pressed
num_cities.onkeypress = function (e) {
    var key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        alg_type.focus()

        return false;
    }
}

/**
 * Generate cities according to quantity defined
 *
 */
function change_cities() {
    if (num_cities.value >= 4) {
        cities_array = []

        for (i = 0; i < num_cities.value; i++)
            cities_array.push(new City(cities_array.length, Math.random() * width, Math.random() * height))

        updateMap()
    }

    algorithm_stop()
}

/**
 * Hide ExecSpeed Dialog
 *
 */
function hideExecSpeed() {
    exec_speed_container.classList.add('d-none')
}

/**
 * Show ExecSpeed Dialog
 *
 */
function showExecSpeed() {
    exec_speed_container.classList.remove('d-none')
}

/**
 * Hide Status Dialog
 *
 */
function hideStatus() {
    status_container.classList.add('d-none')
}

/**
 * Show Status Dialog
 *
 */
function showStatus() {
    status_container.classList.remove('d-none')
}

hideExecSpeed()
hideStatus()