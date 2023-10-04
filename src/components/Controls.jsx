import "./Controls.css";

const Controls = (props) => {
    const {
        visualizeDijkstra,
        isAnimating,
        clearGrid
    } = props;
    
    return (
        <div className="controls">
            <button onClick={visualizeDijkstra} disabled={isAnimating}>
                Visualize Path
            </button>
            <button onClick={clearGrid} disabled={isAnimating}>
                Clear Grid
            </button>
        </div>
    );
};

export default Controls;
