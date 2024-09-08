import Header from "../../../components/header/Header.jsx";
import adminPic from "../../../assets/AdminPic.webp";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import getUserRole from "../../../custom_hooks/getUserRole.jsx";
import {useNavigate, useParams} from "react-router-dom";
import MtbPicture from "../../../components/pictures/MtbPicture.jsx";
import ButtonLightGreen from "../../../components/buttons/ButtonLightGreen.jsx";


function UpdateMtb() {
    const {id} = useParams();
    const [mountainbike, setMountainbike] = useState({});
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState('');
    const [error, setError] = useState('');

    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchMountainBike = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/mountainbikes/${id}`);
                setMountainbike(response.data);
                setAmount(response.data.amount);
                setPrice(response.data.pricePerDayPart);
                setAvailable(response.data.available ? 'true' : 'false');

            } catch (error) {
                console.error('Error fetching mountainbike:', error);
            }
        };
        fetchMountainBike();
    }, [id]);

    const updateMountainbike = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/mountainbikes/${id}`, {
                amount: amount,
                pricePerDayPart: price,
                available: available,
            }, config);
            console.log('Mountain bike updated successfully');
            navigate('/admin/mountainbikes');
        } catch (error) {
            console.error('Error updating mountain bike:', error);
            setError(error.response?.data?.message || "An error occurred during update");
        }
    };

    return (
        <>
            <Header img={adminPic} img_title="bike-wheel" title="Update-Mountainbike"/>
            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Mountainbike aanpassen</h2>
                    <div className="table-container">
                        {isAuth && mountainbike ? (
                            <>
                                <table className="admin-table">
                                    <thead>
                                    <tr>
                                        <th>Afbeelding</th>
                                        <th>Naam</th>
                                        <th>Wiel grootte</th>
                                        <th>Framemaat</th>
                                        <th>Versnellingen</th>
                                        <th>Type</th>
                                        <th>Vering</th>
                                        <th>Beschikbaar</th>
                                        <th>Prijs</th>
                                        <th>Voorraad</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr key={mountainbike.id}>
                                        <td>
                                            <div className="table-image">
                                            <MtbPicture mountainbike={mountainbike}/>
                                            </div>
                                        </td>
                                        <td>{mountainbike.name}</td>
                                        <td>{mountainbike.wheelSize}</td>
                                        <td>{mountainbike.frameSize}</td>
                                        <td>{mountainbike.gears}</td>
                                        <td>{mountainbike.forAdult ? 'Volwassenen' : 'Kind'}</td>
                                        <td>{mountainbike.fullSuspension === null ? 'geen' : (mountainbike.fullSuspension ? 'Volledig' : 'Voor')}</td>
                                        <td>{mountainbike.available ? 'Ja' : 'Nee'}</td>
                                        <td>€ {mountainbike.pricePerDayPart},-</td>
                                        <td>{mountainbike.amount}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <section className="admin-container">
                                    {isAuth && userRole === 'ADMIN' && (
                                        <form onSubmit={updateMountainbike} className="admin-form">
                                            <h4>Vul onderstaande velden in </h4>
                                            <div>
                                                <label htmlFor="amount">Aantal:</label>
                                                <input type="number" id="amount" value={amount}
                                                       onChange={(e) => setAmount(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="price">Prijs</label>
                                                <input type="number" id="price" value={price}
                                                       onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className="radio-group">
                                                <div>
                                                    <p><u>Beschikbaar?</u></p>
                                                    <label htmlFor="available">Ja</label>
                                                    <input
                                                        type="radio"
                                                        id="availableTrue"
                                                        name="available"
                                                        value="true"
                                                        checked={available === 'true'}
                                                        onChange={(e) => setAvailable(e.target.value)}
                                                    />
                                                    <label htmlFor="available">Nee</label>
                                                    <input
                                                        type="radio"
                                                        id="availableFalse"
                                                        name="available"
                                                        value="false"
                                                        checked={available === 'false'}
                                                        onChange={(e) => setAvailable(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <ButtonLightGreen
                                                type="submit"
                                                text="Mountainbike Aanpassen"
                                            />
                                            {error && <p className="error-message">{error}</p>}
                                        </form>
                                    )}
                                </section>
                            </>
                        ) : (
                            <p>Mountainbike wordt geladen...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default UpdateMtb;