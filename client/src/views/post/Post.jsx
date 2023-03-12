import Navbar from "../../components/Navigation.jsx";
import Comment from "../../components/Comment.jsx";
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import CommentForm from "../../components/CommentForm.jsx";
import { getUser } from "../../services/userRequest";

function Post() {
    const [author, setAuthor] = useState(null);
    const [commentAdded, setCommentAdded] = useState([]);
    const location = useLocation();
    const post = location.state.item;

    useEffect(() => {
      const fetchAuthor = async () => {
        const userInfo = await getUser(post.author);
        setAuthor(`${userInfo.firstname} ${userInfo.lastname}`);
      };
      fetchAuthor();
    }, []);
  
    return (
      <div>
        <Navbar />
        <div>
          <h1>{post.title}</h1>
          <div>Article : {post.content}</div>
          <div>Auteur : {author}</div>
          <div>Tag : {post.tag}</div>
          <div>Like : {post.likeCount}</div>
          <div>Temps de lecture{post.reading_time}</div>
          <div>Créer le {post.created_at}</div>
        </div>
        <Comment idPost={post._id} commentAdded={commentAdded}/>
        <CommentForm setCommentAdded={setCommentAdded}/>
      </div>
    );
  }

export default Post;