import {useState} from 'react';

// eslint-disable-next-line react/prop-types
const HandleDateChange = ({onDateChange}) => {

    const [startDate, setStartDate] = useState('');
    const [error, setError] = useState('');


    const handleDateSelection = (e) => {
        setError('');

        const selectedDate = e.target.value;

        const dateObject = new Date(selectedDate);
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        const currentDate = new Date();
        const dayOfWeek = dateObject.getDay();
        const isValidDay = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0;
        const isFutureNextYear = dateObject > currentDate && dateObject <= oneYearFromNow;
        const futureDate = oneYearFromNow.toLocaleDateString('nl-NL');

        if (!isFutureNextYear || !isValidDay) {
            setError(`Kies een datum in de toekomst op vrijdag, zaterdag of zondag, tot ${futureDate}`);
            return;
        }

        setStartDate(selectedDate);
        setError('');
        onDateChange(selectedDate);
    };

    return (<>
            <label htmlFor="startDate">Gewenste datum:&nbsp;
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={handleDateSelection}
                    required
                />
            </label>
            {error && <p className="error-message">{error}</p>}
        </>);
};

export default HandleDateChange;