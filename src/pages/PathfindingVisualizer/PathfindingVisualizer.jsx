import { useCallback, useEffect, useState } from 'react';
import { dijkstra, getNodesInShortestPathOrder } from '../../utils/algorithmsUtils';
import {
    createInitialGrid,
    FINISH_NODE_COL,
    FINISH_NODE_ROW,
    START_NODE_COL,
    START_NODE_ROW,
} from '../../utils/gridSetupUtils';
import { animateDijkstra, clearNodeAnimations, getNodeClassName } from '../../utils/animationUtils';
import { handleMouseDown, handleMouseEnter, handleMouseUp } from '../../utils/gridInteractionsUtils';
import Legend from '../../components/Legend/Legend';
import Controls from '../../components/Controls/Controls';
import Grid from '../../components/Grid/Grid';
import InstructionsModal from '../../components/InstructionsModal/InstructionsModal';
import Button from '../../UI/Button';
import "../../shared/common.css";
import "./PathfindingVisualizer.css";

const PathfindingVisualizer = () => {
    const [grid, setGrid] = useState(createInitialGrid());
    const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
    const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
    
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
    
    const handleGridMouseDown = useCallback((row, col) => {
        handleMouseDown(grid, row, col, setGrid, setMouseIsPressed);
    }, [grid]);
    
    const handleGridMouseEnter = useCallback((row, col) => {
        handleMouseEnter(grid, row, col, mouseIsPressed, setGrid);
    }, [grid, mouseIsPressed]);
    
    const handleGridMouseUp = useCallback(() => {
        handleMouseUp(setMouseIsPressed);
    }, []);
    
    const toggleInstructionsModal = () => {
        setIsInstructionsModalOpen(!isInstructionsModalOpen);
    };
    
    return (
        <div>
            <h1>Dijkstra Pathfinding Visualizer</h1>
            <div className="actions-container">
                <Controls visualizeDijkstra={visualizeDijkstra} clearGrid={clearGrid} isAnimating={isAnimating} />
                <Button variant="button-info" onClick={toggleInstructionsModal}>Instructions</Button>
            </div>
            <Grid
                grid={grid}
                onMouseDown={handleGridMouseDown}
                onMouseEnter={handleGridMouseEnter}
                onMouseUp={handleGridMouseUp}
            />
            <Legend />
            <InstructionsModal isOpen={isInstructionsModalOpen} onClose={toggleInstructionsModal} />
        </div>
    );
};

export default PathfindingVisualizer;
