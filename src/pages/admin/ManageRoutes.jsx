import './Admin.css'
import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../helpers/getUserRole.jsx";
import {Link} from "react-router-dom";
import RouteMap from "../../components/pictures/RouteMap.jsx";
import {Helmet} from "react-helmet";

function ManageRoutes() {
    const [routes, setRoutes] = useState([]);
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetchRoutes();
    }, []);


    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/routes');
            setRoutes(response.data);

        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const deleteRoute = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/routes/${id}`, config);
            await fetchRoutes();
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };
    const downloadRoutePicture = async (routeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/routes/${routeId}/picture`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'route-map.jpg');
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
                <Header img={adminPic} img_title="bike-wheel" title="Admin-Routes"/>

                <section className="admin-container">
                    <div className="table-content">
                        <h2 className="table-title">Routes</h2>

                        <div className="table-container">
                            {isAuth && routes.length > 0 ? (
                                <table className="admin-table">
                                    <thead>
                                    <tr>
                                        <th>Route-kaart</th>
                                        <th>Naam</th>
                                        <th>Type</th>
                                        <th>Niveau</th>
                                        <th>Plaats</th>
                                        <th>Provincie</th>
                                        <th>Afstand</th>
                                        <th>Beschikbaar</th>
                                        {isAuth && userRole === "ADMIN" && (
                                            <>
                                                <th>Aanpassen</th>
                                                <th>Verwijderen</th>
                                                <th>Afbeelding</th>
                                            </>
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {routes.map((route) => (
                                        <tr key={route.id}>
                                            <td>
                                                <div>
                                                    {<RouteMap routeId={route.id} className="table-route-map"
                                                    />}
                                                </div>
                                            </td>
                                            <td>{route.name}</td>
                                            <td>{route.routeType}</td>
                                            <td>{route.difficulty}</td>
                                            <td>{route.place}</td>
                                            <td>{route.province}</td>
                                            <td>{route.distance}</td>
                                            <td>{route.available ? 'ja' : 'nee'}</td>

                                            {isAuth && userRole === "ADMIN" && (
                                                <>
                                                    <td>
                                                        <button type="submit"><Link
                                                            to={`/admin/routes/update/${route.id}`}>Update route</Link>
                                                        </button>
                                                    </td>

                                                    <td>
                                                        <button onClick={() => deleteRoute(route.id)}>
                                                            Verwijderen
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => downloadRoutePicture(route.id)}>
                                                            Downloaden
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>Geen routes gevonden, probeer het opnieuw!</p>
                            )}
                        </div>
                        <button type="submit" className="add-button">
                            <Link
                                to='/admin/routes/toevoegen'>Nieuwe Route toevoegen</Link>
                        </button>
                    </div>
                </section>
            </>
        );
}

export default ManageRoutes;