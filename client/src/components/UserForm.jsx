import React, { useState, useEffect } from "react";
import { getUser } from "../services/userRequest";

const UserForm = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await getUser();
      setUser(userInfo);
    };
    fetchUser();
  }, []);

  const [formData, setFormData] = useState(
    props.formData
      ? props.formData
      : {
          firstname: "",
          lastname: "",
          gender: "male",
          category: "JS",
          email: "",
          password: "test",
          photo: "",
          isAdmin: false,
        }
  );

  const [admin, setAdmin] = useState(formData.isAdmin);

  useEffect(() => {
    if (props.formData) {
      const formData = { ...props.formData };
      delete formData.password;
      setFormData(formData);
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData, 
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!props.formData && !formData.password) {
      alert("Le mot de passe est requis.");
      return;
    } else if (formData.password === formData.confirm) {
      if(formData.isAdmin === "on"){
        formData.isAdmin = true;
      }
      props.onSubmit(formData);
    } else {
      alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
      return;
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstname">Prénom</label>
        <input
          autoComplete="given-name"
          name="firstname"
          required
          type="text"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastname">Nom</label>
        <input
          autoComplete="family-name"
          name="lastname"
          required
          type="text"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="gender">Civilité</label>
        <select
          name="gender"
          required
          id="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">Catégorie</label>
        <select
          name="category"
          required
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="JS">JS</option>
          <option value="PHP">PHP</option>
        </select>
      </div>
      <div>
        <label htmlFor="email">Adresse email</label>
        <input
          name="email"
          required
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          name="password"
          required
          type="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="confirm">Confirmation mot de passe</label>
        <input
          name="confirm"
          required
          type="password"
          id="confirm"
          onChange={handleChange}
        />
      </div>
      { user && user.isAdmin ? (
      <div>
        <label htmlFor="isAdmin">Admin ?</label>
        <input
          name="isAdmin"
          type="checkbox"
          id="isAdmin"
          checked={formData.isAdmin}
          onChange={handleChange}
        />
      </div>) 
      : ""}
      <button
        type="submit"
      >
        Valider
      </button>
    </form>
  );
};

export default UserForm;
