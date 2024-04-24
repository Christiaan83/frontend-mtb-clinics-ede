
import './App.css'
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation/Navigation.jsx";
import Home from "./pages/home/Home.jsx";
import Footer from "./components/footer/Footer.jsx";
import MtbRoutes from "./pages/mtb-routes/MtbRoutes.jsx";


function App() {

  return (
    <>
        <Navigation/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/mtb-routes" element={<MtbRoutes/>} />
        </Routes>
        <Footer/>
    </>
  );
}

export default App;