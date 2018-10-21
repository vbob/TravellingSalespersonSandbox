// This file handles nodes

/**
 * Class for Node Representation
 *
 * @class SandboxNode
 */
class SandboxNode {
    constructor(state, parent, action, path_cost) {
        this.state = state
        this.parent = parent
        this.action = action
        this.path_cost = path_cost
    }
}

/**
 * Returns a child-node from a parent node
 *
 * @param {*} problem
 * @param {*} parent
 * @param {*} action
 * @returns
 */
function create_child_node(problem, parent, action) {
    let state = problem.result(parent.state, action)
    let path_cost = parent.path_cost + problem.step_cost(parent.state, action)
    let child = new SandboxNode(state, parent, action, path_cost)

    return child
}

// List of to-be-explored nodes
let border = []