import './Buttons.css'

// eslint-disable-next-line react/prop-types
const ButtonLightGreen = ({ onClick, type, text  }) => {
    return (
        <button className='button-light' onClick={onClick} type={type} >
            {text}
        </button>
    );
};

export default ButtonLightGreen;