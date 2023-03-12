import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navigation.jsx";
import CommentForm from "../../components/CommentForm.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateComment } from "../../services/commentRequest";


const CommentModify = () => {  
  const location = useLocation();
  const [formData, setFormData] =  location.state ? useState(location.state.item) : useState(comment);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    updateComment(data._id, data);
    navigate('/')
  };

  return (
    <div>
      <Navbar />
        <div>
            <h5>Modifier commentaire</h5>
            <CommentForm onSubmit={handleSubmit} formData={formData}/>
        </div>
    </div>
  );
}

export default CommentModify;
