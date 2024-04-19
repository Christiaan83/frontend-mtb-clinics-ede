import './Navigation.css';
import {NavLink} from "react-router-dom";
import { User } from "@phosphor-icons/react";


function Navigation() {
    return (
        <nav>
            <div className="nav-container">
                <h4><NavLink to="/">MTB Clinics-Ede</NavLink></h4>

                <ul>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/">Home</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/clinics">Clinics</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/mtb-routes">MTB-routes</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/mtb-verhuur">MTB-Verhuur</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/inloggen"><User size={28} /></NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;