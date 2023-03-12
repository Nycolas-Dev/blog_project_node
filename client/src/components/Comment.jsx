import React, { useState, useEffect, useContext } from "react";
import { getComments, deleteComment } from "../services/commentRequest";
import { getUser } from "../services/userRequest";
import axios from "axios";

function Comment({ idPost, commentAdded }) {
    //const [authorId, setAuthorId] = useState(null);
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null);

    async function getAuthorName(authorId){
      const userInfo = await getUser(authorId);
      const display = `${userInfo.firstname} ${userInfo.lastname}`;
      return display;
    }

    useEffect(() => {
      const fetchUser = async () => {
        const userInfo = await getUser();
        setUser(userInfo);
      };
      fetchUser();
    }, [idPost]);

    useEffect(() => {
      const fetchComments = async () => {
        const result = await getComments(idPost);
        const commentsWithAuthors = await Promise.all(
          result.map(async (comment) => {
            const authorName = await getAuthorName(comment.author);
            return { ...comment, authorName };
          })
        );
        setComments(commentsWithAuthors);
      };
        fetchComments();
    }, [idPost, commentAdded]);


    const handleDelete = async (commentGoToDelete) => {
      await deleteComment(commentGoToDelete)
      setComments(comments.filter((comment) => comment._id !== commentGoToDelete._id));
    };

    return (
      <div>
      {comments.map((comment) => (
        <div key={comment._id}>
          {comment.content} Créer le : {comment.created_at} Auteur : {comment.authorName}
          { user && user._id === comment.author || user.isAdmin ? <button onClick={() => handleDelete(comment)}>Delete</button> : "" }
        </div>
      ))}
      </div>
    );
  }

export default Comment;