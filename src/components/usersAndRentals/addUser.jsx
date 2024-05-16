import React, { useState } from 'react';
import axios from 'axios'; // Make sure you have axios installed (npm install axios)

const RegisterUserForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'mobileNumber':
                setMobileNumber(value);
                break;
            default:
                break;
        }
    };

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
            {error && <p className="error-message">Error registering user</p>}
            {success && <p className="success-message">Uw gegevens zijn succesvol opgeslagen!</p>} {/* Success message */}
            <label htmlFor="firstName">Voornaam:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="lastName">Achternaam:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="mobileNumber">Mobiele nummer:</label>
            <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Registreer</button>
        </form>
    );
};

export default RegisterUserForm;