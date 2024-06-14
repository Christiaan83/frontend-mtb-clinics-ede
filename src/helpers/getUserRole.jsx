import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import getDecodedToken from "./getDecodedToken.jsx";
import {AuthContext} from "../context/AuthContext.jsx";


function getUserRole() {


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isAuth} = useContext(AuthContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [userRole, setUserRole] = useState('');
    const token = localStorage.getItem('token');
    const decodedToken = getDecodedToken(token);
    const config = {
        headers: {
            "Content-Type": "application/json", Authorization: `Bearer ${token}`,
        },
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        async function fetchUserRole() {
            if (decodedToken) {
                try {
                    const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, config);
                    const authorities = response.data.authorities;
                    const isAdmin = authorities.some(auth => auth.authority === "ROLE_ADMIN");
                    setUserRole(isAdmin ? "ADMIN" : null);
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            }
        }

        fetchUserRole();
    }, [isAuth,token]);

    return userRole;
}

export default getUserRole;