import './RentalPage.css';
import adultOrChild from '../../helpers/mountianbikes/adultOrChild.jsx'
import {useEffect, useState} from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
import Header from "../../components/header/Header.jsx";
import mtbRental from "../../assets/verhuur2.jpg";

function RentalPage() {
    const [error, toggleError] = useState(false);
    const [mountainbikes, setMountainbikes] = useState([]);
    const [forAdult, setForAdult] = useState('');
    const [fullSuspension, setFullSuspension] = useState('');
    const [size, setSize] = useState('');
    const [search, setSearch] = useState([]);
    const [imageUrls, setImageUrls] = useState({});


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
                .filter(([key, value]) => value)
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

    useEffect(() => {
        async function fetchMtbPicture(id) {
            try {
                const response = await axios.get(`http://localhost:8080/mountainbikes/${id}/picture`, {
                    responseType: 'blob',
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImageUrls(prevState => ({
                    ...prevState, [id]: imageUrl
                }));
            } catch (err) {
                console.error("Kan afbeelding niet ophalen", {error});
            }
        }
        mountainbikes.forEach(mtb => {
            fetchMtbPicture(mtb.id);
        });

        return () => {
            Object.values(imageUrls).forEach(URL.revokeObjectURL);
        };
    }, [mountainbikes]);

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
            <main>
                <Header img={mtbRental} img_title="bike-wheel" title="MTB-Verhuur"/>
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
                                    {imageUrls[mtb.id] && <img src={imageUrls[mtb.id]} alt={mtb.name}/>}
                                    <p>Wielgrootte: {mtb.wheelSize}</p>
                                    <p>Frame maat: {mtb.frameSize}</p>
                                    <p>Versnellingen: {mtb.gears}</p>
                                    <p>Prijs per dag: € {mtb.pricePerDayPart},-</p>
                                    <p>Type: {adultOrChild(mtb.forAdult)}</p>
                                </li>
                            </ul>)}
                        </div>) : (<p>Geen Mountainbike gevonden, probeer het opnieuw.</p>)}
                </section>
            </main>
        </>

    )
}

export default RentalPage;