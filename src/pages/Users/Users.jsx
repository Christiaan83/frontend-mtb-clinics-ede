import './Users.css'
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext.jsx';
import {Link} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import headerPic from "../../assets/Header1.png";
import getDecodedToken from "../../helpers/getDecodedToken.jsx";
import {formatTime} from "../../helpers/formatTime.jsx";
import Button from "../../components/buttons/Button.jsx";

function Users() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [bookings, setBookings] = useState('');
    const [error, toggleError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {login, logout, isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const decodedToken = getDecodedToken(isAuth)
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    }

    useEffect(() => {
        async function getUserAndBooking() {

            if (decodedToken) {
                try {
                    const userResponse = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, config);
                    setUser(userResponse.data);

                    const bookingResponse = await axios.get(`http://localhost:8080/bookings/user/${decodedToken.sub}`, config);
                    setBookings(bookingResponse.data);

                } catch (err) {
                    console.error(err);
                    toggleError(false);
                }
            }
        }

        getUserAndBooking();
    }, [isAuth]);

    async function handleLogin(e) {
        e.preventDefault();
        toggleError(false);
        setSuccess(false);

        try {
            const response = await axios.post('http://localhost:8080/authenticate', {
                username, password,
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

    return (<>
            <Header img={headerPic} img_title="header-pic" title="Mijn Pagina"/>
            <section className="user-section user-border">
                <div className="content-wrapper">
                    <h3>{isAuth ? 'Uitloggen' : 'Inloggen'}</h3>
                    <p>{isAuth ? 'druk op knop om uit te loggen' : 'Vul hieronder je gegevens in om in te loggen'}</p>


                    {!isAuth ? (<form onSubmit={handleLogin}>
                        <label htmlFor="username">
                            Gebruikersnaam:
                            <input
                                type="text"
                                id="username-field"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onFocus={() => {
                                    toggleError(false);
                                    setSuccess(false);
                                }}
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
                                onFocus={() => {
                                    toggleError(false);
                                    setSuccess(false);
                                }}
                            />
                        </label>
                        {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
                        {success && <p className="success">Succesvol ingelogd!</p>}

                        <Button
                            type="submit"
                            className='button-light'
                            text="Inloggen"
                        />

                        <h5>Heb je nog geen account? Registreer je dan <Link className="link"
                                                                             to="/registreer">hier</Link>. </h5>
                    </form>) : (
                        <Button
                            type="button"
                            onClick={handleLogout}
                            className='button-light'
                            text="Uitloggen"
                        />)}
                </div>
            </section>

            <section className="user-section">
                {isAuth && user &&
                    <div className="content-wrapper">
                        <h4>Uw persoonlijke informatie</h4>
                        <p>Gebruikersnaam: {user.username}</p>
                        <p>Naam: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>
                        <p>Telefoonnummer: 0{user.mobileNumber} </p>
                    </div>
                }
            </section>
            <section  className="booking-blocks-container">
                <div className="booking-blocks">

                    {isAuth && (bookings.length > 0 ? (
                            bookings.map((booking) => (

                                <div className="booking-block" key={booking.id}>
                                    <h3><u>Uw boekingen</u></h3>
                                    <ul>
                                        <li>
                                            <h4>{booking.trainingDto?.name}</h4> {/* Use optional chaining */}
                                            <p>Datum: {new Date(booking.bookingDate).toLocaleDateString('nl-NL')}</p>
                                            <p>Tijd: {formatTime(booking.trainingDto?.startTime)} - {formatTime(booking.trainingDto?.endTime)}</p>
                                            <p>Locatie: <Link className="link"
                                                              to={'http://maps.google.com/maps?q=' + (booking.trainingDto?.location)}>{booking.trainingDto?.location}</Link>
                                            </p>
                                            <p>Beschrijving: {booking.trainingDto?.description}</p>
                                            <p>Prijs:&nbsp;
                                                {/* eslint-disable-next-line no-unsafe-optional-chaining */}
                                                € {(booking.trainingDto?.price).toFixed(2)} {(booking.trainingDto?.trainingInGroup) ? ' per persoon' : ''}</p>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>U heeft nog geen boekingen.</p>
                        )
                    )}
                </div>
            </section>
        </>
    );
}

export default Users;