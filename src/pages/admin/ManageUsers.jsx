import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../custom_hooks/getUserRole.jsx";
import axios from "axios";
import {Helmet} from "react-helmet";
import ButtonLightGreen from "../../components/buttons/ButtonLightGreen.jsx";

function ManageUsers() {

    const [registeredUser, setRegisteredUser] = useState([]);
    const [unRegisteredUser, setUnRegisteredUser] = useState([]);
    const [error, setError] = useState(false);
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetchUsers()
    }, []);


    const fetchUsers = async () => {
        try {
            const unregisteredResponse = await axios.get('http://localhost:8080/unregistered-users', config);
            setUnRegisteredUser(unregisteredResponse.data);

            const registeredResponse = await axios.get('http://localhost:8080/users', config);
            setRegisteredUser(registeredResponse.data);


        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUnregisteredUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/unregistered-users/${id}`, config);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting unregistered user:', error);
            setError(true);
        }
    };

    const deleteRegisteredUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`, config);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting unregistered user:', error);
            setError(true);
        }
    };

    return (
        <>
            <div>
                <Helmet>
                    <title>MTB Clinics-Ede | Admin</title>
                </Helmet>
            </div>
            <Header img={adminPic} img_title="bike-wheel" title="Admin-gebruikers"/>

            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Gebruikers</h2>

                    <div className="table-container">
                        {error && (
                            <p className="text-danger">
                                Aub eerst de reservering van de gebruiker verwijderen voordat u verder kunt gaan.
                            </p>
                        )}
                        {isAuth && userRole === "ADMIN" && (registeredUser.length > 0 || unRegisteredUser.length > 0) ? (
                            <>
                                {unRegisteredUser.length > 0 && (
                                    <div>
                                        <h4>Gebruikers voor verhuur MTB</h4>
                                        <table className="admin-table">
                                            <thead>
                                            <tr>
                                                <th>Naam</th>
                                                <th>Email</th>
                                                <th>Telefoonnummer</th>
                                                <th>Aanpassen</th>
                                                <th>Verwijderen</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {unRegisteredUser.map((user) => (
                                                <tr key={user.id}>

                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.mobileNumber}</td>
                                                    <td>
                                                        <Link to={`/admin/users/update/${user.id}`}>
                                                            <ButtonLightGreen
                                                                type="submit"
                                                                text="Update gebruiker"
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <ButtonLightGreen onClick={() => deleteUnregisteredUser(user.id)}
                                                        text="Verwijderen"
                                                        />

                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {registeredUser.length > 0 && (
                                    <div>
                                        <br/>
                                        <h4>Geregistreerde gebruikers</h4>
                                        <table className="admin-table">
                                            <thead>
                                            <tr>
                                                <th>Naam</th>
                                                <th>Gebruikersnaam</th>
                                                <th>Email</th>
                                                <th>Telefoonnummer</th>
                                                <th>Actief</th>
                                                <th>Gebruikersrollen</th>
                                                <th>Aanpassen</th>
                                                <th>Verwijderen</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {registeredUser.map((userUser) => (
                                                <tr key={userUser.username}>
                                                    <td>{userUser.firstName} {userUser.lastName}</td>
                                                    <td>{userUser.username}</td>
                                                    <td>{userUser.email}</td>
                                                    <td>{userUser.mobileNumber}</td>
                                                    <td>{userUser.active ? 'Ja' : 'Nee'}</td>
                                                    <td> {userUser.authorities?.map((auth, index) => (
                                                        <span key={index}>
                                                    {auth.authority.replace("ROLE_", "")}
                                                            {index < userUser.authorities.length - 1 ? ' en  ' : ''}
                                                </span>
                                                    ))}</td>
                                                    <td>
                                                        <Link to={`/admin/users/updates/${userUser.username}`}>
                                                            <ButtonLightGreen
                                                                type="submit"
                                                                text="Update gebruiker"
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <ButtonLightGreen
                                                            onClick={() => deleteRegisteredUser(userUser.username)}
                                                        text="Verwijderen"/>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p>Geen gebruikers gevonden, probeer het opnieuw!</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ManageUsers;