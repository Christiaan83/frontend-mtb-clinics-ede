import {createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import  {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import {checkTokenValidity} from "../helpers/checkTokenValidity.js";

export const AuthContext = createContext( {} );

// eslint-disable-next-line react/prop-types
function AuthContextProvider({children}) {
  const [ isAuth, toggleIsAuth ] = useState( {
    isAuth: false,
    user: null,
    status: 'pending',
  } );
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && checkTokenValidity(storedToken)) {
      try {
        jwtDecode(storedToken);
        void loginWithToken(storedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        void logout();
      }
    } else {
      void logout();
    }
  }, []);

  const loginWithToken = async (jwtToken) => {
    try {
      const decodedToken = jwtDecode(jwtToken);
      localStorage.setItem("token", jwtToken);
      const response = await axios.get(
          `http://localhost:8080/users/${decodedToken.sub}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          },
      );
      toggleIsAuth({
        isAuth: true,
        user: {
          username: response.data.username,
          email: response.data.email,
          id: response.data.sub,
        },
        status: "done",
      });
      console.log("De gebruiker is ingelogd 🔓");
    } catch (error) {
      console.error('Error during login process:', error);
      void logout();
    }
  };


  const login = async (jwtToken) => {
    if (!jwtToken || typeof jwtToken !== 'string') {
      console.error('Invalid token passed to login:', jwtToken);
      return;
    }
    try {
      await loginWithToken(jwtToken);

    } catch (error) {
      console.error(error);
    }
  };


  const logout = () => {
    toggleIsAuth({
      isAuth: false,
      user: null,
      status: "done",
    });
    localStorage.removeItem("token");
    console.log("De gebruiker is uitgelogd 🔒");
    navigate("/", { state: { fromLogout: true } });
  };

  const data = {
    isAuth: isAuth.isAuth,
    user: isAuth.user,
    logout,
    login,
  };
  return (
      <AuthContext.Provider value={data}>
        {isAuth.status === "done" ? children : <p>Loading...</p>}
      </AuthContext.Provider>
  );
}


export default AuthContextProvider;