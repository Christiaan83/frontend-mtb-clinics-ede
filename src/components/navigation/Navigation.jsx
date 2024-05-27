import './Navigation.css';
import {NavLink} from "react-router-dom";
import { User } from "@phosphor-icons/react";
import { scrollerHelper } from '../../helpers/scrollerHelper.jsx'


function Navigation() {
    const scrolled = scrollerHelper();

    return (
        // eslint-disable-next-line no-constant-condition
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

            <div className= 'nav-container'>
                <h3><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                             to="/">MTB Clinics-Ede</NavLink></h3>

                <ul>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/mtb-clinics">MTB-clinics</NavLink></li>
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