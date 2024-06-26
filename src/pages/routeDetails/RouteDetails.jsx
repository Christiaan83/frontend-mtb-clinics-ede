import axios from "axios";
import "./RouteDetails.css"
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import routeMtb from '../../assets/header-mtb-route.jpeg';
import DifficultyName from "../../helpers/changeDifficultyName.jsx";
import TypeName from "../../helpers/changeTypeName.jsx";
import RouteMap from "../../components/pictures/RouteMap.jsx";

function RouteDetails() {

    const [route, setRoute] = useState(null);
    const {id} = useParams();
    const [error, toggleError] = useState(false);



    useEffect(() => {
        toggleError(true);

        async function getRouteDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/routes/${id}`);
                console.log(response.data);
                setRoute(response.data);
            } catch (err) {
                console.error(err);
                toggleError(true);
            }
        }

        getRouteDetails();
    }, [id]);


    return (

        <main>

            {route ? (
                <div>
                    <Header img={routeMtb} img_title={route.name} title={route.name}/>
                    <section className="route-details-container">
                        <div className="inner-content-container">
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
                                <p>Je kunt de route starten bij: </p>

                                <li className="starting-point">{route.startingPoint}</li>

                                <h3>Route Informatie</h3>
                                <p>{route.routeInformation}</p>
                            </div>
                            <p><Link className="back-to-routes" to="/mtb-routes">Terug naar alle routes</Link></p>
                        </div>
                    </section>
                </div>
            ) : (
                <p>{error} Route aan het laden....</p>
            )}


        </main>
    );
}

export default RouteDetails;