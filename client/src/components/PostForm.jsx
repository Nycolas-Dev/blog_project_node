import React, { useState, useEffect } from "react";
import { getUser } from "../services/userRequest";
import "./postForm.css";

const PostForm = (props) => {

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState(
    props.formData
      ? props.formData
      : {
          author: "",
          title: "",
          content: "",
          image: "",
          tag: "",
          //likeCount: "",
          //reading_time: false,
        }
  );

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
        title: "",
        content: "",
        image: "",
        tag: "#" + user.category,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(formData);
  };

  if (!user) {
    return "Loading";
  }


  return (
    <form id="form-post" noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre</label>
        <input
          name="title"
          required
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Article</label>
        <textarea
          name="content"
          required
          type="text"
          id="content"
          value={formData.content}
          onChange={handleChange}
          style={{ height: "6em" }}
        />
      </div>
      <div>
        <label htmlFor="tag">Tag (avec un # devant)</label>
        <input
          name="tag"
          required
          type="text"
          id="tag"
          value={formData.tag}
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

export default PostForm;
