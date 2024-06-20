import './Admin.css'
import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../helpers/getUserRole.jsx";
import MtbPicture from "../../components/pictures/MtbPicture.jsx";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";


function ManageMountainbikes() {

    const [mountainbikes, setMountainbikes] = useState([]);
    const [error, setError] = useState(false);
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetchMountainBikes();
    }, []);


    const fetchMountainBikes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/mountainbikes');
            setMountainbikes(response.data);

        } catch (error) {
            console.error('Error fetching mountain bikes:', error);
        }
    };


    const deleteMountainbike = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/mountainbikes/${id}`, config);
            await fetchMountainBikes();

        } catch (error) {
            console.error('Error deleting mountain bike:', error);
            setError(true);
        }
    };
    const downloadMtbPicture = async (mtbId) => {
        try {
            const response = await axios.get(`http://localhost:8080/mountainbikes/${mtbId}/picture`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'mtb_picture.jpg');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error fetching picture:', error);
            alert("Er is een fout opgetreden bij het downloaden van de afbeelding.");
        }
    };

    return (
        <>
            <div>
                <Helmet>
                    <title>MTB Clinics-Ede | Admin</title>
                </Helmet>
            </div>
            <Header img={adminPic} img_title="bike-wheel" title="Admin-Mountainbikes"/>

            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Mountainbikes</h2>

                    <div className="table-container">
                        {error && (
                            <p className="text-danger">
                                Aub eerst de mountainbike van de reservering verwijderen voordat u verder kunt gaan.
                            </p>
                        )}
                        {isAuth && mountainbikes.length > 0 ? (
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
                                    <th>Aanpassen</th>
                                    {isAuth && userRole === "ADMIN" && (<>
                                        <th>Verwijderen</th>
                                        <th>Afbeelding</th>
                                    </>)}
                                </tr>
                                </thead>
                                <tbody>
                                {mountainbikes.map((mtb) => (<tr key={mtb.id}>
                                    <td>
                                        <div className="table-image">
                                            <MtbPicture mountainbike={mtb}/>
                                        </div>
                                    </td>
                                    <td>{mtb.name}</td>
                                    <td>{mtb.wheelSize}</td>
                                    <td>{mtb.frameSize}</td>
                                    <td>{mtb.gears}</td>
                                    <td>{mtb.forAdult ? 'Volwassenen' : 'Kind'}</td>
                                    <td>{mtb.fullSuspension === null ? 'geen' : (mtb.fullSuspension ? 'Volledig' : 'Voor')}</td>
                                    <td>{mtb.available ? 'Ja' : 'Nee'}</td>
                                    <td>€ {mtb.pricePerDayPart},-</td>
                                    <td>{mtb.amount}</td>
                                    <td>
                                        <button type="submit"><Link
                                            to={`/admin/mountainbikes/update/${mtb.id}`}>Update MTB</Link>
                                        </button>
                                    </td>
                                    <>
                                        <td key={mtb.id}>
                                            <button disabled={error}
                                                    onClick={() => deleteMountainbike(mtb.id)}>Verwijderen
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => downloadMtbPicture(mtb.id)}>Downloaden</button>
                                        </td>

                                    </>
                                </tr>))}
                                </tbody>
                            </table>) : (<p>Geen mountainbikes gevonden, probeer het opnieuw!</p>)}
                    </div>
                    <button type="submit" className="add-button">
                        <Link
                            to='/admin/mountainbikes/toevoegen'>Nieuwe MTB toevoegen</Link>
                    </button>
                </div>
            </section>
        </>);
}

export default ManageMountainbikes;