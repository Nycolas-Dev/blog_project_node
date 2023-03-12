import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navigation.jsx";
import UserForm from "../../components/UserForm.jsx";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../services/userRequest";


const UserModify = () => {  
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
      setIsLoading(true);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (data) => {
    updateUser(data);
    navigate('/');
  };

  if (!isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
        <div>
            <h5>Modifier profil</h5>
            {user && <UserForm onSubmit={handleSubmit} formData={user} />}
        </div>
    </div>
  );
}

export default UserModify;