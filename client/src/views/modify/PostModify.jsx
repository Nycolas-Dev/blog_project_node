import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navigation.jsx";
import PostForm from "../../components/PostForm.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updatePost } from "../../services/postRequest";


const PostModify = () => {  
  const location = useLocation();
  const [formData, setFormData] =  location.state ? useState(location.state.item) : useState(post);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    updatePost(data._id, data);
    navigate('/')
  };

  return (
    <div>
      <Navbar />
        <div>
            <h5>Modifier profil</h5>
            <PostForm onSubmit={handleSubmit} formData={formData}/>
        </div>
    </div>
  );
}

export default PostModify;
