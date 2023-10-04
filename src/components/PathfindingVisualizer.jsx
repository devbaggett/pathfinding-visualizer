import { useEffect, useState } from 'react';
import { Node } from './Node';
import { dijkstra } from '../utils/dijkstra';
import { getNodeClassName } from '../utils/utils';
import {
    createInitialGrid,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
    START_NODE_COL,
    START_NODE_ROW,
    toggleWall,
} from '../utils/gridUtils';
import "./PathfindingVisualizer.css";

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
    
    const clearAllAnimations = () => {
        grid.forEach(row => {
            row.forEach(node => {
                const nodeDiv = document.getElementById(`node-${node.row}-${node.col}`);
                if (nodeDiv) {
                    nodeDiv.className = getNodeClassName(node);
                }
            });
        });
    };
    
    useEffect(() => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
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
            <h1>
                Dijkstra Pathfinding Visualizer
            </h1>
            <div className="instructions">
                <span>1. Click or drag on nodes to make walls.</span>
                <span>2. Click on walls to remove them.</span>
                <span>3. Use 'Visualize Path' to see the shortest path.</span>
                <span>4. 'Clear Grid' resets everything.</span>
            </div>
            <div className="controls">
                <button onClick={visualizeDijkstra} disabled={isAnimating}>
                    Visualize Path
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
                                const { row, col } = node;
                                const className = getNodeClassName(node);
                                
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
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-color node-start"></div>
                    Start
                </div>
                <div className="legend-item">
                    <div className="legend-color node-finish"></div>
                    Finish
                </div>
                <div className="legend-item">
                    <div className="legend-color node-wall"></div>
                    Wall
                </div>
                <div className="legend-item">
                    <div className="legend-color node-shortest-path"></div>
                    Shortest Path
                </div>
                <div className="legend-item">
                    <div className="legend-color node-visited"></div>
                    Visited
                </div>
                <div className="legend-item">
                    <div className="legend-color node-unvisited"></div>
                    Unvisited
                </div>
            </div>
        </div>
    );
};

export default PathfindingVisualizer;
