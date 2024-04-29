import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import routeMtb from '../../assets/header-mtb-route.jpeg';
import DifficultyName from "../../helpers/changeDifficultyName.jsx";
import TypeName from "../../helpers/changeTypeName.jsx";

function RouteDetails() {

    const [route, setRoute] = useState(null);
    const {id} = useParams();
    const [image, setImage] = useState(null);
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

    useEffect(() => {
        async function fetchRoutePicture() {
            try {
                const response = await axios.get(`http://localhost:8080/routes/${id}/picture`, {
                    responseType: 'blob',
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
            } catch (err) {
                console.error("Kan afbeelding niet ophalen", err);
            }
        }

        fetchRoutePicture();
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [id]);


    return (

        <main>

            {route ? (
                <section>
                    <Header img={routeMtb} img_title={route.name} title={route.name}/>
                    <h2>{route.name}</h2>
                    <div>
                    <p>Provincie: {route.province}</p>
                    <p>Afstand: {route.distance}km</p>
                    <p>Type: {TypeName(route.routeType)}</p>
                    <p>Niveau: {DifficultyName(route.difficulty)}</p>
                    </div>

                    {image && <img src={image} alt='Route image'/>}
                    <div>
                    <h4>Startlocatie</h4>
                    <p>Je kunt de route starten bij: </p>
                    <li>{route.startingPoint}</li>
                    <h3>Route Informatie</h3>
                    <p>{route.routeInformation}</p>
                    </div>
                </section>
            ) : (
                <p>{error} Route aan het laden....</p>
            )}


        </main>
    );
}

export default RouteDetails;