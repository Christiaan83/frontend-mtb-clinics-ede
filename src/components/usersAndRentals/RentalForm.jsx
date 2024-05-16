import {useEffect, useState} from 'react';
import axios from 'axios';



// eslint-disable-next-line react/prop-types
const RentalForm = ({ createdRentalId }) => {

    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [timeOptions, setTimeOptions] = useState([]);



    useEffect(() => {
        const options = generateTimeOptions();
        setTimeOptions(options);
    }, []);

    const generateTimeOptions = (startHour, endHour, increment) => {
        const options = [];
        for (let h = startHour; h < endHour +1 ; h++) {
            for (let m = 0; m <= 30; m += increment) {
                const formattedTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                options.push(formattedTime);
            }
        }
        return options;
    };

    const handleRental = async (event) => {
        event.preventDefault();
        setError(null);
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

            const response = await axios.post(`http://localhost:8080/rentals`, {
                startDate: selectedDate,
                startTime: selectedStartTime,
                endTime: selectedEndTime,
                rentingWholeDay: isRentingWholeDay,
            });
            const rentalId = response.data.id;
            createdRentalId(rentalId);

            setStartDate('');
            setStartTime('');
            setEndTime('');
            setSuccess(true);


        } catch (err) {
            setError(err.message || 'An error occurred.');
            console.error(err);
        }

    };
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;

        const dateObject = new Date(selectedDate);
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        const dayOfWeek = dateObject.getDay();
        const isValidDay = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
        const isFutureNextYear = dateObject <= oneYearFromNow;

        if (!isFutureNextYear || !isValidDay) {
            setError('Je kunt alleen een datum kiezen in de toekomst op de vrijdag, zaterdag of zondag.');
            return;
        }

        setStartDate(selectedDate);
        setError(null);
    };

        return (
        <form onSubmit={handleRental}>
            {success && <p className="success-message">De MTB is geboekt!</p>}
            <label htmlFor="startDate">Gewenste datum: </label>
            <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleDateChange}
                required
            />
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="startTime">Begintijd: </label>
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
            <button type="submit">Submit Rental</button>
        </form>
    );
};

export default RentalForm;
