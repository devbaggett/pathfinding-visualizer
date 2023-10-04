import "./Instructions.css";

const Instructions = () => {
    return (
        <div className="instructions">
            <span>1. Click or drag on nodes to make walls.</span>
            <span>2. Click on walls to remove them.</span>
            <span>3. Use 'Visualize Path' to see the shortest path.</span>
            <span>4. 'Clear Grid' resets everything.</span>
        </div>
    );
};

export default Instructions;
