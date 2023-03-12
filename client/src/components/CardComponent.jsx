import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userRequest";
import { deletePost, updatePost } from "../services/postRequest";
import "./cardComponent.css";

const CardComponent = (props) => {

  const [item, setPosts] = useState(props.post);
  const [user, setUser] = useState(null);
  const { handleDeleteParent, updateLikeParent } = props;
  const [index, setIndex] = useState(props.index);
  const navigate = useNavigate();

  //get connected user
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    setPosts(props.post);
  }, [props.post]);

  useEffect(() => {
    setIndex(props.index);
  }, [props.index]);
  
  // created_date display formatting
  const displayDate = (created_at) => {
    const date = new Date(created_at);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };


  const handleUpdate = (item) => {
    navigate("/post/update", { state: { item } });
  };

  const handleDelete = (data) => {
    deletePost(data);
    handleDeleteParent(data._id);
  };


  const addLike = (post) => {

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    if (likedPosts.includes(post._id)) {
      return;
    }
    
    const updateData = post;
    updateData.likeCount++;

    updatePost(post._id, post, "like");
    updateLikeParent(post._id);
  }

  const addToFavorites = (id) => {

    // Vérifie si l'utilisateur a déjà aimé ce post
    const favoritedPosts = JSON.parse(localStorage.getItem('favoritedPosts')) || [];
    if (favoritedPosts.includes(id)) {
      // Empêche l'utilisateur d'aimer le post à nouveau
      return;
    }
  
    // Ajoute le post aux posts aimés de l'utilisateur
    favoritedPosts.push(id);
    localStorage.setItem('favoritedPosts', JSON.stringify(favoritedPosts));

  }

  const removeFromFavorites = (id) => {
    // Récupère les posts favoris de l'utilisateur
    const favoritedPosts = JSON.parse(localStorage.getItem('favoritedPosts')) || [];
    
    // Vérifie si le post à supprimer est présent dans le tableau des favoris
    const index = favoritedPosts.indexOf(id);
    if (index !== -1) {
      // Supprime le post du tableau des favoris
      favoritedPosts.splice(index, 1);
      localStorage.setItem('favoritedPosts', JSON.stringify(favoritedPosts));
    }
  }

  return (
    <div id="cardComponent">
      <Link
        to={`/post/${item._id}`}
        state={{
          item,
        }}
      >
        <div
          key={index}
        >
        <div>
          <div>
            <img
              src={item.image}
              alt=""
            />
          </div>
            <div>{item.title}</div>
            <div>{item.tag}</div>
            <div>Temps lecture : {item.reading_time} min</div>
            <div className="loc">
              Date création : {displayDate(item.created_at)}
            </div>
          </div>
        </div>
      </Link>
      <button onClick={() => addLike(item)}>❤ {item.likeCount}</button>
      {props.page !== "favorites" ? (<button onClick={() => addToFavorites(item._id)}>Ajouter aux favoris</button>) : (<button onClick={() => removeFromFavorites(item._id)}>Supprimer des favoris</button>)}
      {user && user.isAdmin || user && user._id == item.author ? (
        <div id="card-options">
          <button
            onClick={() => handleUpdate(item)}
            className="btn-admin"
          >
            Éditer
      
          </button>
          <button
            onClick={() => handleDelete(item)}
            className="btn-admin"
          >
            Supprimer
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardComponent;
