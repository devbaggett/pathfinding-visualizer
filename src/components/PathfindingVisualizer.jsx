import { useEffect, useState } from 'react';
import { Node } from './Node';
import "./PathfindingVisualizer.css";
import { dijkstra } from '../algorithms/dijkstra';

// Define constants outside the component for easy modification
const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
    const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    const handleMouseDown = (row, col) => {
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
        setMouseIsPressed(true);
    };
    
    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = toggleWall(grid, row, col);
        setGrid(newGrid);
    };
    
    const handleMouseUp = () => {
        setMouseIsPressed(false);
    };
    
    const toggleWall = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };
    
    const clearAllAnimations = () => {
        grid.forEach(row => {
            row.forEach(node => {
                const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
                if (nodeDiv) {
                    nodeDiv.className = 'node';
                    if (node.isStart) {
                        nodeDiv.className += ' node-start';
                    } else if (node.isFinish) {
                        nodeDiv.className += ' node-finish';
                    } else if (node.isWall) {
                        nodeDiv.className += ' node-wall';
                    }
                }
            });
        });
    };
    
    const createNode = (col, row) => {
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
    };
    
    const createRow = (row) => {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        return currentRow;
    };
    
    const createInitialGrid = () => {
        const grid = [];
        for (let row = 0; row < 20; row++) {
            grid.push(createRow(row));
        }
        return grid;
    };
    
    useEffect(() => {
        const initialGrid = createInitialGrid();
        setGrid(initialGrid);
    }, []);
    
    useEffect(() => {
        if (visitedNodesInOrder.length) {
            animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }, [visitedNodesInOrder, nodesInShortestPathOrder]);
    
    // Handle button click for visualizing Dijkstra's Algorithm
    const visualizeDijkstra = () => {
        if (isAnimating) {
            return;
        }
        
        setIsAnimating(true); // Set animation flag
        clearAllAnimations(); // Clear existing animations
        
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        
        setVisitedNodesInOrder(visitedNodesInOrder);
        setNodesInShortestPathOrder(nodesInShortestPathOrder);
    };
    
    const getNodesInShortestPathOrder = (finishNode) => {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return nodesInShortestPathOrder;
    };
    
    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (!node.isStart && !node.isFinish) { // Exclude start and finish nodes
                    const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
                    if (nodeDiv) {
                        nodeDiv.className = 'node node-visited';
                    }
                }
            }, 10 * i);
        }
    };
    
    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (!node.isStart && !node.isFinish) { // Exclude start and finish nodes
                    const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
                    if (nodeDiv) {
                        nodeDiv.className = 'node node-shortest-path';
                    }
                }
            }, 50 * i);
        }
        // Reset the animation state here after the shortest path is done animating
        setTimeout(() => {
            setIsAnimating(false);
        }, 50 * nodesInShortestPathOrder.length);
    };
    
    const clearGrid = () => {
        clearAllAnimations();
        const newGrid = createInitialGrid();
        setGrid(newGrid);
    };
    
    return (
        <div>
            <div className="controls">
                <button onClick={visualizeDijkstra} disabled={isAnimating}>
                    Visualize Dijkstra's Algorithm
                </button>
                <button onClick={clearGrid} disabled={isAnimating}>
                    Clear Grid
                </button>
            </div>
            <div className="grid">
                {grid.map((currentRow, rowIdx) => {
                    return (
                        <div className="row" key={rowIdx}>
                            {currentRow.map((node, nodeIdx) => {
                                const { isStart, isFinish, row, col } = node;
                                
                                let className = "node";
                                if (isStart) {
                                    className += ' node-start';
                                } else if (isFinish) {
                                    className += ' node-finish';
                                } else if (node.isWall) {
                                    className += ' node-wall';
                                }
                                
                                return <Node
                                    key={nodeIdx}
                                    id={`node-${row}-${col}`}
                                    className={className}
                                    onMouseDown={() => handleMouseDown(row, col)}
                                    onMouseEnter={() => handleMouseEnter(row, col)}
                                    onMouseUp={() => handleMouseUp()}
                                />;
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PathfindingVisualizer;
