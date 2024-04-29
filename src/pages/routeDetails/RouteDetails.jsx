import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import mtbRoute from "../../assets/mtbRoute.jpg";

function RouteDetails() {

    const[route, setRoute] = useState(null);
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
       async function fetchRoutePicture(){
            try {
                const response = await axios.get(`http://localhost:8080/routes/${id}/picture`, {
                    responseType: 'blob',
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
            }catch (err){
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



    return(
    <main>
        <Header img={mtbRoute} img_title="bike-wheel" title="MTB-Routes"/>
        <div>

            {route ? (
                <div>
                    <h2>{route.name}</h2>
                    <p>Provincie: {route.province}</p>
                    <p>Afstand: {route.distance}km</p>
                    <p>Type: {route.routeType}</p>
                    {image && <img src={image} alt='Route image'/>}
                    <h4>Startlocatie</h4>
                    <p>Je kunt de route starten bij: </p>
                    <li>{route.startingPoint}</li>
                    <h3>Route Informatie</h3>
                    <p>{route.routeInformation}</p>
                </div>
            ) : (
                <p>{error} Route aan het laden....</p>
            )}

        </div>
    </main>
);
}

export default RouteDetails;