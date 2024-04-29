import {Helmet} from "react-helmet";
import mtbRoute from "../../assets/mtbRoute.jpg";
import mtbSymbol from "../../assets/mtb-teken-groen.jpg"
import Header from "../../components/header/Header.jsx";
import './MtbRoutes.css'
import {useEffect, useState} from "react";
import axios from 'axios';
import {Link} from "react-router-dom";

function MtbRoutes() {
    const [allRoutes, setAllRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [place, setPlace] = useState('');
    const [province, setProvince] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [routeType, setRouteType] = useState('');
    const [error, toggleError] = useState(false);

    useEffect(() => {
        async function fetchAllRoutes() {
            try {
                const response = await axios.get('http://localhost:8080/routes/search');
                setAllRoutes(response.data);
                setFilteredRoutes(response.data);
            } catch (err) {
                console.error(err);
                toggleError(true);
            }
        }
        fetchAllRoutes();
    }, []);

    async function handleSearch (event){
        event.preventDefault();
        toggleError(false);

        try {
            let queryString = 'http://localhost:8080/routes/search?';
            const params = {place, province, difficulty, routeType};
            queryString += Object.entries(params)
                .filter(([key, value]) => value)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');

            const response = await axios.get(queryString);
            setFilteredRoutes(response.data);
        } catch (err) {
            console.error(err);
            toggleError(true);
        }
    }

    const handlePlaceChange = (event) => {
        setPlace(event.target.value);
    };

    const handleProvinceChange = (event) => {
        setProvince(event.target.value);
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const handleTypeChange = (event) => {
        setRouteType(event.target.value);
    };

    function changeDifficultyName(difficulty) {
        switch (difficulty) {
            case 'EASY':
                return 'Makkelijk';
            case 'MODERATE':
                return 'Gemiddeld';
            case 'DIFFICULT':
                return 'Moeilijk';
        }
    }

    function changeTypeName(routeType) {
        switch (routeType) {
            case 'ADULT':
                return 'Volwassene';
            case 'CHILD':
                return 'Kinderroute';
        }
    }

    return (
        <>
            <div>
                <Helmet>
                    <title>MTB Clinics-Ede | Routes</title>
                </Helmet>
            </div>
            <main>
                <Header img={mtbRoute} img_title="bike-wheel" title="MTB-Routes"/>
                <section className="outer-content-container">
                    <div className="inner-content-container ">
                        <h2>Zoek de route die bij je past!</h2>
                        <div className="search-info-container">
                            <img className="route-img" src={mtbSymbol} alt="MTB-symbool"/>
                            <p>Kom crossen over singletracks door bossen en heidevelden, tackle een uitdagende MTB-route
                                of geniet van één van de mooiste MTB-routes van Nederland! Ben je op zoek naar een
                                MTB-route voor beginners of ben je juist toe aan een uitdagende track? Kies hier de
                                route die
                                het beste bij je past.</p>
                        </div>
                    </div>
                </section>
                <div>
                    <div>
                        <label htmlFor="place">Plaats:</label>
                        <input type="text"
                               id="place"
                               value={place}
                               onChange={handlePlaceChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="province">Provincie:</label>
                        <select id="province" value={province} onChange={handleProvinceChange}>
                            <option value="">Kies provincie</option>
                            <option value="Gelderland">Gelderland</option>
                            <option value="Utrecht">Utrecht</option>
                            <option value="Overijssel">Overijssel</option>
                            <option value="Flevoland">Flevoland</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="difficulty">Niveau:</label>
                        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
                            <option value="">Kies Niveau</option>
                            <option value="EASY">Makkelijk</option>
                            <option value="MODERATE">Gemiddeld</option>
                            <option value="DIFFICULT">Moeilijk</option>

                        </select>
                    </div>
                    <div>
                        <label htmlFor="routeType">Type:</label>
                        <select id="routeType" value={routeType} onChange={handleTypeChange}>
                            <option value="">Kies Type</option>
                            <option value="ADULT">Volwassene</option>
                            <option value="CHILD">Kind</option>
                        </select>
                    </div>
                    <button onClick={handleSearch}>Zoeken</button>
                    {error && <p>Kan route niet vinden.</p>}
                    {filteredRoutes.length > 0 ? (
                        <table>
                            <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Locatie</th>
                                <th>Provincie</th>
                                <th>Type</th>
                                <th>Niveau</th>
                                <th>Afstand</th>
                                <th>Beginpunt</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRoutes.map((route) => (
                                <tr key={route.id}>
                                    <td><Link to={`/mtb-routes/${route.id}`}>{route.name}</Link></td>
                                    <td>{route.place}</td>
                                    <td>{route.province}</td>
                                    <td>{changeTypeName(route.routeType)}</td>
                                    <td>{changeDifficultyName(route.difficulty)}</td>
                                    <td>{route.distance}</td>
                                    <td>{route.startingPoint}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Route niet gevonden, probeer het opnieuw!</p>
                    )}
                </div>
            </main>
        </>
    );
}

export default MtbRoutes;