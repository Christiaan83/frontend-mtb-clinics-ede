import'../Admin.css'
import {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import getUserRole from "../../../helpers/getUserRole.jsx";
import axios from "axios";
import clinicHeader from "../../../assets/Mountainbike-trainings.png";
import Header from "../../../components/header/Header.jsx";
import {useNavigate} from "react-router-dom";


function NewMtb() {

    const [name, setName] = useState('');
    const [wheelSize, setWheelSize] = useState('');
    const [frameSize, setFrameSize] = useState('');
    const [gears, setGears] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [error, toggleError] = useState('');
    const [forAdult, setForAdult] = useState('');
    const [fullSuspension, setFullSuspension] = useState('');
    const [available, setAvailable] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const navigate = useNavigate();
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError('');

        if (userRole !== "ADMIN") {
            toggleError("Only admins can add mountain bikes.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/mountainbikes', {
                name: name,
                wheelSize: wheelSize,
                frameSize: frameSize,
                gears: gears,
                amount: amount,
                pricePerDayPart: price,
                forAdult: forAdult,
                fullSuspension: fullSuspension,
                available: available,
            }, config)
            const mountainbikeId = response.data.id;
            console.log("New mountain bike added:", response.data);


            if (imageFile) {
                const imageFormData = new FormData();
                imageFormData.append("file", imageFile);

                try {
                    const imageResponse = await axios.post(
                        `http://localhost:8080/mountainbikes/${mountainbikeId}/picture`,
                        imageFormData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log("Image uploaded:", imageResponse.data);
                } catch (err) {
                    console.error("Error uploading image:", err);
                    toggleError(err.response?.data?.message || "An error occurred during image upload");
                    return;
                }
            }
            navigate('/admin/mountainbikes');

        } catch (err) {
            console.error("Can not add new mountainbike:", err);
            toggleError(error.response?.data?.message || "An error occurred");
        }
    }

    const wheelSizes = ["20 inch", "24 inch", "26 inch", "28 inch", "29 inch"]; // Example wheel sizes
    const frameSizes = ["small", "medium", "large", "extra-large"];
    const gearOptions = [8, 9, 10, 11, 12];

    return (
        <>
            <Header img={clinicHeader} img_title="mtb-training" title="Nieuwe MTB Toevoegen"/>

            <section className="admin-container">

                {isAuth && userRole === 'ADMIN' && (
                    <form onSubmit={handleSubmit} className="admin-form">
                        <h4>Vul onderstaande velden in en selecteer de juiste optie.</h4>
                        <div>
                            <label htmlFor="name">MTB-naam:</label>
                            <input type="text" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   required
                            />
                        </div>

                        <div>
                            <label htmlFor="wheelSize">Wielmaat:</label>
                            <select
                                id="wheelSize"
                                value={wheelSize}
                                onChange={(e) => setWheelSize(e.target.value)}
                                required
                            >
                                <option value="">Selecteer wielmaat</option>
                                {wheelSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size} inch
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="frameSize">Framemaat:</label>
                            <select
                                id="frameSize"
                                value={frameSize}
                                onChange={(e) => setFrameSize(e.target.value)}
                                required
                            >
                                <option value="">Selecteer framemaat</option>
                                {frameSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gears">Versnellingen:</label>
                            <select
                                id="gears"
                                value={gears}
                                onChange={(e) => setGears(e.target.value)}
                                required
                            >
                                <option value="">Selecteer aantal versnellingen</option>
                                {gearOptions.map((gear) => (
                                    <option key={gear} value={gear}>
                                        {gear}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount">Aantal:</label>
                            <input type="number" id="amount" value={amount}
                                   onChange={(e) => setAmount(e.target.value)}
                                   required
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Prijs</label>
                            <input type="number" id="price" value={price}
                                   onChange={(e) => setPrice(e.target.value)}
                                   required/>
                        </div>
                        <div className="radio-group">
                        <div>
                            <p><u>Volwassenen of Kind?</u></p>
                            <label htmlFor="forAdult">Volwassenen</label>
                            <input
                                type="radio"
                                id="forAdultTrue"
                                name="forAdult"
                                value="true"
                                checked={forAdult === 'true'}
                                onChange={(e) => setForAdult(e.target.value)}
                                required
                            />
                            <label htmlFor="forAdult">Kind</label>
                            <input
                                type="radio"
                                id="forAdultFalse"
                                name="forAdult"
                                value="false"
                                checked={forAdult === 'false'}
                                onChange={(e) => setForAdult(e.target.value)}
                                required
                            />
                        </div>
                        <div className="radio-group">
                            <p><u>Volledig geveerd?</u></p>
                            <label htmlFor="fullSuspension">Ja</label>
                            <input
                                type="radio"
                                id="fullSuspensionTrue"
                                name="fullSuspension"
                                value="true"
                                checked={fullSuspension === 'true'}
                                onChange={(e) => setFullSuspension(e.target.value)}
                                required
                            />
                            <label htmlFor="fullSuspension">Nee</label>
                            <input
                                type="radio"
                                id="fullSuspensionFalse"
                                name="fullSuspension"
                                value="false"
                                checked={fullSuspension === 'false'}
                                onChange={(e) => setFullSuspension(e.target.value)}
                                required
                            />
                        </div>
                        <div className="radio-group">
                            <p><u>Beschikbaar voor verhuur?</u></p>
                            <label htmlFor="available">Ja</label>
                            <input
                                type="radio"
                                id="availableTrue"
                                name="available"
                                value="true"
                                checked={available === 'true'}
                                onChange={(e) => setAvailable(e.target.value)}
                                required
                            />
                            <label htmlFor="available">Nee</label>
                            <input
                                type="radio"
                                id="availableFalse"
                                name="available"
                                value="false"
                                checked={available === 'false'}
                                onChange={(e) => setAvailable(e.target.value)}
                                required
                            />
                        </div>
                        </div>
                        <div>
                            <input type="file" onChange={(e) => setImageFile(e.target.files[0])}
                                   required/>
                        </div>
                        <button type="submit">Mountainbike Toevoegen</button>
                    </form>
                )}
            </section>
        </>
    );
}

export default NewMtb;