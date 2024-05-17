import './RentalPage.css';
import adultOrChild from '../../helpers/mountianbikes/adultOrChild.jsx'
import {useEffect, useState} from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
import Header from "../../components/header/Header.jsx";
import mtbRental from "../../assets/verhuur2.jpg";
import frameSizeDutch from "../../helpers/mountianbikes/frameSizeDutch.jsx";
import {Link} from "react-router-dom";
import MtbPicture from "../../components/pictures/MtbPicture.jsx"

function RentalPage() {
    const [error, toggleError] = useState(false);
    const [, setMountainbikes] = useState([]);
    const [forAdult, setForAdult] = useState('');
    const [fullSuspension, setFullSuspension] = useState('');
    const [size, setSize] = useState('');
    const [search, setSearch] = useState([]);


    useEffect(() => {
        async function fetchAllMountainbikes() {
            try {
                const response = await axios.get('http://localhost:8080/mountainbikes');
                setMountainbikes(response.data);
                setSearch(response.data);
            } catch (err) {
                console.error(err);
                toggleError(true);
            }
        }
        fetchAllMountainbikes();
    }, []);

    async function handleSearch(event) {
        event.preventDefault();
        toggleError(false);
        try {
            let queryString = `http://localhost:8080/mountainbikes/search?`;
            const params = {size, forAdult, fullSuspension};

            queryString += Object.entries(params)
                .filter(([, value]) => value)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');

            const response = await axios.get(queryString);
            console.log(response.data);
            setSearch(response.data);

        } catch (err) {
            console.error(err);
            toggleError(true);
        }
    }

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };
    const handleForAdultChange = (event) => {
        setForAdult(event.target.value);
    };

    const handleFullSuspensionChange = (event) => {
        setFullSuspension(event.target.value);
    };


    return (<>
            <div>
                <Helmet>
                    <title>MTB Clinics-Ede | Verhuur</title>
                </Helmet>
            </div>
            <Header img={mtbRental} img_title="bike-wheel" title="MTB-Verhuur"/>
            <main className="outer-content-container">
                <div>
                <form onSubmit={handleSearch}>
                    <div>
                        <label>
                            Type:
                            <select value={forAdult.toString()} onChange={handleForAdultChange}>
                                <option value="">Alle</option>
                                <option value="true">Volwassenen</option>
                                <option value="false">Kinder Mountainbikes</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Size:
                            <select value={size} onChange={handleSizeChange}>
                                <option value=""> Alle</option>
                                <option value="small"> Klein</option>
                                <option value="medium"> Medium</option>
                                <option value="large"> Groot</option>
                                <option value="extra-large"> Extra groot</option>
                            </select>
                        </label>
                        <label>
                            Vering:
                            <select value={fullSuspension} onChange={handleFullSuspensionChange}>
                                <option value="">Alle</option>
                                <option value="true">Volledig geveerd</option>
                                <option value="false">Voorvering</option>
                            </select>
                        </label>
                        <div>
                            <button type="submit">Zoeken</button>
                        </div>
                    </div>
                </form>
                {error && <p>Error fetching mountain bikes</p>}
                <section className="outer-content">
                    {search.length > 0 ? (<div>
                        {search.map((mtb) => <ul key={mtb.id}>
                            <li>
                                <h2>{mtb.name}</h2>
                                <MtbPicture mountainbike={mtb}/>
                                <p>Wielgrootte: {mtb.wheelSize}</p>
                                <p>Frame maat: {frameSizeDutch(mtb.frameSize)}</p>
                                <p>Versnellingen: {mtb.gears}</p>
                                <p>Volledig geveerd: {mtb.fullSuspension ? 'Ja' : 'Nee'}</p>
                                <p>Type: {adultOrChild(mtb.forAdult)}</p>
                                <p>Prijs hele dag: € {mtb.pricePerDayPart},-</p>
                                <p>Prijs per dagdeel (4 uur of minder):  € {mtb.pricePerDayPart -10},-</p>
                                <button type="submit"><Link to={`/mtb-verhuur/${mtb.id}`}>Reserveer mountainbike</Link>
                                </button>
                            </li>
                        </ul>)}
                    </div>) : (<p>Geen Mountainbike gevonden, probeer het opnieuw.</p>)}
                </section>
                </div>
            </main>
        </>

    )
}

export default RentalPage;