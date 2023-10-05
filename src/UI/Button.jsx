import './Button.css';

const Button = (props) => {
    const { children, variant, ...otherProps } = props;
    
    return (
        <button className={`base-button ${variant}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;
