// This file handles the stats

// Stats array
let stats = {
    step_number: 0,
    time_elapsed: 0,
    shortest_path: Infinity,
    longest_path: Infinity,
    ram_usage: 0,
    processor_usage: 0,
    exec_speed: 100,
    status: 'Unknown'
}


/**
 * Update stats in page according to stats array
 *
 */
function updateStats() {
    for (var key in stats) {
        if (key == 'time_elapsed')
            document.getElementById(key).innerText =
                moment.duration(Number(stats[key])).hours() + 'h ' +
                moment.duration(Number(stats[key])).minutes() + 'm ' +
                moment.duration(Number(stats[key])).seconds() + 's '
        else
            document.getElementById(key).innerText = stats[key]
    }
}

// Update when page loads
updateStats()

/**
 * Change some stat value
 *
 * @param {*} stat
 * @param {*} new_value
 */
function changeStat(stat, new_value) {
    stats[stat] = new_value
    updateStats()
}

/**
 * Get some stat value
 *
 * @param {*} stat
 * @returns
 */
function getStat(stat) {
    return stats[stat]
}

/**
 * Increment step 
 *
 */
function incrementStep(node) {
    let last_time_elapsed = stats.time_elapsed

    if (!initial_time)
        initial_time = new Date()

    Problem.update_cities_map(node)
    let new_step = getStat('step_number') + 1
    changeStat('step_number', new_step)
    steps.push(new_step)

    if (initial_time)
        stats.time_elapsed = new Date() - initial_time

    if (new_step > 1 && stats.time_elapsed - last_time_elapsed > 0)  
        stats.processor_usage = Math.ceil(1000 / (stats.time_elapsed - last_time_elapsed))

    else
        stats.processor_usage = null


    stats.ram_usage = border.length

    states['processor'].push(stats.processor_usage)
    states['memory'].push(stats.ram_usage)

    // Each 10 steps
    if (new_step % 10 == 0)
        update_charts()
}


/**
 * Clear all stats
 *
 */
function clearStats() {
    stats = stats = {
        step_number: 0,
        time_elapsed: 0,
        shortest_path: Infinity,
        longest_path: Infinity,
        ram_usage: 0,
        processor_usage: 0,
        exec_speed: 100,
        status: 'Unknown'
    }


    updateStats()
}