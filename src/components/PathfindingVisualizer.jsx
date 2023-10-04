import { useEffect, useState } from 'react';
import { Node } from './Node';
import { dijkstra, getNodesInShortestPathOrder } from '../utils/algorithmsUtils';
import {
    createInitialGrid,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
    START_NODE_COL,
    START_NODE_ROW,
} from '../utils/gridSetupUtils';
import { animateDijkstra, clearNodeAnimations, getNodeClassName } from '../utils/animationUtils';
import { handleMouseDown, handleMouseEnter, handleMouseUp } from '../utils/gridInteractionsUtils';
import "./PathfindingVisualizer.css";

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
    const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
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
    
    const visualizeDijkstra = () => {
        if (isAnimating) {
            return;
        }
        
        setIsAnimating(true);
        clearNodeAnimations(grid, getNodeClassName);
        
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        
        setVisitedNodesInOrder(visitedNodesInOrder);
        setNodesInShortestPathOrder(nodesInShortestPathOrder);
        
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, () => {
            setIsAnimating(false);
        });
    };
    
    const clearGrid = () => {
        clearNodeAnimations(grid, getNodeClassName);
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
                                
                                return (
                                    <Node
                                        key={nodeIdx}
                                        id={`node-${row}-${col}`}
                                        className={className}
                                        onMouseDown={() => handleMouseDown(grid, row, col, setGrid, setMouseIsPressed)}
                                        onMouseEnter={() => handleMouseEnter(grid, row, col, mouseIsPressed, setGrid)}
                                        onMouseUp={() => handleMouseUp(setMouseIsPressed)}
                                    />
                                );
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
