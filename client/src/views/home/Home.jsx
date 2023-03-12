import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navigation.jsx";
import CardComponent from "../../components/CardComponent.jsx";
import { getAllPosts } from "../../services/postRequest";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const posts = await getAllPosts();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  if(posts == null){
    return "Loading"
  }

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };
  
  const updateLike = (id) => {
    // Vérifie si l'utilisateur a déjà aimé ce post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(id)) {
      // Empêche l'utilisateur d'aimer le post à nouveau
      return;
    }
  
    // Ajoute le post aux posts aimés de l'utilisateur
    likedPosts.push(id);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  
    // Met à jour le compteur de likes
    const updatedPosts = posts.map((post) => {
      if (post._id === id) {
        return { ...post, likeCount: post.likeCount ++ };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortedPosts = [...posts]
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 6);

  function extractHashtags(text) {
    const regex = /#[\w]+/g; // Expression régulière pour trouver les hashtags
    const matches = text.match(regex); // Recherche de tous les hashtags dans la chaîne
    return matches ?? []; // Retourne le tableau de hashtags ou un tableau vide s'il n'y a pas de hashtags
  }

  const filteredPosts = searchTerm ? posts.filter((post) => {
    const hashtags = extractHashtags(post.tag);
    const searchTerms = [post.title, ...hashtags]; // Inclure le titre et les hashtags dans les termes de recherche
    return searchTerms.some((term) =>
      term.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) : sortedPosts;


  return (
    <div id="home">
      <Navbar />
      <div>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
          id="search-input"
        />
      </div>
      <div id="display-card">
        {filteredPosts.map((post) => (
          <CardComponent post={post} key={post._id} handleDeleteParent={handleDelete} updateLikeParent={updateLike}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
