import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userRequest";
import "./navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  // Use AuthContext to logout
  const handleClick = () => {
    //Supprime le cookie en lui passant une date d'expiration passée
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    window.location.reload(); //reload pour mettre à jour le cookie de connexion
  };

  // Navigate to modify form
  const handleCreate = () => {
    navigate("/register");
  };

  return (
    <div id="navigation">
      <div>
        <Link
          to="/"
        >
          Accueil
        </Link>
      </div>
      {user ? (
        <div id="nav-display">
          {/* <Link to="/user/update">
            <img
              src={user.photo}
              alt=""
            />
          </Link> */}
          <div>
            <Link
              to="/user/update"
            >
              Modifier son profil
            </Link>
          </div>
          <div>
            <Link
              to="/post/create"
            >
              Créer un article
            </Link>
          </div>
          <div>
            <Link
              to="/favorites"
            >
              Mes favoris
            </Link>
          </div>
          {user.isAdmin && (
            <div>
              <Link
                to="/register"
                onClick={handleCreate}
              >
                Ajouter un utilisateur
              </Link>
            </div>
          )}
          <div>
            <Link
              onClick={handleClick}
            >
              Déconnexion
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link
            to="/login"
          >
            Connexion
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
