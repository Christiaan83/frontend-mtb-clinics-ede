import { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const RegisterUserForm = ( {createdUserId} ) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    async function handleUserSubmit(event){
        event.preventDefault();
        setError(false);
        setSuccess(false);

        try {
            const response = await axios.post(`http://localhost:8080/unregistered-users`, {
                firstName,
                lastName,
                email,
                mobileNumber,
            });

            const userId = response.data.id;
            createdUserId(userId);

            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setMobileNumber('');


        } catch (err) {
            setError(true);
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleUserSubmit}>
            {error && <p className="error-message">Er is iets fout gegaan probeer opnieuw!</p>}
            {success && <p className="success-message">Uw gegevens zijn succesvol opgeslagen!</p>} {/* Success message */}
            <label htmlFor="firstName">Voornaam:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(event) =>setFirstName(event.target.value)}
                required
            />
            <label htmlFor="lastName">Achternaam:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(event) =>setLastName(event.target.value)}
                required
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) =>setEmail(event.target.value)}
                required
            />
            <label htmlFor="mobileNumber">Mobiele nummer:</label>
            <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(event) =>setMobileNumber(event.target.value)}
                required
            />
            <button type="submit">Registreer</button>
        </form>
    );
};

export default RegisterUserForm;