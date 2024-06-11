
import './App.css'
import {Navigate, Route, Routes,} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx";
import MtbRoutes from "./pages/mtbRoutes/MtbRoutes.jsx";
import RouteDetails from "./pages/routeDetails/RouteDetails.jsx";
import RentalPage from "./pages/mtbRental/RentalPage.jsx"
import BookRentalPage from "./pages/bookRental/BookRentalPage.jsx";
import MtbClinics from "./pages/mtbClinics/MtbClinics.jsx";
import BookClinicPage from "./pages/bookClinic/BookClinicPage.jsx";
import Users from "./pages/Users/Users.jsx";
import Register from "./pages/Users/Register.jsx";
import getUserRole from "./helpers/getUserRole.jsx";
import ManageRoutes from "./pages/admin/ManageRoutes.jsx";
import ManageMountainbikes from "./pages/admin/ManageMountainbikes.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageReservations from "./pages/admin/ManageReservations.jsx";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import UpdateMtb from "./pages/admin/update/UpdateMtb.jsx";
import NewMtb from "./pages/admin/new/NewMtb.jsx";



function App() {

    const {isAuth} = useContext(AuthContext);
    const userRole = getUserRole();
    const adminLinks = [
        { path: "/admin/mountainbikes", element: (<ManageMountainbikes/>)},
        { path: "/admin/routes", element: (<ManageRoutes/>)},
        { path: "/admin/users", element: (<ManageUsers/>)},
        { path: "/admin/reservations", element: (<ManageReservations/>)},
        { path: "/admin/mountainbikes/toevoegen", element: (<NewMtb/>)},
        { path: `/admin/mountainbikes/update/:id`, element: (<UpdateMtb/>)},
    ];


    return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mtb-clinics" element={<MtbClinics/>} />
            <Route path="/mtb-clinics/:id" element={<BookClinicPage/>} />
            <Route path="/mtb-routes" element={<MtbRoutes/>} />
            <Route path="/mtb-routes/:id" element={<RouteDetails/>} />
            <Route path="/mtb-verhuur" element={<RentalPage/>}/>
            <Route path="/mtb-verhuur/:id" element={<BookRentalPage/>}/>
            <Route path="/mijnpagina" element={<Users/>}/>
            <Route path="/registreer" element={<Register/>}/>


            {isAuth && userRole === 'ADMIN' &&(
                <>
                    {userRole === "ADMIN" && adminLinks.map(link => (
                        <Route key={link.path} path={link.path} element={link.element} />
                    ))}

                    <Route path="/admin/*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
        <Footer/>
    </>
  );
}

export default App;