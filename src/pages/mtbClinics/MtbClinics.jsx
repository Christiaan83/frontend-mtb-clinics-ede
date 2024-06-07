import './MtbClinics.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Helmet} from "react-helmet";
import mtbClinics from "../../assets/mtb-clinics2.jpg";
import Header from "../../components/header/Header.jsx";
import difficultyName from "../../helpers/changeDifficultyName.jsx";
import {Link} from "react-router-dom";
import TrainingPicture from "../../components/pictures/TrainingPicture.jsx";
import {formatTime} from "../../helpers/formatTime.jsx";


function MtbClinics() {
    const [error, toggleError] = useState(false);
    const [clinics, setClinics] = useState([]);

useEffect(() => {
    async function fetchAllClinics() {
        try {
            const response = await axios.get('http://localhost:8080/trainings');
            setClinics(response.data);

        } catch (err) {
            console.error(err);
            toggleError(true);
        }
    }

    fetchAllClinics();
}, []);

return (
    <>
        <div>
            <Helmet>
                <title>MTB Clinics-Ede | Clinics </title>
            </Helmet>
        </div>
        <Header img={mtbClinics} img_title="bike-wheel" title="MTB-Clinics"/>
        <main>
            <section className="outer-content-container">
                <div className="inner-content-container">

                    <h2>Waarom een clinic volgen?</h2>
                    <div className="search-info-container">
                       <p>

                           Een mountainbike clinic volgen bij <strong>MTB Clinics-Ede</strong> betekent werken aan jouw mountainbike skills. Met krachtige benen kom je ver, maar nog veel belangrijker is jouw techniek, controle en balans. Mountainbiken is iets heel anders dan fietsen op de stads- of racefiets.

                           Vooral de basis van het mountainbiken is erg belangrijk. Hierin schuilen de geheimen van volledige controle en controle geeft vertrouwen. Hoe hoger het niveau, hoe meer details er belangrijk zijn. Dit zijn kleine verschillen die je zelf vaak niet kunt zien. In onze mountainbike clinics geven wij je tips en tricks om één te zijn met jouw mountainbike en te kunnen mountainbiken in ieder terrein. Je krijgt van ons gerichte aanwijzingen, nuttige feedback en veel persoonlijke aandacht. Ben je op zoek naar een MTB clinic voor beginners, gezinnen of als gevorderde? Wij bieden mountainbike clinics aan op meerdere niveaus, zodat jij het meeste er uit kunt halen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="blocks-section">
                <div className="blocks">
                    {clinics.map((clinics) =>
                        <ul className="blocks-info clinic-info" key={clinics.id}>
                            <li>
                                <h2>{clinics.name}</h2>
                                <TrainingPicture training={clinics} trainingId={clinics.id}/>
                                <br/>
                                <h4>Over de clinic:</h4>
                                <p> {clinics.description}</p>
                                <br/>
                                <p>Moeilijkheidsgraad: {difficultyName(clinics.difficulty)}</p>
                                <p>Prijs: € {(clinics.price).toFixed(2)} {clinics.trainingInGroup ? ' per persoon' : '' }</p>
                                <p>Begin tijd: {formatTime(clinics.startTime)}</p>
                                <p>Eindtijd: {formatTime(clinics.endTime)}</p>
                                <p>Locatie:&nbsp;
                                    <Link className="link" to={`https://maps.google.com/?q=${clinics.location}`}
                                          target="_blank">
                                        {clinics.location}
                                    </Link>
                                </p>
                                <p>Groepstraining: {clinics.trainingInGroup ? 'Ja' : 'Nee'}</p>
                                <br/>
                            </li>
                            <button className="button" type="submit"><Link to={`/mtb-clinics/${clinics.id}`}>Boek
                                deze clinic</Link>
                            </button>
                        </ul>)
                    }
                    {error && <p className="error-message">Er is iets fout gegaan probeer opnieuw!</p>}
                </div>
            </section>
        </main>

    </>

)
}

export default MtbClinics;