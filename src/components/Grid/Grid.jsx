import { Node } from '../Node/Node';
import { getNodeClassName } from '../../utils/animationUtils';
import "./Grid.css";

const Grid = (props) => {
    const {
        grid,
        onMouseDown,
        onMouseEnter,
        onMouseUp
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
                                onMouseDown={() => onMouseDown(row, col)}
                                onMouseEnter={() => onMouseEnter(row, col)}
                                onMouseUp={onMouseUp}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Grid;
