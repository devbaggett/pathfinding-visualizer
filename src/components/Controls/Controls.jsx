import Button from '../../UI/Button';
import "./Controls.css";

const Controls = (props) => {
    const {
        visualizeDijkstra,
        isAnimating,
        clearGrid
    } = props;
    
    return (
        <div className="controls">
            <Button variant="button-primary control-button" onClick={visualizeDijkstra} disabled={isAnimating}>
                Visualize Path
            </Button>
            <Button variant="button-primary control-button" onClick={clearGrid} disabled={isAnimating}>
                Clear Grid
            </Button>
        </div>
    );
};

export default Controls;
