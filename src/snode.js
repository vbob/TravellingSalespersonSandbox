class SNode {
    constructor(state, parent, pathCost) {
        this.state = state
        this.parent = parent
        this.pathCost = pathCost
    }

    createChildNode(state, cost) {
        return new SNode(state, this, cost)
    }

    getDistanceToOrigin() {
        let distance = this.pathCost
        let node = this

        while (node.parent) {
            distance += node.parent.pathCost
            node = node.parent
        }

        return distance
    }
}

export {
    SNode
}