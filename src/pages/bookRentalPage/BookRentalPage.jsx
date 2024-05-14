import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import mtbRental from "../../assets/verhuur2.jpg";
import Header from "../../components/header/Header.jsx";

function BookRentalPage() {

    const [mountainbike, setMountainbike] = useState(null);
    const{id} = useParams();
    const [error, toggleError] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");


    useEffect(() => {
        toggleError(true);

        async function getMtbDetails() {
            try {
                const response = await axios.get(`http://localhost:8080/mountainbikes/${id}`);
                console.log(response.data);
                setMountainbike(response.data);
            } catch (err) {
                console.error(err);
                toggleError(true);
            }
        }

        getMtbDetails();
    }, [id]);

    async function handleUser(e) {
        e.preventDefault();
        toggleError(false);

        try{
            await axios.post(`http://localhost:8080/unregistered-users`, {
                firstName,
                lastName,
                email,
                mobileNumber,
            });
        }catch(err){
            console.error(err);
        }
    }

    // async function handleRental(e) {
    //     e.preventDefault();
    //     toggleError(false)
    // }

    return(
        <main>
            {mountainbike ? (
            <div>
                <Header img={mtbRental} img_title="bike-wheel" title="MTB-Verhuur"/>
                <section>
                    <label htmlFor="firstname">Voornaam</label>
                    <input
                        id="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        placeholder="Voornaam"
                        required
                    />
                    <label htmlFor="lastName">Achternaam</label>
                    <input
                        id="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder="Achternaam"
                        required
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="naam@email.com"
                        required
                    />
                    <label htmlFor="mobileNumber">Mobiele nummer</label>
                    <input
                        id="mobileNumber"
                        onChange={(e) => setMobileNumber(e.target.value)}
                        type="tel"
                        placeholder="0612345678"
                        required
                    />
                    <div>
                        <button onClick={handleUser}>Toevoegen</button>
                    </div>
                </section>
            </div>
            ) : (
                <p>{error}</p>
            )}
        </main>
    )
}

export default BookRentalPage;