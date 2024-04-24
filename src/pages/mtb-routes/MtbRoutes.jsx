import {Helmet} from "react-helmet";
import mtbRoute from "../../assets/mtbRoute.jpg";
import mtbSymbol from "../../assets/mtb-teken-groen.jpg"
import Header from "../../components/header/Header.jsx";
import './MtbRoutes.css'

function MtbRoutes() {

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
                            <img className= "route-img" src={mtbSymbol} alt="MTB-symbool"/>
                            <p>Kom crossen over singletracks door bossen en heidevelden, tackle een uitdagende MTB-route
                                of geniet van één van de mooiste MTB-routes van Nederland! Ben je op zoek naar een
                                MTB-route voor beginners of ben je juist toe aan een uitdagende track? Kies hier de
                                route die
                                het beste bij je past.</p>
                        </div>
                    </div>

                </section>
            </main>
        </>
    )
}

export default MtbRoutes;