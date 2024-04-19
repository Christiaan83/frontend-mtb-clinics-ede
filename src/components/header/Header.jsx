
import './Header.css';

// eslint-disable-next-line react/prop-types
function Header({  img, title}) {
    return (
        <header className="header-container" style={{backgroundImage: `url(${img})`}}>

            <h1 className= "header-title">{title}</h1>

        </header>
    );
}

export default Header;