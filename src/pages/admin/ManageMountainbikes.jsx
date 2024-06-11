import adminPic from "../../assets/AdminPic.webp";
import Header from "../../components/header/Header.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../helpers/getUserRole.jsx";


function ManageMountainbikes() {

    const [mountainbikes, setMountainbikes] = useState([]);
    const {isAuth} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const userRole = getUserRole();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        fetchMountainBikes();
    }, []);


    const fetchMountainBikes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/mountainbikes');
            setMountainbikes(response.data);
        } catch (error) {
            console.error('Error fetching mountain bikes:', error);
        }
    };

    const deleteMountainbike = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/mountainbikes/${id}`, config);
            await fetchMountainBikes();
        } catch (error) {
            console.error('Error deleting mountain bike:', error);
        }
    };


    return (
        <>
            <div>
                <Header img={adminPic} img_title="bike-wheel" title="Admin-Mountainbikes"/>
                <div><h1>Mountain Bikes</h1>
                <ul>
                    {isAuth && mountainbikes.map((mtb) => (
                        <li key={mtb.id}>
                            {mtb.name} - {mtb.wheelSize}
                            {isAuth && userRole === "ADMIN" && (
                                <button onClick={() => deleteMountainbike(mtb.id)}>Delete</button>
                            )}
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </>
    );
}

export default ManageMountainbikes;