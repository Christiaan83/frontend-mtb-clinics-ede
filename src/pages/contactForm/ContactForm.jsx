import './ContactForm.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header.jsx";
import headerPic from "../../assets/Header1.png";
import InputMask from "react-input-mask";
import ButtonLightGreen from "../../components/buttons/ButtonLightGreen.jsx";


function ContactForm() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const [error, toggleError] = useState('');
    const navigate = useNavigate();

    async function handleContactForm(e) {
        e.preventDefault();
        toggleError('');
        setSuccess(false);

        try {
            await axios.post('http://localhost:8080/contact-form', {
                email: email,
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                message: message,
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (e) {
            console.error(e);
        }
    }


    return (<>
        <Header img={headerPic} img_title="header-pic" title="Contactformulier"/>
        <section className="input-section contact">
            <div className="contact-wrapper">
                <form onSubmit={handleContactForm}>
                    <h2>Neem contact met ons op</h2>
                    <label htmlFor="first-name-field">
                        Voornaam:
                        <input
                            type="text"
                            id="first-name-field"
                            placeholder="Voornaam"
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
                            placeholder="Achternaam"
                            name="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor="mobile-number-field">Mobiel nummer: </label>
                    <InputMask
                        mask="0699999999"
                        placeholder="0612345678"
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
                            placeholder="mail@email.com"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="message">Bericht:</label>
                    <textarea name="message"
                              id="message"
                              placeholder="Laat hier je bericht achter:"
                              cols="60" rows="10"
                              onChange={(e) => setMessage(e.target.value)}
                              required
                    >
                        </textarea>

                    <div>
                        {error && <p>Er is iets mis gegaan Probeer het later opnieuw</p>}
                        {success && <p>Het bericht is succesvol verzonden</p>}
                        <ButtonLightGreen
                            type="submit"
                            onClick={handleContactForm}
                            text="Laat een bericht achter"
                        />
                    </div>
                </form>
            </div>
        </section>
    </>)
}

export default ContactForm;
