name = 'Depht-First Search (DFS)'

function dfs_init() {
    border.push(new SandboxNode(current_run.initial_state, null, null, 0))
}

function dfs_step() {
    if (border.length == 0)
        algorithm_end('Failed: Border is Empty')

    else {
        let node = border.shift()

        Problem.actions(node).forEach(action => {
            border.unshift(create_child_node(Problem, node, action))
        });

        // On the end of each iteration, remember to update step!
        incrementStep(node)

        if (Problem.goal_test(node))
            algorithm_end('Success')
    }
}


add_algorithm(name, dfs_init, dfs_step, false)