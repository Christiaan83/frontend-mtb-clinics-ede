import {useState} from "react";
import axios from "axios";
import headerPic from "../../assets/Header1.png";
import Header from "../../components/header/Header.jsx";
import InputMask from "react-input-mask";
import {Navigate, useNavigate} from "react-router-dom";

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, toggleError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        toggleError('');
        toggleLoading(true);
        setSuccess(false);

        try {
            await axios.post('http://localhost:8080/users', {
                email: email,
                password: password,
                username: username,
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/mijnpagina');
            }, 1000);

        } catch (e) {
            console.error(e);
            if (e.response && e.response.status === 409) {
                toggleError("Dit account bestaat al. Probeer een ander gebruikersnaam of e-mailadres.");
            } else {
                toggleError("Er is een fout opgetreden tijdens het registreren.");
            }
        } finally {
            toggleLoading(false);
        }
    }


    return (<>
            <Header img={headerPic} img_title="header-pic" title="Registreren"/>
            <form onSubmit={handleRegister}>
                <label htmlFor="first-name-field">
                    Voornaam:
                    <input
                        type="text"
                        id="first-name-field"
                        name="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="last-name-field">
                    Achternaam:
                    <input
                        type="text"
                        id="last-name-field"
                        name="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="mobile-number-field">Mobiele nummer: </label>
                <InputMask
                    mask="0699999999"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                >
                    {(inputProps) => <input type="tel" id="mobileNumber" {...inputProps} />}
                </InputMask>


                <label htmlFor="email-field">
                    E-mailadres:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="username">
                    Gebruikersnaam:
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="password">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                {error && <p>Dit account bestaat al. Probeer een ander gebruikersnaam of e-mailadres.</p>}
                {success && <p>U bent succesvol geregistreerd!</p>}
                <button
                    type="submit"
                    onClick={handleRegister}
                    disabled={loading}
                >
                    {loading ? 'Registreren...' : 'Registreren'}
                </button>
            </form>

        </>)
}

export default Register;