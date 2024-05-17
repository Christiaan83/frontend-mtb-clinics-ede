import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import mtbRental from "../../assets/verhuur2.jpg";
import Header from "../../components/header/Header.jsx";
import frameSizeDutch from "../../helpers/mountianbikes/frameSizeDutch.jsx";
import adultOrChild from "../../helpers/mountianbikes/adultOrChild.jsx";
import MtbPicture from "../../components/pictures/MtbPicture.jsx";
import HandleDateChange from "../../components/handleDateChange.jsx";
import {generateTimeOptions} from "../../helpers/timeOptions.jsx";


function BookRentalPage() {

    const [mountainbike, setMountainbike] = useState(null);
    const {id} = useParams();
    const [rentalId, setRentalId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [rentalDetails, setRentalDetails] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setError(null);

        async function getMtbDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/mountainbikes/${id}`);
                console.log(response.data);
                setMountainbike(response.data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
        }

        getMtbDetails();
    }, [id]);

    async function handleRentalAndUserCreation(event) {
        event.preventDefault();
        setError(false);
        setSuccess(false);
        try {
            const userResponse = await axios.post(`http://localhost:8080/unregistered-users`, {
                firstName, lastName, email, mobileNumber,
            });
            const userId = userResponse.data.id;
            setUserId(userId);

            const selectedDate = startDate;
            const selectedStartTime = startTime;
            const selectedEndTime = endTime;

            const startDateTime = new Date(selectedDate);
            startDateTime.setHours(selectedStartTime.split(':')[0], selectedStartTime.split(':')[1], 0);

            const endDateTime = new Date(startDateTime);
            if (endTime) {
                endDateTime.setHours(selectedEndTime.split(':')[0], selectedEndTime.split(':')[1], 0);
            }

            const rentalDuration = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);
            const isRentingWholeDay = rentalDuration > 4;

            const rentalResponse = await axios.post(`http://localhost:8080/rentals`, {
                startDate: selectedDate,
                startTime: selectedStartTime,
                endTime: selectedEndTime,
                rentingWholeDay: isRentingWholeDay,
            });
            const rentalId = rentalResponse.data.id;
            setRentalId(rentalId);

            setFirstName('');
            setLastName('');
            setEmail('');
            setMobileNumber('');
            setStartDate('');
            setStartTime('');
            setEndTime('');
            setSuccess(true);

            await axios.put(`http://localhost:8080/rentals/${rentalId}/mountainbike/${id}/user/${userId}`);

            const rentalDetailResponse = await axios.get(`http://localhost:8080/rentals/${rentalId}`);
            console.log(rentalDetailResponse.data)
            const rentalDetails = rentalDetailResponse.data;
            setRentalDetails(rentalDetails);

        } catch (err) {
            console.error(err);
            setError(true);
        }
    }

    return (<>
            <Header img={mtbRental} img_title="bike-wheel" title="MTB-Verhuur"/>
            <main className="outer-content-container">
                <div className="inner-content-container">
                    {mountainbike ? (<div>
                            <section>
                                <h2>{mountainbike.name}</h2>
                                <MtbPicture mountainbike={mountainbike}/>
                                <p>Wielgrootte: {mountainbike.wheelSize}</p>
                                <p>Frame maat: {frameSizeDutch(mountainbike.frameSize)}</p>
                                <p>Versnellingen: {mountainbike.gears}</p>
                                <p>Prijs per dag: € {mountainbike.pricePerDayPart},-</p>
                                <p>Type: {adultOrChild(mountainbike.forAdult)}</p>
                            </section>
                        </div>) : (<p>{error}</p>)}
                    <section>
                        <form>
                            <label htmlFor="firstName">Voornaam:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            />
                            <label htmlFor="lastName">Achternaam:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            <label htmlFor="mobileNumber">Mobiele nummer:</label>
                            <input
                                type="tel"
                                id="mobileNumber"
                                name="mobileNumber"
                                value={mobileNumber}
                                onChange={(event) => setMobileNumber(event.target.value)}
                                required
                            />
                        </form>
                        <form>
                            <HandleDateChange onDateChange={setStartDate}/>
                            <label htmlFor="startTime">Ophalen: </label>
                            <select id="startTime"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required>
                                <option value="" disabled>Gewenste tijd</option>
                                {generateTimeOptions(8, 18, 30).map((time) => (<option key={time} value={time}>
                                        {time}
                                    </option>))}
                                <option value="19:00">19:00</option>
                            </select>
                            <label htmlFor="endTime">Terug brengen: </label>
                            <select id="endTime"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required>
                                <option value="" disabled>Gewenste tijd</option>
                                {generateTimeOptions(9, 19, 30).map((time) => (<option key={time} value={time}>
                                        {time}
                                    </option>))}
                                <option value="20:00">20:00</option>
                            </select>
                        </form>
                        <div>
                            <button onClick={handleRentalAndUserCreation}>Boeken</button>
                        </div>
                        {error && <p className="error-message">Er is iets fout gegaan probeer opnieuw!</p>}
                        {success && <p className="success-message">Geboekt!</p>}
                    </section>
                    {rentalDetails && (<section>
                            <h2>Bedankt voor het boeken!</h2>
                            <h3>Hieronder vind je de geboekte informatie.</h3>
                            <div>
                                <h4>Datum en tijd</h4>
                                <p>Datum: {rentalDetails.startDate}</p>
                                <p>Tijd: {rentalDetails.startTime.slice(0, 5)} - {rentalDetails.endTime.slice(0, 5)}</p>
                            </div>
                            <div>
                                <h4>Mountainbike gehuurd</h4>
                                <p>Soort mountainbike: {rentalDetails.mountainbikeDto.name}</p>
                                <p>Frame grootte: {frameSizeDutch(rentalDetails.mountainbikeDto.frameSize)}</p>
                                <p>Volledig geveerd: {rentalDetails.mountainbikeDto.fullSuspension ? 'Ja' : 'Nee'} </p>
                                <p>Versnellingen: {rentalDetails.mountainbikeDto.gears}</p>
                                <p> Prijs: € {" "}
                                    {rentalDetails.rentingWholeDay
                                        ? rentalDetails.mountainbikeDto.pricePerDayPart
                                        : rentalDetails.mountainbikeDto.pricePerDayPart - 10},-</p>
                            </div>
                            <div>
                                <h4>Persoonlijke informatie</h4>
                                <p>Naam: {rentalDetails.unregisteredUserDto.firstName} {rentalDetails.unregisteredUserDto.lastName}</p>
                                <p>Email: {rentalDetails.unregisteredUserDto.email}</p>
                                <p>Telefoonnummer: {rentalDetails.unregisteredUserDto.mobileNumber} </p>
                            </div>
                        </section>

                    )}
                </div>
            </main>
        </>)
}

export default BookRentalPage;