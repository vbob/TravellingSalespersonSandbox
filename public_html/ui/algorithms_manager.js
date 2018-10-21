// This file handle algorithms import from /algorithms folder
// To add new algorithms, remember to add them im /algorithms/index.js

/**
 * Request algorithms list from server. 
 * It looks the /algorithms/list route.
 * Callback sends a array of algorithms files name that can be imported by accessing /algorithms/algorithm_name.
 *
 * @param {*} callback
 */
function get_algorithms_list(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/algorithms/list')
    xhr.onload = function () {
        if (xhr.status === 200) {
            callback(eval(xhr.responseText))
        }
        else
            callback([])
    };
    xhr.send()
}

// Import algorithms and add them to right menu
get_algorithms_list((alg_list) => {
    alg_list.forEach(algorithm => {
        import(`/algorithms/${algorithm}`)
    });
})

let algorithm_list = []

/**
 * Add new algorithm
 *
 * @param {string} name Name of the Algorithm
 * @param {function} step Function to Be Executed Each Step
 * @param {boolean} heuristics Enable heuristics menu
 */
function add_algorithm(name, init, step, heuristics) {
    if (!algorithm_list[name]) {
        
        algorithm_list[name] = {
            'name': name,
            'init_function': init,
            'step_function': step,
            'heuristics': heuristics
        }

        var newoption = document.createElement('option');
        newoption.text = name;
        algorithms_select.add(newoption);
    }

    else
        alert(`Error adding '${name}': \nDuplicate algorithm name.`)
}

/**
 * Uses the selected algorithm
 *
 */
function activate_algorithm() {
    // Disable buttons
    disable_buttons()
    
    // Pause Algorithm
    algorithm_change(algorithms_select.value)

    // Hide Heuristics Menu
    hideHeuristicsMenu()

    // Show Heuristics Menu if Needed
    if (algorithms_select.value != '' && algorithm_list[algorithms_select.value].heuristics) {
        showHeuristicsMenu()
    } 
    
    // Enables Start Button if Needed
    else if (algorithms_select.value != '') {
        enable_button('start')
    }
}

// Listener for Change in Algorithms Selector
algorithms_select.addEventListener('change', activate_algorithm)