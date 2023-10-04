export const START_NODE_ROW = 10;
export const START_NODE_COL = 5;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 45;

export function createNode(col, row) {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: (row === START_NODE_ROW && col === START_NODE_COL) ? 0 : Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    };
}

export function createRow(row) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
    }
    return currentRow;
}

export function createInitialGrid() {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        grid.push(createRow(row));
    }
    return grid;
}

export function toggleWall(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    newGrid[row][col] = {
        ...node,
        isWall: !node.isWall,
    };
    return newGrid;
}
