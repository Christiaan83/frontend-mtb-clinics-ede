import {Link} from "react-router-dom";
import './Home.css';
import {Helmet} from "react-helmet";
import header1 from '../../assets/Header1.png'
import clinics from '../../assets/clinics.jpg'
import route from '../../assets/MTB-route-bordjes.jpg'
import rental from '../../assets/Verhuur.png'
import info from '../../assets/MTB-info.jpeg'
import Header from "../../components/header/Header.jsx";

function Home() {
    return (
        <>
            <div>
                <Helmet>
                    <title>MTB Clinics-Ede | Home</title>
                </Helmet>
            </div>

            <main>
                <Header img={header1} img_title="bike-wheel" title="Welkom op de website van MTB Clinics-Ede!"/>
                <section className="outer-content-container ">
                    <div className="inner-content-container ">
                        <h2>
                            Echt leren mountainbiken
                        </h2>
                        <section className="info-container">
                            <img className="info-img" src={info} alt="info-picture"/>
                            <div>
                                <p>
                                    Een mountainbike clinic volgen bij MTB Clinics Ede betekent werken aan jouw
                                    mountainbike
                                    skills. Met krachtige benen kom je ver, maar nog veel belangrijker is jouw techniek,
                                    controle en balans. Mountainbiken is iets heel anders dan fietsen op de stads- of
                                    racefiets.
                                </p>
                                <p>
                                    Vooral de basis van het mountainbiken is erg belangrijk. Hierin schuilen de geheimen
                                    van
                                    volledige controle en controle geeft vertrouwen. Hoe hoger het niveau, hoe meer
                                    details er
                                    belangrijk zijn. Dit zijn kleine verschillen die je zelf vaak niet kunt zien. In
                                    onze
                                    mountainbike clinics geven wij je tips en tricks om één te zijn met jouw
                                    mountainbike en te
                                    kunnen mountainbiken in ieder terrein. Je krijgt van ons gerichte aanwijzingen,
                                    nuttige
                                    feedback en veel persoonlijke aandacht. Ben je op zoek naar een MTB clinic voor
                                    beginner,
                                    geoefend of gevorderd? Wij bieden mountainbike clinics aan op ieder niveau zodat jij
                                    er het
                                    meeste uit kunt halen.
                                </p>
                            </div>
                        </section>
                    </div>
                </section>
                <section className="blocks-section">
                    <h2>Onze aangeboden opties</h2>
                    <ul className='info-blocks'>
                        <li className='info-items'>
                            <Link to="/clinics">
                                <h4 className='block-text'>MTB-Clinics</h4>
                                <img src={clinics} alt="clinics"/>
                                <p className='block-text paragraph-text'> Met de juiste techniek kun jij iedere
                                    uitdaging aan en zit je zelfverzekerd op de mountainbike. Of het nu gaat om het
                                    leren van goede basistechniek of specifieke skills, na een MTB Clinic zit je beter
                                    op de fiets. De lessen worden worden op verschillend niveaus gegeven en worden
                                    uitsluitend door gediplomeerde trainers gegeven.</p>
                            </Link>
                        </li>
                        <li className='info-items'>
                            <Link to="/mtb-routes">
                                <h4 className='block-text'>MTB-Routes</h4>
                                <img src={route} alt="mtb-routes"/>
                                <p className='block-text paragraph-text'>Ondanks dat Nederland geen echte bergen kent,
                                    is het mountainbiken er zeer populair en zijn er meer dan 100 verschillende routes
                                    over het gehele land te vinden. Het onderscheid tussen deze routes is groot. Zo kan
                                    je door de duinen ploeteren in Noord-Holland, genieten van de bossen in Drenthe en
                                    de wind trotseren in Zeeland.</p>
                            </Link>
                        </li>
                        <li className='info-items'>
                            <Link to="/mtb-verhuur">
                                <h4 className='block-text'>MTB-Verhuur</h4>
                                <img src={rental} alt="mtb-rental"/>
                                <p className='block-text paragraph-text'>Hardtail en full suspension mountainbikes zijn
                                    in alle maten te huur. Huur is inclusief een grote bidon en een helm naar keuze uit
                                    5 verschillende maten.
                                    Je krijgt een fiets die bij je lichaamslengte past. De mountainbikes zijn uitgerust
                                    met professionele platformpedalen die rijtechnische voordelen bieden. Wil je
                                    klikpedalen, neem die dan zelf mee.</p>
                            </Link>
                        </li>
                    </ul>
                </section>
            </main>
            <footer className='footer'>
                <section className="footer-section">
                    <div>
                        <h3>Contact gegevens</h3>
                        <a href="https://maps.google.nl/maps?daddr=Akulaan%202,%206717%20XN%20in%20Ede" target="_blank">
                            <p> De Fietser, Akulaan 2</p>
                            <p>6717 XN, Ede</p>
                        </a>
                        <p><a href="tel:+31318583207">0318 583 207</a></p>
                        <p><a href="mailto:info@mtbclinics-ede.nl">info@mtbclinics-ede.nl</a></p>
                    </div>
                    <div>
                        <h3><Link to="/">MTB Clinics-ede</Link></h3>
                    </div>

                    <div>
                        <Link to="/contact">
                            <button>Contact</button>
                        </Link>

                    </div>
                </section>
            </footer>
        </>
    );
}

export default Home;