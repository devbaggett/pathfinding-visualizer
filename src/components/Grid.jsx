import { Node } from './Node';
import { getNodeClassName } from '../utils/animationUtils';
import "./Grid.css";

const Grid = (props) => {
    const {
        grid,
        handleMouseDown,
        handleMouseEnter,
        handleMouseUp
    } = props;
    
    return (
        <div className="grid">
            {grid.map((currentRow, rowIdx) => (
                <div className="row" key={rowIdx}>
                    {currentRow.map((node, nodeIdx) => {
                        const { row, col } = node;
                        const className = getNodeClassName(node);
                        
                        return (
                            <Node
                                key={nodeIdx}
                                id={`node-${row}-${col}`}
                                className={className}
                                onMouseDown={() => handleMouseDown(row, col)}
                                onMouseEnter={() => handleMouseEnter(row, col)}
                                onMouseUp={handleMouseUp}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Grid;
