class SNode {
    constructor(state, parent, pathCost) {
        this.state = state
        this.parent = parent
        this.pathCost = pathCost
    }

    createChildNode(state, cost) {
        return new SNode(state, this, this.pathCost + cost)
    }

    getDistanceToOrigin() {
        return this.pathCost
    }
}

export {
    SNode
}