// This file have the Travelling Salesperson Problem Definition
// It follows the problem solving modeling described on Artifficial Intelligence: A Modern Aproach

class TravellingSalesperson {

    /**
     *Creates an instance of Travelling_Salesperson.

     * @param {number} initial_state
     * @memberof Travelling_Salesperson
     */
    constructor() {
        this.initial_state = cities_array[0]
    }

    static getInitialState() {
        return cities_array[0]
    }

    /**
     * Check if goal state was reached
     *
     * @param {SandboxNode} node
     * @memberof Travelling_Salesperson
     */
    static goal_test(node) {
        let seq = this.solution(node)

        let is_sol = true;

        cities_array.forEach((element) => {
            if (!seq.includes(element)) is_sol = false
        })

        if (seq[seq.length - 1] != this.getInitialState()) is_sol = false

        // Check if every city was visited and if the last state is the initial state
        return is_sol
    }

    /**
     *  Returns the path executed util a given node
     *
     * @param {SandboxNode} node
     * @returns 
     * @memberof Travelling_Salesperson
     */
    static solution(node) {
        let seq = []

        while (node.parent != null) {
            seq.unshift(node.action)
            node = node.parent
        }

        seq.push(this.getInitialState())

        return seq
    }

    /**
     * Returns the cost of realizing an action
     *
     * @param {City} state
     * @param {City} action
     * @returns
     * @memberof TravellingSalesperson
     */
    static step_cost(state, action) {
        return calculate_distance(state.x, action.x, state.y, action.y)
    }

    /**
     * Returns the result if realized some action
     *
     * @static
     * @param {*} state
     * @param {*} action
     * @returns
     * @memberof TravellingSalesperson
     */
    static result(state, action) {
        return action
    }

    static actions(node) {
        let possible_actions = []
        let seq = this.solution(node)

        cities_array.forEach(city => {
            if (node.state != city && !seq.includes(city))
                possible_actions.push(city)
        })

        return possible_actions
    }

    static update_cities_map(node) {

        deleteConnections()

        let seq_cities = this.solution(node)

        if (this.goal_test(node))
            seq_cities.unshift(this.getInitialState())

        seq_cities.forEach((city, index) => {
            if (index < seq_cities.length - 1) {
                connectCities(seq_cities[index], seq_cities[index + 1])
            }
        })
    }

}

// Define this as the problem
define_problem(TravellingSalesperson)

/**
 * Calculate the distance between two points
 *
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @returns
 */
function calculate_distance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}
