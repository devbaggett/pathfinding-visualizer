import "./Node.css";

export const Node = (props) => {
    const { id, className } = props;
    return (
        <div id={id} className={className}>
        </div>
    );
};
