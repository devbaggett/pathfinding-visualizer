import { useEffect, useState } from 'react';
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
import Legend from './Legend';
import Controls from './Controls';
import Grid from './Grid';
import Instructions from './Instructions';
import "./PathfindingVisualizer.css";

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState(createInitialGrid());
    const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
    const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    
    useEffect(() => {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
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
            <h1>Dijkstra Pathfinding Visualizer</h1>
            <Instructions />
            <Controls visualizeDijkstra={visualizeDijkstra} clearGrid={clearGrid} isAnimating={isAnimating} />
            <Grid
                grid={grid}
                handleMouseDown={(row, col) => handleMouseDown(grid, row, col, setGrid, setMouseIsPressed)}
                handleMouseEnter={(row, col) => handleMouseEnter(grid, row, col, mouseIsPressed, setGrid)}
                handleMouseUp={() => handleMouseUp(setMouseIsPressed)}
            />
            <Legend />
        </div>
    );
};

export default PathfindingVisualizer;
