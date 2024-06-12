import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import getUserRole from "../../../helpers/getUserRole.jsx";
import axios from "axios";
import Header from "../../../components/header/Header.jsx";
import adminPic from "../../../assets/AdminPic.webp";
import TypeName from "../../../helpers/changeTypeName.jsx";
import DifficultyName from "../../../helpers/changeDifficultyName.jsx";
import RouteMap from "../../../components/pictures/RouteMap.jsx";
import {getTypeNiveau} from "../../../helpers/getTypeNiveau.jsx";


function UpdateRoute() {
    const {id} = useParams();
    const [route, setRoute] = useState({});
    const [name, setName] = useState('');
    const [routeType, setRouteType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [startingPoint, setStartingPoint] = useState('');
    const [place, setPlace] = useState('');
    const [province, setProvince] = useState('');
    const [error, setError] = useState('');
    const [routeInformation, setRouteInformation] = useState('');
    const [distance, setDistance] = useState('');
    const [available, setAvailable] = useState('');

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
        const fetchRoute = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/routes/${id}`);
                setRoute(response.data);
                setName(response.data.name);
                setRouteType(response.data.routeType);
                setDifficulty(response.data.difficulty);
                setStartingPoint(response.data.startingPoint);
                setPlace(response.data.place);
                setProvince(response.data.province);
                setRouteInformation(response.data.routeInformation);
                setDistance(response.data.distance);
                setAvailable(response.data.available ? 'true' : 'false');

            } catch (error) {
                console.error('Error fetching mountainbike:', error);
            }
        };
        fetchRoute();
    }, [id]);

    const updateRoute = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/routes/${id}`, {
                name: name,
                routeType: routeType,
                difficulty: difficulty,
                startingPoint: startingPoint,
                place: place,
                province: province,
                routeInformation: routeInformation,
                distance: distance,
                available: available,
            }, config);
            console.log('Route updated successfully');
            navigate('/admin/routes');
        } catch (error) {
            console.error('Error updating mountain bike:', error);
            setError(error.response?.data?.message || "An error occurred during update");
        }
    };

    const { routeTypes, difficulties } = getTypeNiveau();

    return (
        <>
            <Header img={adminPic} img_title="bike-wheel" title="Update-Mountainbike"/>
            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Mountainbike aanpassen</h2>
                    <div className="table-container">
                        {isAuth && route? (
                            <>
                                <h3>{route.name}</h3>
                                <div className="details-information">
                                    <p>Plaats: {route.place}</p>
                                    <p>Provincie: {route.province}</p>
                                    <p>Afstand: {route.distance}km</p>
                                    <p>Type: {TypeName(route.routeType)}</p>
                                    <p>Niveau: {DifficultyName(route.difficulty)}</p>
                                </div>
                                {<RouteMap routeId={route.id}
                                />}
                                <div className="route-information">
                                    <h4>Startlocatie</h4>
                                    <li className="starting-point">{route.startingPoint}</li>
                                    <h4>Route Informatie</h4>
                                    <p>{route.routeInformation}</p>
                                </div>

                                <section className="admin-container">
                                    {isAuth && userRole === 'ADMIN' && (
                                        <form onSubmit={updateRoute} className="admin-form">
                                            <h4>Vul onderstaande velden in </h4>
                                            <div>
                                                <label htmlFor="name">Route-naam:</label>
                                                <input type="text" id="name" value={name}
                                                       onChange={(e) => setName(e.target.value)}
                                                       required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="routeType">Type:</label>
                                                <select
                                                    id="routeType"
                                                    value={routeType}
                                                    onChange={(e) => setRouteType(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Selecteer type</option>
                                                    {routeTypes.map((type) => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="difficulty">Niveau:</label>
                                                <select
                                                    id="difficulty"
                                                    value={difficulty}
                                                    onChange={(e) => setDifficulty(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Selecteer niveau</option>
                                                    {difficulties.map((niveau) => (
                                                        <option key={niveau.value} value={niveau.value}>
                                                            {niveau.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="startingPoint">Beginpunt:</label>
                                                <input type="text" id="startingPoint" value={startingPoint}
                                                       onChange={(e) => setStartingPoint(e.target.value)}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="place}">Plaats:</label>
                                                <input type="text" id="place}t" value={place}
                                                       onChange={(e) => setPlace(e.target.value)}

                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="province">Provincie</label>
                                                <input type="text" id="province" value={province}
                                                       onChange={(e) => setProvince(e.target.value)}
                                                       />
                                            </div>
                                            <div>
                                                <label htmlFor="routeInformation">Route beschrijving </label>
                                                <textarea id="province"
                                                          value={routeInformation}
                                                          onChange={(e) => setRouteInformation(e.target.value)}
                                                          rows="10"
                                                          cols="50"
                                                          />
                                            </div>
                                            <div>
                                                <label htmlFor="distance">Afstand</label>
                                                <input type="number" id="distance" value={distance}
                                                       onChange={(e) => setDistance(e.target.value)}
                                                       />
                                            </div>
                                            <div className="radio-group">
                                                <p><u>Beschikbaar</u></p>
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
                                            <button type="submit">Route Aanpassen</button>
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


export default UpdateRoute;