import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext.jsx";
import getUserRole from "../../../custom_hooks/getUserRole.jsx";
import axios from "axios";
import Header from "../../../components/header/Header.jsx";
import adminPic from "../../../assets/AdminPic.webp";
import ButtonLightGreen from "../../../components/buttons/ButtonLightGreen.jsx";


function UpdateUser() {

    const {username} = useParams();
    const [user, setUser] = useState({});
    const [newUsername, setNewUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [active, setActive] = useState();
    const [authorities, setAuthorities] = useState([]);
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
                const response = await axios.get(`http://localhost:8080/users/${username}`, config);
                setUser(response.data);
                setNewUsername(response.data.username);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setMobileNumber(response.data.mobileNumber);
                setEmail(response.data.email);
                setActive(response.data.active);
                setAuthorities(response.data.authorities);

            } catch (error) {
                console.error('Error fetching mountainbike:', error);
            }
        };
        fetchUser();
    }, [username]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/users/${username}`, {

                username: newUsername,
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                email: email,
                active: active,
                authorities: authorities,

            }, config);

            console.log('User updated successfully');
            navigate('/admin/users');
        } catch (error) {
            console.error('Error updating mountain bike:', error);
            setError(error.response?.data?.message || "An error occurred during update");
        }
    };
    const authoritiesString = user.authorities
        ?.map((auth) => auth.authority.replace("ROLE_", ""))
        .join(", ");

    return (
        <>
            <Header img={adminPic} img_title="bike-wheel" title="Update Geregistreerde Gebruiker"/>
            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Geregistreerde Gebruiker aanpassen</h2>
                    <div className="table-container">
                        {isAuth && userRole === "ADMIN" && user ? (
                            <>
                                <table className="admin-table">
                                    <thead>
                                    <tr>
                                        <th>Naam</th>
                                        <th>Gebruikersnaam</th>
                                        <th>Email</th>
                                        <th>Telefoonnummer</th>
                                        <th>Actief</th>
                                        <th>Gebruikersrollen</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr key={user.username}>

                                        <td>{user.firstName} {user.lastName}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobileNumber}</td>
                                        <td>{user.active ? 'Ja' : 'Nee'}</td>
                                        <td>
                                            {user.authorities?.map((auth, index) => (
                                                <span key={index}>
                                                    {auth.authority.replace("ROLE_", "")}
                                                    {index < user.authorities.length - 1 ? ' en  ' : ''}
                                                </span>
                                            ))}</td>
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
                                                <label htmlFor="newUsername">Gebruikersnaam</label>
                                                <input type="text" id="newUsername" value={newUsername}
                                                       onChange={(e) => setNewUsername(e.target.value)}
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
                                            <div>
                                                <label htmlFor="authorities">
                                                    Gebruikersrollen: {authoritiesString || "Geen rollen toegewezen"}
                                                </label>
                                                <input type="hidden" id="authorities" value={authoritiesString}/>
                                            </div>
                                            <div className="radio-group">
                                                <div>
                                                    <p><u>Actief?</u></p>
                                                    <label htmlFor="active">Ja</label>
                                                    <input
                                                        type="radio"
                                                        id="activeTrue"
                                                        name="active"
                                                        value="true"
                                                        checked={active === 'true'}
                                                        onChange={(e) => setActive(e.target.value)}
                                                    />
                                                    <label htmlFor="active">Nee</label>
                                                    <input
                                                        type="radio"
                                                        id="activeFalse"
                                                        name="active"
                                                        value="false"
                                                        checked={active === 'false'}
                                                        onChange={(e) => setActive(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <ButtonLightGreen
                                                type="submit"
                                                text="Gebruiker Aanpassen"
                                            />

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

export default UpdateUser;