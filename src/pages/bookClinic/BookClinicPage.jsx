
import "../mtbClinics/MtbClinics.css"
import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header.jsx";
import clinicHeader from "../../assets/Mountainbike-trainings.png"
import TrainingPicture from "../../components/pictures/TrainingPicture.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import changeDifficultyName from "../../helpers/changeDifficultyName.jsx";
import {formatTime} from "../../helpers/formatTime.jsx";
import HandleDateChange from "../../helpers/handleDateChange.jsx";
import difficultyName from "../../helpers/changeDifficultyName.jsx";
import getDecodedToken from "../../helpers/getDecodedToken.jsx";


function BookClinicPage() {

    const [clinic, setClinic] = useState('');
    const {id} = useParams();
    const {isAuth} = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [, setBookingId] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [message, setMessage] = useState('');
    const [bookingDetails, setBookingDetails] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    const token = localStorage.getItem('token');
    const decodedToken = getDecodedToken(isAuth)

    useEffect(() => {
        setError('');
        async function getClinicAndUserDetails() {

            try {
                const clinicResponse = await axios.get(`http://localhost:8080/trainings/${id}`);
                setClinic(clinicResponse.data);

                const userResponse = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                    headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                    },
                });
                setUser(userResponse.data);

            } catch (err) {
                console.error(err);
                setError('');
            }
        }

        getClinicAndUserDetails();

    }, [id, isAuth]);


    async function handleBooking(event) {
        event.preventDefault();
        setError('');
        setSuccess(false);

        if (!bookingDate) {
            setError("Please select a date.");
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            };

            const bookingResponse = await axios.post(`http://localhost:8080/bookings`,
                {bookingDate, message}, config);

            const bookingId = bookingResponse.data.id;
            console.log(bookingId)
            setBookingId(bookingId);

            setMessage('')
            setBookingDate('')
            setSuccess(true)

            await axios.put(`http://localhost:8080/bookings/${bookingId}/training/${id}/user/${decodedToken.sub}`, {}, config);

            const bookingDetailsResponse = await axios.get(`http://localhost:8080/bookings/${bookingId}`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                },
            });
            const bookingDetails = bookingDetailsResponse.data;
            setBookingDetails(bookingDetails);

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });

        } catch (err) {
            console.error("Error during booking:", err);

            if (err.response && err.response.status === 403) {
                setError("You are not authorized to book this clinic.");
            } else {
                setError("An error occurred during booking. Please try again.");
            }
        }
    }

    return (<>
            <Header img={clinicHeader} img_title="mtb-training" title="MTB-Clinic Boeken"/>
            <main className="outer-content-container">
                <div className="inner-content-container">
                    <div className="booking-welcome">
                        {!isAuth ? (<h4>
                            Om een MTB-Clinic te kunnen boeken moet u ingelogd zijn <br/>
                            <p><Link className="link" to="/mijnpagina">Login of Registreer</Link> om de Clinic te kunnen boeken</p>
                        </h4>) : (<div>
                            {isAuth && user ? (<div>
                                <h3>Beste {user.firstName} {user.lastName}, welkom op de boekingspagina!</h3>
                            </div>) : (<p>Geen gebruiker gevonden</p>)}
                        </div>)}
                    </div>
                    <div className="clinic-booking-info">
                        <h3>Uw gereserveerde MTB-clinic: </h3>
                        <h3> {clinic.name}</h3>
                    </div>
                    {clinic ? (
                        <section className="mtb-info-container">
                        <div className="booking-picture">
                            <TrainingPicture  trainingId={clinic.id}/>
                        </div>
                        <div>
                            <h4>Uw MTB-clinic informatie</h4>
                            <p>Locatie: {clinic.location}</p>
                            <p>Expert niveau: {changeDifficultyName(clinic.difficulty)}</p>
                            <p>Tijd: {formatTime(clinic.startTime)} - {formatTime(clinic.endTime)}</p>
                            <p>Groepstraining: {clinic.trainingInGroup ? 'Ja' : 'Nee'}</p>
                            <p>Prijs: € {clinic.price.toFixed(2)},-  {(clinic.trainingInGroup) ? ' per persoon' : ''}</p>
                        </div>
                    </section>) : (error && <p>er is iets fout gegaan probeer later opnieuw</p>)}

                    {isAuth && user ? (<form className= "booking-border">
                        <br/>
                        <div className="date-message-booking ">
                            <h5>Voor nu is het alleen mogelijk om in het weekend te reserveren. Wij hopen in de
                                toekomst meerdere dagen aan te bieden.</h5>
                        </div>
                        <div className="date-message-booking ">
                            <HandleDateChange onDateChange={setBookingDate}/>
                            <label htmlFor="message">Geef aan met hoeveel personen je wenst komen.
                                <form>
                                <textarea value={message}
                                          onChange={(e) => setMessage(e.target.value)}
                                          placeholder="Typ hier uw antwoord en eventueel andere wensen... "
                                          cols="50"
                                          rows="8"
                                          required>
                                </textarea>


                                </form>
                            </label>

                            <button className="button" onClick={handleBooking}>Boeken</button>
                        </div>
                    </form>) : (<p><Link className="link" to="/mijnpagina">Login of Registreer</Link> om de Clinic te kunnen boeken</p>)}

                    {error && <p className="error-message">Er is iets fout gegaan probeer opnieuw!</p>}
                    {success && <h2 className="success-message">Bedankt voor het boeken!</h2>}

                    <section>
                        {bookingDetails && (
                            <div>
                                <h3 className="booking-title">Hieronder je boeking.</h3>
                                <div className="booking-sub-title">
                                    <p>Tijdens het aanmelden op locatie kan je contant of met de pin betalen.
                                        <Link className="link"
                                              to="https://maps.google.nl/maps?daddr=Akulaan%202,%206717%20XN%20in%20Ede"
                                              target="/"> Hier</Link>(Akulaan 2, Ede) worden de clinics gegeven en kan jij je
                                        aanmelden.</p>
                                </div>
                                <section className="booking-details">
                                    <div>
                                        <h4>Datum en tijd</h4>
                                        <p>Datum: {new Date(bookingDetails.bookingDate).toLocaleDateString('nl-NL')}</p>
                                        <p>Tijd: {formatTime(bookingDetails.trainingDto.startTime)} - {formatTime(bookingDetails.trainingDto.endTime)}</p>
                                    </div>
                                    <div>
                                        <h4>Uw bericht</h4>
                                        <p>{bookingDetails.message}</p>
                                    </div>
                                    <div>
                                        <h4>MTB-Clinic informatie</h4>
                                        <h5>{bookingDetails.trainingDto.name}</h5>
                                        <p>Moeilijkheidsgraad: {difficultyName(bookingDetails.trainingDto.difficulty)}</p>
                                        <p>Prijs: € { (bookingDetails.trainingDto.price).toFixed(2)} {(bookingDetails.trainingDto.trainingInGroup) ? ' per persoon' : ''}</p>
                                    </div>
                                    {isAuth && user ? (
                                        <div>
                                            <h4>Persoonlijke informatie</h4>
                                            <p>Naam: {user.firstName} {user.lastName}</p>
                                            <p>Email: {user.email}</p>
                                            <p>Telefoonnummer: 0{user.mobileNumber} </p>
                                        </div>) : (<p>Geen gebruiker gevonden</p>)}
                                </section>
                            </div>

                        )}
                    </section>
                </div>
            </main>
    </>);
}

export default BookClinicPage;