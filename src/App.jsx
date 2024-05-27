
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


function App() {

  return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mtb-clinics" element={<MtbClinics/>} />
            <Route path="/mtb-routes" element={<MtbRoutes/>} />
            <Route path="/mtb-routes/:id" element={<RouteDetails/>} />
            <Route path="/mtb-verhuur" element={<RentalPage/>}/>
            <Route path="/mtb-verhuur/:id" element={<BookRentalPage/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;