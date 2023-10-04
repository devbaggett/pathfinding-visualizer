export const getNodeClassName = (node) => {
    let className = "node";
    if (node.isStart) {
        className += ' node-start';
    } else if (node.isFinish) {
        className += ' node-finish';
    } else if (node.isWall) {
        className += ' node-wall';
    }
    return className;
};
