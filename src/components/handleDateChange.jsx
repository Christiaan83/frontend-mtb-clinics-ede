import {useState} from 'react';

// eslint-disable-next-line react/prop-types
const HandleDateChange = ({onDateChange}) => {

    const [startDate, setStartDate] = useState(null);
    const [error, setError] = useState(false);


    const handleDateSelection = (e) => {
        setError(false);

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
        onDateChange(selectedDate);
    };

    return (
        <div>
            <label htmlFor="startDate">Gewenste datum: </label>
            <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleDateSelection}
                required
            />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default HandleDateChange;