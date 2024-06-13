import adminPic from "../../../assets/AdminPic.webp";
import Header from "../../../components/header/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import getUserRole from "../../../helpers/getUserRole.jsx";
import axios from "axios";


function UpdateUserMtb() {

    const {id} = useParams();
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const {isAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/unregistered-users/${id}`, config);

                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setMobileNumber(response.data.mobileNumber);
                setEmail(response.data.email);

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/unregistered-users/${id}`, {


                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                email: email,


            }, config);

            console.log('User updated successfully');
            navigate('/admin/users');
        } catch (error) {
            console.error('Error updating mountain bike:', error);
            setError(error.response?.data?.message || "An error occurred during update");
        }
    };

    return (
        <>
            <Header img={adminPic} img_title="bike-wheel" title="Update Geregistreerde Gebruiker"/>
            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Ongeregistreerde Gebruiker aanpassen</h2>
                    <div className="table-container">
                        {isAuth && userRole === "ADMIN" && user ? (
                            <>
                                <table className="admin-table">
                                    <thead>
                                    <tr>
                                        <th>Naam</th>
                                        <th>Email</th>
                                        <th>Telefoonnummer</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr key={user.id}>

                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>0{user.mobileNumber}</td>
                                    </tr>
                                    </tbody>
                                </table>

                                <section className="admin-container">
                                    {isAuth && userRole === 'ADMIN' && (
                                        <form onSubmit={updateUser} className="admin-form">
                                            <h4>Vul onderstaande velden in </h4>
                                            <div>
                                                <label htmlFor="firstName">Voornaam:</label>
                                                <input type="text" id="firstName" value={firstName}
                                                       onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lastName">Achternaam</label>
                                                <input type="text" id="lastName" value={lastName}
                                                       onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <input type="email" id="email" value={email}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="mobileNumber">Telefoonnummer</label>
                                                <input type="number" id="mobileNumber" value={mobileNumber}
                                                       onChange={(e) => setMobileNumber(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit">Gebruiker Aanpassen</button>
                                            {error && <p className="error-message">{error}</p>}
                                        </form>
                                    )}
                                </section>
                            </>
                        ) : (
                            <p>Mountainbike wordt geladen...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default UpdateUserMtb;