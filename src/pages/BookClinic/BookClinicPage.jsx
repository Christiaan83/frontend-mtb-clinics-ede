import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Header from "../../components/header/Header.jsx";
import clinicHeader from "../../assets/Mountainbike-trainings.png"
import TrainingPicture from "../../components/pictures/TrainingPicture.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import changeDifficultyName from "../../helpers/changeDifficultyName.jsx";
import {formatTime} from "../../helpers/formatTime.jsx";

function BookClinicPage() {

    const [clinic, setClinic] = useState(null);
    const {id} = useParams();
    const {username} = useParams();
    const [, setUserId] = useState('');
    const [, setBookingId] = useState(null);
    const [date, setDate] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        setError(null);

        async function getClinicDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/trainings/${id}`);
                console.log(response.data);
                setClinic(response.data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
        }

        getClinicDetails();
    }, [id]);

    async function handleBooking(event) {
        event.preventDefault();
        setError(false);
        setSuccess(false);

        try {
            const response = await axios.post(`http://localhost:8080/bookings`, {
                bookingDate: date,

            });
            const bookingId = response.data.id;
            setBookingId(bookingId);

            setDate('')
            setSuccess(true)

            await axios.put(`http://localhost:8080/bookings/${bookingId}/training/${id}/user/${username}`);

            const bookingDetailsResponse = await axios.get(`http://localhost:8080/bookings/${bookingId}`);

            const bookingDetails = bookingDetailsResponse.data;
            setBookingDetails(bookingDetails);

        } catch (err) {
            console.error(err);
            setError(true);
        }
    }
    const { isAuth } = useContext(AuthContext);
        return (
            <>
                <Header img={clinicHeader} img_title="mtb-training" title="MTB-Clinic Boeken"/>
                <main>

                    <div>
                        {!isAuth ? <h3>Om een MTB-Clinic te kunnen boeken moet u ingelogd zijn <br/>
                            <p><Link to="/inloggen">Login of Registreer</Link> om de Clinic te kunnen boeken </p>
                        </h3> : <p>Hello</p>
                        }
                        {clinic ? (<div>
                            <h2>{clinic.name}</h2>
                            <h4>Uw gereserveerde clinic</h4>

                            <section>
                                <div>
                                    <TrainingPicture trainingId={clinic.id}/>
                                </div>
                                <div>
                                    <p>Locatie: {clinic.location}</p>
                                    <p>Expert niveau: {changeDifficultyName(clinic.difficulty)}</p>
                                    <p>Tijd: {formatTime(clinic.startTime)} - {formatTime(clinic.endTime)}</p>
                                    <p>Groepstraining: {clinic.trainingInGroup ? 'Ja' : 'Nee'}</p>
                                    <p>Prijs : € {clinic.price},-</p>
                                </div>
                            </section>



                        </div>) : (<p>{error}</p>)}
                    </div>
                </main>

            </>
        )
}

export default BookClinicPage;