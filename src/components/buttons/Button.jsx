import './Buttons.css'

// eslint-disable-next-line react/prop-types
const ButtonDarkGreen = ({ onClick, type, className, text }) => {
    return (
        <button className={className} onClick={onClick} type={type} >
            {text}
        </button>
    );
};

export default ButtonDarkGreen;