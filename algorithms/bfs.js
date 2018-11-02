class BFS {
    constructor() {
        this.border = new Array()
        this.border.push(new new SNode(current_run.initial_state, null, null, 0))
    }
}

name = 'Breadth-First Search (BFS)'

function bfs_init() {
    border.push(new SandboxNode(current_run.initial_state, null, null, 0))
}

function bfs_step() {
    if (border.length == 0)
        algorithm_end('Failed: Border is Empty')

    else {
        let node = border.shift()

        Problem.actions(node).forEach(action => {
            border.push(create_child_node(Problem, node, action))
        });

        // On the end of each iteration, remember to update step!
        incrementStep(node)

        if (Problem.goal_test(node))
            algorithm_end('Success')
    }
}


add_algorithm(name, bfs_init, bfs_step, false)