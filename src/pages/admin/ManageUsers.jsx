import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../helpers/getUserRole.jsx";
import axios from "axios";

function ManageUsers() {

    const [registeredUser, setRegisteredUser] = useState([]);
    const [unRegisteredUser, setUnRegisteredUser] = useState([]);
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
            console.log(registeredResponse.data);
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
        }
    };

    const deleteRegisteredUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/users/${id}`, config);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting unregistered user:', error);
        }
    };

    return (
        <>
            <Header img={adminPic} img_title="bike-wheel" title="Admin-gebruikers"/>

            <section className="admin-container">
                <div className="table-content">
                    <h2 className="table-title">Gebruikers</h2>

                    <div className="table-container">
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
                                                        <button type="submit"><Link
                                                            to={`/admin/users/update/${user.id}`}>Update
                                                            Gebruiker</Link>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => deleteUnregisteredUser(user.id)}>
                                                            Verwijderen
                                                        </button>
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
                                                        <button type="submit"><Link
                                                            to={`/admin/users/updates/${userUser.username}`}>Update
                                                            Gebruiker</Link>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => deleteRegisteredUser(userUser.username)}>Verwijderen
                                                        </button>
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