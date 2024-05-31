import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext( {} );

// eslint-disable-next-line react/prop-types
function AuthContextProvider( { children } ) {
  const [ isAuth, toggleIsAuth ] = useState( {
    isAuth: false,
    user: null,
    status: 'pending',
  } );
  const navigate = useNavigate();

  useEffect( () => {
    const token = localStorage.getItem( 'token' );

    if ( token ) {
      const decoded = jwtDecode( token );
      void fetchUserData( decoded.sub, token );
    } else {
      toggleIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }, [] );

  function login( JWT ) {
    localStorage.setItem( 'token', JWT );
    const decoded = jwtDecode( JWT );
    void fetchUserData( decoded.sub, JWT, '/profile' );
    // link de gebruiker door naar de profielpagina
    // navigate('/profile');
  }

  function logout() {
    localStorage.clear();
    toggleIsAuth( {
      isAuth: false,
      user: null,
      status: 'done',
    } );

    console.log( 'Gebruiker is uitgelogd!' );
    navigate( '/' );
  }

  // Omdat we deze functie in login- en het mounting-effect gebruiken, staat hij hier gedeclareerd!
  async function fetchUserData( id, token, redirectUrl ) {
    try {
      // haal gebruikersdata op met de token en id van de gebruiker
      const result = await axios.get( `http://localhost:3000/600/users/${ id }`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ token }`,
        },
      } );

      // zet de gegevens in de state
      toggleIsAuth( {
        ...isAuth,
        isAuth: true,
        user: {
          username: result.data.username,
          email: result.data.email,
          id: result.data.id,
        },
        status: 'done',
      } );

      // als er een redirect URL is meegegeven (bij het mount-effect doen we dit niet) linken we hiernnaartoe door
      // als we de history.push in de login-functie zouden zetten, linken we al door voor de gebuiker is opgehaald!
      if ( redirectUrl ) {
        navigate( redirectUrl );
      }

    } catch ( e ) {
      console.error( e );
      // ging er iets mis? Plaatsen we geen data in de state
      toggleIsAuth( {
        isAuth: false,
        user: null,
        status: 'done',
      } );
    }
  }

  const contextData = {
    ...isAuth,
    login,
    logout
  };

  return (
      <AuthContext.Provider value={ contextData }>
        { isAuth.status === 'done' ? children : <p>Loading...</p> }
      </AuthContext.Provider>
  );
}

export default AuthContextProvider;