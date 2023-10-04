import "./Node.css";

export const Node = (props) => {
    const {
        id,
        className,
        onMouseDown,
        onMouseEnter,
        onMouseUp,
    } = props;
    
    return (
        <div
            id={id}
            className={className}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseUp={onMouseUp}
        ></div>
    );
};

