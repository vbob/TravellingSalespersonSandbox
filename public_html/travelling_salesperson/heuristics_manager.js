// This file handles the heuristics

// Heurisitics selector in form
let heuristics_select = document.getElementById('heuristics_accordion')

/**
 * Show the heuristics menu
 *
 */
function showHeuristicsMenu() {
    heuristics_accordion.classList.remove('d-none')
}

/**
 * Hides the heuristics menu
 *
 */
function hideHeuristicsMenu() {
    heuristics_accordion.classList.add('d-none')
}

// Heuristics Menu Start Hidden
hideHeuristicsMenu()