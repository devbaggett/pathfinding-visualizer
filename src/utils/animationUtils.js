export function animateShortestPath(nodesInShortestPathOrder, onAnimationComplete) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            if (!node.isStart && !node.isFinish) {
                const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
                if (nodeDiv) {
                    nodeDiv.className = 'node node-shortest-path';
                }
            }
        }, 50 * i);
    }
    setTimeout(() => {
        if (typeof onAnimationComplete === 'function') {
            onAnimationComplete();
        }
    }, 50 * nodesInShortestPathOrder.length);
}

export function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, onAnimationComplete) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder, onAnimationComplete);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            if (!node.isStart && !node.isFinish) {
                const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
                if (nodeDiv) {
                    nodeDiv.className = 'node node-visited';
                }
            }
        }, 10 * i);
    }
}

export const getNodeClassName = (node) => {
    let className = "node";
    if (node.isStart) {
        className += ' node-start';
    } else if (node.isFinish) {
        className += ' node-finish';
    } else if (node.isWall) {
        className += ' node-wall';
    }
    return className;
};

export const clearNodeAnimations = (grid, getNodeClassName) => {
    grid.forEach(row => {
        row.forEach(node => {
            const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
            if (nodeDiv) {
                nodeDiv.className = getNodeClassName(node);
            }
        });
    });
};
