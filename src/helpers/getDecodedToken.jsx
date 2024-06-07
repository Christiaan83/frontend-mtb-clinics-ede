import {jwtDecode} from "jwt-decode";

function getDecodedToken(isAuth) {
    const token = localStorage.getItem('token');

    if (isAuth && token && token.split('.').length === 3) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem('token');
        }
    }
    return null;
}

export default getDecodedToken;
