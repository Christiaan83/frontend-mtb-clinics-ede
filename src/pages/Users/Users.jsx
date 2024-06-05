import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx';
import {Link} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import headerPic from "../../assets/Header1.png";

function Users() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { login, logout, isAuth } = useContext(AuthContext);

    async function handleLogin(e) {
        e.preventDefault();
        toggleError(false);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username,
                password,
            });

            if (response.status === 200) {
                let token = response.data.jwt;

                if (!token) {
                    const authHeader = response.headers['authorization'];
                    if (authHeader) {
                        token = authHeader.split(' ')[1];
                    }
                }
                login(token);
                if (token) {
                    setSuccess(true);
                } else {
                    console.error('Token is undefined in the response:', response.data);
                    login('');
                    toggleError(true);
                }
            }
        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    function handleLogout() {
        logout();
        setSuccess(false);
    }

    return (
        <>
            <Header img={headerPic} img_title="header-pic" title="Mijn Pagina"/>
        <div>
            <h1>{isAuth ? 'Uitloggen' : 'Inloggen'}</h1>
            <p>{isAuth ? 'druk op knop om uit te loggen': 'Vul hieronder je gegevens in om in te loggen' }</p>

        </div>
            {!isAuth ? (
                <form onSubmit={handleLogin}>
                    <label htmlFor="username">
                        Gebruikersnaam:
                        <input
                            type="text"
                            id="username-field"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => { toggleError(false); setSuccess(false); }}
                        />
                    </label>

                    <label htmlFor="password-field">
                        Wachtwoord:
                        <input
                            type="password"
                            id="password-field"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => { toggleError(false); setSuccess(false); }}
                        />
                    </label>
                    {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
                    {success && <p className="success">Succesvol ingelogd!</p>}

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Inloggen
                    </button>
                </form>
            ) : (
                <button
                    type="button"
                    className="form-button"
                    onClick={handleLogout}
                >
                    Uitloggen
                </button>
            )}

            <h5>Heb je nog geen account? Registreer je dan <Link to="/registreer">hier</Link>. </h5>
        </>
    );
}

export default Users;