import './Navigation.css';
import {NavLink} from "react-router-dom";
import { User } from "@phosphor-icons/react";
import { scrollerHelper } from '../../helpers/scrollerHelper.jsx'
import {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import getUserRole from "../../helpers/getUserRole.jsx";


function Navigation() {

    const scrolled = scrollerHelper();
    const {isAuth} = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAuth]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const userRole = getUserRole();

    const adminLinks = [
        { label: "MTB's beheren", to: "/admin/mountainbikes" },
        { label: "Routes beheren", to: "/admin/routes" },
        { label: "Reserveringen beheren", to: "admin/reservations"},
        { label: "Gebruikers beheren", to: "/admin/users" },
        { label: "Website berichten", to: "/admin/contact-form" },
    ];

    return (
        // eslint-disable-next-line no-constant-condition
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

            <div className= 'nav-container'>
                <h3><NavLink
                             to="/">MTB Clinics-Ede</NavLink></h3>

                <ul>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/">Home</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/mtb-clinics">MTB-clinics</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/mtb-routes">MTB-routes</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                 to="/mtb-verhuur">MTB-Verhuur</NavLink></li>

                    {isAuth && userRole === 'ADMIN' && (
                        <li className="dropdown-container" ref={dropdownRef}>
                            {/* Main Admin Dashboard link */}
                            <NavLink
                                className={`default-menu-link ${isDropdownOpen ? 'active-menu-link' : ''}`}
                                to="#"
                                onClick={toggleDropdown}
                            >
                                Admin Dashboard &#9662;
                            </NavLink>

                            {isDropdownOpen && (
                                <ul className="dropdown-menu">
                                    {adminLinks.map(link => (
                                        <li key={link.to}>
                                            <NavLink
                                                to={link.to}
                                                className={({isActive}) => isActive ? "active-menu-link" : "default-menu-link"}
                                                onClick={toggleDropdown}
                                            >
                                                {link.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )}
                    <li><NavLink
                        className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                        to="/mijnpagina"><User size={28}/></NavLink></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;