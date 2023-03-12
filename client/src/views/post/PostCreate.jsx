import Navbar from "../../components/Navigation.jsx";
import PostForm from "../../components/PostForm.jsx";
import { createPost } from "../../services/postRequest";
import { useNavigate } from "react-router-dom";



const PostCreate = () => {  
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    try {
      console.log(data);
      createPost(data);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
        <div>
            <h2>Création d'article</h2>
          <PostForm onSubmit={handleSubmit}/>
        </div>
    </div>
  );
}

export default PostCreate;
