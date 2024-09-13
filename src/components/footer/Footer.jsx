import {Link} from "react-router-dom";
import './Footer.css'
import Button from "../buttons/Button.jsx";

function Footer() {
    return (
        <footer className="footer">
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
                    <h3><Link to="/">MTB Clinics-Ede</Link></h3>
                </div>

                <div>
                    <Link to="/contact">
                        <Button
                            type="submit"
                            className='button-light'
                            text="Contact"
                        />
                    </Link>

                </div>
            </section>
        </footer>
    );
}

export default Footer;