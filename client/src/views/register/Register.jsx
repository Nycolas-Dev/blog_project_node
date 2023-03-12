import React, { useState } from "react";
import Navbar from "../../components/Navigation.jsx";
import UserForm from "../../components/UserForm.jsx";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Register = () => {  
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log("submit", data);
    try {
       axios.post("http://localhost:8000/api/auth/register",
        data, { withCredentials: true });
        navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
        <div>
            <h5>Inscription</h5>
          <UserForm onSubmit={handleSubmit}/>
        </div>
    </div>
  );
}

export default Register;
