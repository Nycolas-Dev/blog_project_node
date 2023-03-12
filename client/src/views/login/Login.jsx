import { useContext, useState } from "react";
import Navbar from "../../components/Navigation.jsx";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", credentials, { withCredentials: true });
      window.location.reload(); //reload pour mettre à jour le cookie de connexion
    } catch (err) {
      console.log('erreur', err.response)
    }
  };

  return (
<div>
  <Navbar />
  <div>
    <h1>Sign in</h1>
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="email">Email Address:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        onChange={handleChange}
      />

     {/* {error && <span style={{ color: "red" }}>{error.message}</span>} */}
      
      <button
        type="submit"
        // disabled={loading}
      >
        Sign In
      </button>
      <Link
        to="/register"
      >
        <button
        type="submit"
        // disabled={loading}
      >
        Register
      </button> 
      </Link>

    </form>
  </div>
</div>
  );
}