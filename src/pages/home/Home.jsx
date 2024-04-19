import {Link} from "react-router-dom";
import './Home.css';
import {Helmet} from "react-helmet";
import header1 from '../../assets/Header1.png'
import clinics from '../../assets/clinics.jpg'
import route from '../../assets/MTB-route-bordjes.jpg'
import rental from '../../assets/Verhuur.png'
import Header from "../../components/header/Header.jsx";

function Home() {
    return (
        <>
            <div>
                <Helmet>
                    <title>MTB-Clinics-Ede | Home</title>
                </Helmet>
            </div>

            <main>
                <Header img={header1} img_title="bike-wheel" title="Welkom op de website van MTB Clinics Ede!"/>
                <section className= "outer-content-container">
                    <div className="inner-content-container__text-restriction">
                    <h2>
                        Echt leren mountainbiken
                    </h2>
                    <p>
                        Een mountainbike clinic volgen bij MTB Clinics Ede betekent werken aan jouw mountainbike skills. Met krachtige benen kom je ver, maar nog veel belangrijker is jouw techniek, controle en balans. Mountainbiken is iets heel anders dan fietsen op de stads- of racefiets.
                    </p>
                        <p>
                        Vooral de basis van het mountainbiken is erg belangrijk. Hierin schuilen de geheimen van volledige controle en controle geeft vertrouwen. Hoe hoger het niveau, hoe meer details er belangrijk zijn. Dit zijn kleine verschillen die je zelf vaak niet kunt zien. In onze mountainbike clinics geven wij je tips en tricks om één te zijn met jouw mountainbike en te kunnen mountainbiken in ieder terrein. Je krijgt van ons gerichte aanwijzingen, nuttige feedback en veel persoonlijke aandacht. Ben je op zoek naar een MTB clinic voor beginner, geoefend of gevorderd? Wij bieden mountainbike clinics aan op ieder niveau zodat jij er het meeste uit kunt halen.

                        </p>
                    </div>
                </section>
                <section>
                <ul className='info-blocks'>
                    <li className= 'info-items'>
                    <h4>MTB-Clinics</h4>
                        <img src={clinics} alt="clinics"/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolore est laudantium natus nulla officiis pariatur! Eligendi mollitia quo sapiente.</p>
                    </li>
                        <li className= 'info-items'>
                            <h4>MTB-Routes</h4>
                            <img src={route} alt="mtb-routes"/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur dolores exercitationem hic obcaecati officia porro quia recusandae, veritatis! Atque, natus.</p>
                        </li>
                        <li className= 'info-items'>
                            <h4>MTB-Verhuur</h4>
                            <img src={rental} alt="mtb-rental"/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt qui, veniam? Accusamus adipisci amet doloribus ex nihil porro, reprehenderit tenetur?</p>
                        </li>
                    </ul>
                </section>
            </main>
            <footer className= 'footer'>
                <h4>Contact gegevens</h4>
                <p>adres</p>
                <p>woonplaats</p>
                <p>telefoonnummer</p>
                <p>email</p>

                <nav>
                    <Link to="contact">
                        Contact
                    </Link>
                </nav>
            </footer>
        </>
    );
}

export default Home;