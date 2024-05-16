import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import mtbRental from "../../assets/verhuur2.jpg";
import Header from "../../components/header/Header.jsx";
import frameSizeDutch from "../../helpers/mountianbikes/frameSizeDutch.jsx";
import adultOrChild from "../../helpers/mountianbikes/adultOrChild.jsx";
import MtbPicture from "../../components/pictures/MtbPicture.jsx";
import RegisterUserForm from "../../components/usersAndRentals/addUser.jsx";
import RentalForm from "../../components/usersAndRentals/RentalForm.jsx";

function BookRentalPage() {

    const [mountainbike, setMountainbike] = useState(null);
    const {id} = useParams();
    const [error, toggleError] = useState(null);
    const [rentalId, setRentalId] = useState(null);


    useEffect(() => {
        toggleError(null);

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

    const handleRentalCreated = (rentalId) => {
        setRentalId(rentalId);
    };


    return(
        <main>
            {mountainbike ? (
                <div>
                    <Header img={mtbRental} img_title="bike-wheel" title="MTB-Verhuur"/>
                    <section>
                        <h2>{mountainbike.name}</h2>
                        <MtbPicture mountainbike={mountainbike}/>
                        <p>Wielgrootte: {mountainbike.wheelSize}</p>
                        <p>Frame maat: {frameSizeDutch(mountainbike.frameSize)}</p>
                        <p>Versnellingen: {mountainbike.gears}</p>
                        <p>Prijs per dag: € {mountainbike.pricePerDayPart},-</p>
                        <p>Type: {adultOrChild(mountainbike.forAdult)}</p>
                    </section>
                    <section>
                        <RegisterUserForm />
                        <RentalForm />
                    </section>

                </div>
            ) : (
                <p>{error}</p>
            )}
        </main>
    )
}

export default BookRentalPage;