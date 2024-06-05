import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header.jsx";
import clinicHeader from "../../assets/Mountainbike-trainings.png"
import TrainingPicture from "../../components/pictures/TrainingPicture.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import changeDifficultyName from "../../helpers/changeDifficultyName.jsx";
import {formatTime} from "../../helpers/formatTime.jsx";
import {jwtDecode} from "jwt-decode";
import HandleDateChange from "../../helpers/handleDateChange.jsx";


function BookClinicPage() {

    const [clinic, setClinic] = useState('');
    const {id} = useParams();
    const {isAuth} = useContext(AuthContext);
    const [user, setUser] = useState('');
    const [, setBookingId] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [, setBookingDetails] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);


    const token = localStorage.getItem('token');
    let decodedToken = null;

    if (isAuth && token && token.split('.').length === 3) {
        try {
            decodedToken = jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('token');
        }
    }


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

            const bookingResponse = await axios.post(`http://localhost:8080/bookings`, {bookingDate}, config);

            const bookingId = bookingResponse.data.id;
            console.log(bookingId)
            setBookingId(bookingId);

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
            <main>
                <div>
                    {!isAuth ? (<h4>
                            Om een MTB-Clinic te kunnen boeken moet u ingelogd zijn <br/>
                            <p><Link to="/mijnpagina">Login of Registreer</Link> om de Clinic te kunnen boeken</p>
                        </h4>) : (<div>
                            {isAuth && user ? (<div>
                                    <h4>Beste {user.firstName} {user.lastName}, welkom op de boekingspagina!</h4>
                                </div>) : (<p>Geen gebruiker gevonden</p>)}
                        </div>)}
                    {clinic ? (<section>
                            <h2>{clinic.name}</h2>
                            <h4>Uw gereserveerde clinic</h4>
                            <div>
                                <TrainingPicture trainingId={clinic.id}/>
                            </div>
                            <div>
                                <p>Locatie: {clinic.location}</p>
                                <p>Expert niveau: {changeDifficultyName(clinic.difficulty)}</p>
                                <p>Tijd: {formatTime(clinic.startTime)} - {formatTime(clinic.endTime)}</p>
                                <p>Groepstraining: {clinic.trainingInGroup ? 'Ja' : 'Nee'}</p>
                                <p>Prijs: €{clinic.price.toFixed(2)},-</p>
                            </div>
                        </section>) : (error && <p>er is iets fout gegaan probeer later opnieuw</p>)}
                </div>
                {isAuth && user ? (<form>
                        <br/>
                        <div>
                            <h5>Voor nu is het alleen mogelijk om in het weekend te reserveren. Wij hopen in de
                                toekomst meerdere dagen aan te bieden.</h5>
                        </div>
                        <div className="date-time">
                            <HandleDateChange onDateChange={setBookingDate}/>
                            <button className="button" onClick={handleBooking}>Boeken</button>
                        </div>
                    </form>) : (<p><Link to="/mijnpagina">Login of Registreer</Link> om de Clinic te kunnen boeken</p>)}

                {error && <p className="error-message">Er is iets fout gegaan probeer opnieuw!</p>}
                {success && <h2 className="success-message">Bedankt voor het boeken!</h2>}
            </main>
        </>);
}

export default BookClinicPage;