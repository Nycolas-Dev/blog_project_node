import Navbar from "../../components/Navigation.jsx";
import React, { useState, useEffect } from "react";
import { getPost } from "../../services/postRequest";
import CardComponent from "../../components/CardComponent.jsx";

const Favorites = () => {

  const favoritedPosts = JSON.parse(localStorage.getItem('favoritedPosts')) || [];
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Pour chaque ID de post dans le local storage des favoris
    Promise.all(favoritedPosts.map(id => getPost(id)))
      .then(posts => {
        // Stocke les détails du post dans un tableau
        setFilteredPosts(posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  


  return (
    <div id="favorites">
      <Navbar />
      <h1>Favorites</h1>
        {filteredPosts.length > 0 ? (
          <div id="display-card">
            {filteredPosts.map((post) => (
              post ? (
                <CardComponent post={post} key={post._id} page={"favorites"}/>
              ) : (
                ""
              )
            ))}
          </div>
        ) : (
          <p>Aucun post favori trouvé</p>
        )}
    </div>
  );
};

export default Favorites;
