import {useState} from "react";
import axios from "axios";

function Register(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, toggleError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, toggleLoading] = useState(false);

    async function handleRegister(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post('http://localhost:8080/users', {
                email: email,
                password: password,
                username: username,
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
            });

        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }


    return (
        <>
            <form onSubmit={handleRegister}>

                <label htmlFor="first-name-field">
                    Voornaam:
                    <input
                        type="text"
                        id="first-name-field"
                        name="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                    />
                </label>

                <label htmlFor="mobile-number-field">
                    Mobiele nummer:
                    <input
                        type="number"
                        id="mobile-number-field"
                        name="mobile-number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </label>

                <label htmlFor="email-field">
                    E-mailadres:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label htmlFor="username">
                    Gebruikersnaam:
                    <input
                        type="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    />
                </label>

                {error &&
                    <p className="error">Dit account bestaat al. Probeer een ander gebruikersnaam of e-mailadres.</p>}
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    Registreren
                </button>

            </form>

        </>
    )
}

export default Register;