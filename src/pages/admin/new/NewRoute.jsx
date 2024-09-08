import'../Admin.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import getUserRole from "../../../custom_hooks/getUserRole.jsx";
import axios from "axios";
import Header from "../../../components/header/Header.jsx";
import {useNavigate} from "react-router-dom";
import adminPic from "../../../assets/AdminPic.webp";
import {getTypeNiveau} from "../../../helpers/getTypeNiveau.jsx";
import ButtonLightGreen from "../../../components/buttons/ButtonLightGreen.jsx";


function NewRoute() {

    const [name, setName] = useState('');
    const [routeType, setRouteType] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [startingPoint, setStartingPoint] = useState('');
    const [place, setPlace] = useState('');
    const [province, setProvince] = useState('');
    const [error, toggleError] = useState('');
    const [routeInformation, setRouteInformation] = useState('');
    const [distance, setDistance] = useState('');
    const [available, setAvailable] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError('');

        if (userRole !== "ADMIN") {
            toggleError("Only admins can add routes.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/routes', {
                name: name,
                routeType: routeType,
                difficulty: difficulty,
                startingPoint: startingPoint,
                place: place,
                province: province,
                routeInformation: routeInformation,
                distance: distance,
                available: available,
            }, config)
            const routeId = response.data.id;
            console.log("New route added:", response.data);


            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append("file", imageFile);

                try {
                    const imageResponse = await axios.post(
                        `http://localhost:8080/routes/${routeId}/picture`,
                        imageFormData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("Image uploaded:", imageResponse.data);
                } catch (err) {
                    console.error("Error uploading image:", err);
                    toggleError(err.response?.data?.message || "An error occurred during image upload");
                    return;
                }
            }
            navigate('/admin/routes');

        } catch (err) {
            console.error("Can not add new route:", err);
            toggleError(error.response?.data?.message || "An error occurred");
        }
    }
    const { routeTypes, difficulties } = getTypeNiveau();
    return (
        <>
            <Header img={adminPic} img_title="admin-picture" title="Nieuwe Route Toevoegen"/>

            <section className="admin-container">

                {isAuth && userRole === 'ADMIN' && (
                    <form onSubmit={handleSubmit} className="admin-form">
                        <h4>Vul onderstaande velden in</h4>
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
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor="place}">Plaats:</label>
                            <input type="text" id="place}t" value={place}
                                   onChange={(e) => setPlace(e.target.value)}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor="province">Provincie</label>
                            <input type="text" id="province" value={province}
                                   onChange={(e) => setProvince(e.target.value)}
                                   required/>
                        </div>
                        <div>
                            <label htmlFor="routeInformation">Route beschrijving </label>
                            <textarea id="province"
                                      value={routeInformation}
                                      onChange={(e) => setRouteInformation(e.target.value)}
                                      rows="4"
                                      cols="50"
                                      required/>
                        </div>
                        <div>
                            <label htmlFor="distance">Afstand</label>
                            <input type="number" id="distance" value={distance}
                                   onChange={(e) => setDistance(e.target.value)}
                                   required/>
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
                                required
                            />
                            <label htmlFor="available">Nee</label>
                            <input
                                type="radio"
                                id="availableFalse"
                                name="available"
                                value="false"
                                checked={available === 'false'}
                                onChange={(e) => setAvailable(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input type="file" onChange={(e) => setImageFile(e.target.files[0])}
                                   required/>
                        </div>
                        <ButtonLightGreen
                            type="submit"
                            text="Route Toevoegen"
                        />
                    </form>
                )}
            </section>
        </>
    );
}

export default NewRoute;