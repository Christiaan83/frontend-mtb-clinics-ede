import './Buttons.css'

// eslint-disable-next-line react/prop-types
const ButtonDarkGreen = ({ onClick, type, text }) => {
    return (
        <button className='button-dark' onClick={onClick} type={type} >
            {text}
        </button>
    );
};

export default ButtonDarkGreen;