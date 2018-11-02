class SNode {
    constructor(state, parent, pathCost, heuristics) {
        this.state = state
        this.parent = parent
        this.pathCost = pathCost
        this.heuristics = heuristics
    }

    createChildNode(state, cost, heuristics) {
        return new SNode(state, this, this.pathCost + cost, heuristics)
    }
}

export {
    SNode
}