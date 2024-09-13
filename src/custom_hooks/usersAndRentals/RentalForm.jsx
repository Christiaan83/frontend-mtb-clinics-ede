import {useState} from 'react';
import axios from 'axios';
import HandleDateChange from "../handleDateChange.jsx";
import {generateTimeOptions} from "../../helpers/timeOptions.jsx";


const RentalForm = ( ) => {

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);



    const handleRental = async (event) => {
        event.preventDefault();
        setError(false);
        setSuccess(false);

        try {
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

             await axios.post(`http://localhost:8080/rentals`, {
                startDate: selectedDate,
                startTime: selectedStartTime,
                endTime: selectedEndTime,
                rentingWholeDay: isRentingWholeDay,
            });

            setStartDate('');
            setStartTime('');
            setEndTime('');
            setSuccess(true);


        } catch (err) {
            setError(err.message || 'An error occurred.');
            console.error(err);
        }

    };

        return (
            <>
        <form onSubmit={handleRental}>
            {error && <p className="error-message">Er is iets fout gegaan probeer opnieuw!</p>}
            {success && <p className="success-message">Datum en tijd is toegevoegd</p>}

            <HandleDateChange onDateChange={setStartDate} />
            <select id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required>
                <option value="" disabled>Gewenste tijd</option>
                {generateTimeOptions(8, 18, 30).map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>

                ))}
                <option value="19:00">19:00</option>
            </select>
            <label htmlFor="endTime">Terug brengen: </label>
            <select id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required>
                <option value="" disabled>Gewenste tijd</option>
                {generateTimeOptions(9, 19, 30).map((time) => (
                    <option key={time} value={time}>
                        {time}
                    </option>
                ))}
                <option value="20:00">20:00</option>
            </select>
            <button type="submit">Toevoegen</button>
        </form>
            </>
        );

};

export default RentalForm;
