import "./Legend.css";

const Legend = () => {
    return (
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
    );
};

export default Legend;
