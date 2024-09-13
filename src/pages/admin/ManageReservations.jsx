import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../custom_hooks/getUserRole.jsx";
import {formatTime} from "../../helpers/formatTime.jsx";
import {Helmet} from "react-helmet";
import Button from "../../components/buttons/Button.jsx";


function ManageReservations() {
    const [rentals, setRentals] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const rentalResponse = await axios.get('http://localhost:8080/rentals', config);
                setRentals(rentalResponse.data);

                const bookingResponse = await axios.get('http://localhost:8080/bookings', config);
                setBookings(bookingResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setRentals([]);
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const deleteRental = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/rentals/${id}`, config);
            const updatedRentals = rentals.filter((rental) => rental.id !== id);
            setRentals(updatedRentals);
        } catch (error) {
            console.error('Error deleting rental:', error);
        }
    };

    const deleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/bookings/${id}`, config);
            const updatedBookings = bookings.filter((booking) => booking.id !== id);
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div>
                <Helmet>
                    <title>MTB Clinics-Ede | Admin</title>
                </Helmet>
            </div>
            <Header img={adminPic} img_title="bike-wheel" title="Admin-reserveringen"/>
            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Reserveringen</h2>
                    <div className="table-container">
                        {isAuth && userRole === "ADMIN" && (rentals.length > 0 || bookings.length > 0) ? (
                            <>
                                {rentals.length > 0 && (
                                    <div>
                                        <h4>MTB-Verhuur</h4>
                                        <table className="admin-table">
                                            <thead>
                                            <tr>
                                                <th>Datum</th>
                                                <th>Tijd</th>
                                                <th>Mountainbike</th>
                                                <th>Prijs</th>
                                                <th>Gebruiker</th>
                                                <th>E-mail</th>
                                                <th>Telefoon</th>
                                                <th>Verwijderen</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {rentals.map((rental) => (
                                                <tr key={rental.id}>
                                                    <td>{new Date(rental.startDate).toLocaleDateString('nl-NL')}</td>
                                                    <td>{formatTime(rental.startTime)} - {formatTime(rental.endTime)}</td>
                                                    <td>{rental.mountainbikeDto?.name || 'N/A'} </td>
                                                    <td>{rental.rentingWholeDay ? rental.mountainbikeDto?.pricePerDayPart : (rental.mountainbikeDto?.pricePerDayPart || 0) - 10}</td>
                                                    <td>{rental.unregisteredUserDto?.firstName || 'N/A'} {rental.unregisteredUserDto?.lastName || 'N/A'}</td>
                                                    <td>{rental.unregisteredUserDto?.email || 'N/A'}</td>
                                                    <td>0{rental.unregisteredUserDto?.mobileNumber || 'N/A'}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => deleteRental(rental.id)}
                                                            className='button-light'
                                                            text="Verwijderen"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {bookings.length > 0 && (
                                    <div>
                                        <br/>
                                        <h4>Clinics Boeking</h4>
                                        <table className="admin-table">
                                            <thead>
                                            <tr>
                                                <th>Datum</th>
                                                <th>Tijd</th>
                                                <th>Clinic</th>
                                                <th>Prijs</th>
                                                <th>Bericht</th>
                                                <th>Gebruiker</th>
                                                <th>E-mail</th>
                                                <th>Telefoon</th>
                                                <th>Verwijderen</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td>{new Date(booking.bookingDate).toLocaleDateString('nl-NL')}</td>
                                                    <td>{formatTime(booking.trainingDto?.startTime || 'N/A')} - {formatTime(booking.trainingDto?.endTime || 'N/A')}</td>
                                                    <td>{booking.trainingDto?.name || 'N/A'}</td>
                                                    <td>€ {(booking.trainingDto?.price || 0).toFixed(2)}</td>
                                                    <td>{booking.message || 'N/A'}</td>
                                                    <td>{booking.userDto?.firstName || 'N/A'} {booking.userDto?.lastName || 'N/A'}</td>
                                                    <td>{booking.userDto?.email || 'N/A'}</td>
                                                    <td>0{booking.userDto?.mobileNumber || 'N/A'}</td>
                                                    <td>
                                                        <Button
                                                            onClick={() => deleteBooking(booking.id)}
                                                            className='button-light'
                                                            text="Verwijderen"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>Geen reserveringen gevonden, probeer het opnieuw!</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ManageReservations;