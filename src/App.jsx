
import './App.css'
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx";
import MtbRoutes from "./pages/mtbRoutes/MtbRoutes.jsx";
import RouteDetails from "./pages/routeDetails/RouteDetails.jsx";
import RentalPage from "./pages/mtbRental/RentalPage.jsx"
import BookRentalPage from "./pages/bookRental/BookRentalPage.jsx";
import MtbClinics from "./pages/mtbClinics/MtbClinics.jsx";
import BookClinicPage from "./pages/BookClinic/BookClinicPage.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import Users from "./pages/Users/Users.jsx";


function App() {

    const {isAuth, user } = useContext(AuthContext);

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
            <Route path="/mijnpagina" element={<Users />}/>


            {/*{isAuth && user?.authority === 'admin' && (*/}
            {/*    <>*/}
            {/*        <Route path="/admin/dashboard" element={<AdminDashboard />} />*/}
            {/*        <Route path="/admin/mountainbikes" element={<ManageMountainbikes />} />*/}
            {/*        <Route path="/admin/routes" element={<ManageRoutes/>} />*/}
            {/*        <Route path="/admin/routes" element={<ManageUsers/>} />*/}
            {/*        <Route path="/admin/bookings" element={<ManageBookings/>} />*/}
            {/*    </>*/}
            {/*)}*/}
        </Routes>
        <Footer/>
    </>
  );
}

export default App;