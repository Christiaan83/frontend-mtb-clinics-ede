import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, toggleError] = useState(false);
  const [success, setSuccess] = useState(false);

  // const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    toggleError(false);

    try {
      const result = await axios.post('http://localhost:8080/authenticate', {
        username: username,
        password: password,
      });
      console.log(result.data);
      // login(result.data.accessToken);

      setSuccess(true);

    } catch(e) {
      console.error(e);
      toggleError(true);
    }
  }

  return (
      <>
        <h1>Inloggen</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Gebruikersnaam:
            <input
                type="username"
                id="username-field"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label htmlFor="password-field">
            Wachtwoord:
            <input
                type="password"
                id="password-field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="error">Combinatie van emailadres en wachtwoord is onjuist</p>}
          {success && <p className="success"> succesvol ingelogd!</p>}

          <button
              type="submit"
              className="form-button"
          >
            Inloggen
          </button>
        </form>

        <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
      </>
  );
}

export default SignIn;