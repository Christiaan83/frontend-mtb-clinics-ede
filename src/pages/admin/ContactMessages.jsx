import {useContext, useEffect, useState} from "react";
import './Admin.css'
import axios from "axios";
import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../helpers/getUserRole.jsx";


function ContactMessages() {

    const [contactForms, setContactForms] = useState([]);
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    };


    useEffect(() => {
        getContactForms();
    }, []);

    async function getContactForms() {
        try {
            const response = await axios.get('http://localhost:8080/contact-form', config);
            setContactForms(response.data);

        } catch (error) {
            console.error(error);
            setContactForms([]);
        }
    }


    const deleteForm = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/contact-form/${id}`, config);
            await getContactForms()
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };
    return (
        <>
            <Header img={adminPic} img_title="bike-wheel" title="Website berichten"/>
            <main>
                <section className="outer-content-container">
                    <div className="inner-content-container">
                        <h2>Website-berichten</h2>
                    </div>
                </section>
                <section className="blocks-section">
                    <div className="blocks">
                        {isAuth && userRole === 'ADMIN' ? (
                            contactForms.length > 0 ? (
                                contactForms.map(form => (

                                    <ul className="blocks-info form-info" key={form.id}>
                                        <li>
                                            <div>
                                                <p><strong>Naam</strong></p>
                                                <h4>{form.firstName} {form.lastName}</h4>
                                                <p><strong>E-mail</strong></p>
                                                <p>{form.email}</p>
                                                <p><strong>Telefoonnummer</strong></p>
                                                <p>0{form.mobileNumber}</p>
                                                <br/>
                                                <p><strong>Bericht</strong></p>
                                                <p>{form.message}</p>
                                            </div>
                                            <br/>
                                            <div>
                                                <button onClick={() => deleteForm(form.id)}>
                                                    Bericht verwijderen
                                                </button>
                                            </div>
                                            <p></p>
                                        </li>
                                    </ul>
                                ))
                            ) : (
                                <p>Geen berichten gevonden.</p>
                            )
                        ) : (
                            <p>U bent niet bevoegd om deze pagina te bekijken.</p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

export default ContactMessages;