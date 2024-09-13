
import './App.css'
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
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
import getUserRole from "./custom_hooks/getUserRole.jsx";
import ManageRoutes from "./pages/admin/ManageRoutes.jsx";
import ManageMountainbikes from "./pages/admin/ManageMountainbikes.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageReservations from "./pages/admin/ManageReservations.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import UpdateMtb from "./pages/admin/update/UpdateMtb.jsx";
import NewMtb from "./pages/admin/new/NewMtb.jsx";
import NewRoute from "./pages/admin/new/NewRoute.jsx";
import UpdateRoute from "./pages/admin/update/UpdateRoute.jsx";
import UpdateUserMtb from "./pages/admin/update/UpdateUserMTB.jsx";
import UpdateUser from "./pages/admin/update/updateUser.jsx";
import ContactForm from "./pages/contactForm/ContactForm.jsx";
import ContactMessages from "./pages/admin/ContactMessages.jsx"



function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const {isAuth} = useContext(AuthContext);
    const userRole = getUserRole();
    const adminLinks = [
        { path: "/admin/mountainbikes", element: (<ManageMountainbikes/>)},
        { path: "/admin/routes", element: (<ManageRoutes/>)},
        { path: "/admin/users", element: (<ManageUsers/>)},
        { path: "/admin/reservations", element: (<ManageReservations/>)},
        { path: "/admin/mountainbikes/toevoegen", element: (<NewMtb/>)},
        { path: `/admin/mountainbikes/update/:id`, element: (<UpdateMtb/>)},
        { path: `/admin/routes/toevoegen`, element: (<NewRoute/>)},
        { path: `/admin/routes/update/:id`, element: (<UpdateRoute/>)},
        { path: `/admin/reservations`, element: (<ManageReservations/>)},
        { path: `/admin/users/update/:id`, element: (<UpdateUserMtb/>)},
        { path: `/admin/users/updates/:username`, element: (<UpdateUser/>)},
        { path: `/admin/contact-form`, element: (<ContactMessages/>)},

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
            <Route path="/contact" element={<ContactForm/>}/>


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