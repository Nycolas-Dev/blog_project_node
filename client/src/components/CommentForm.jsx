import React, { useState, useEffect } from "react";
import { getUser } from "../services/userRequest";
import { createComment } from "../services/commentRequest";
import { useLocation } from 'react-router-dom';

const CommentForm = (props) => {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState(
    props.formData
      ? props.formData
      : {
          author: "",
          post: "",
          content: "",
        }
  );

  const location = useLocation();
  const idPost = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user.isAdmin) {
      setAdmin(user.isAdmin);
    }
  }, [user]);

  useEffect(() => {
    if (user !== null && !props.formData) {
      setFormData({
        author: user._id,
        post: idPost,
        content: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (props.formData) {
      const formData = { ...props.formData };
      setFormData(formData);
    }
  }, [props.formData]);

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createComment(formData);
    props.setCommentAdded((prevState) => !prevState);
    setFormData({
      author: user._id,
      post: idPost,
      content: "",
    });
  };

  if (!user) {
    return "Loading";
  }


  return (
    <form noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="content">Ajouter un commentaire : </label>
        <input
          name="content"
          required
          type="text"
          id="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
      >
        Valider
      </button>
    </form>
  );
};

export default CommentForm;
