import { toggleWall } from './gridSetupUtils';

export const handleMouseDown = (grid, row, col, setGrid, setMouseIsPressed) => {
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
};

export const handleMouseEnter = (grid, row, col, mouseIsPressed, setGrid) => {
    if (!mouseIsPressed) return;
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
};

export const handleMouseUp = (setMouseIsPressed) => {
    setMouseIsPressed(false);
};
