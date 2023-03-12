import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./views/login/Login.jsx";
import Register from "./views/register/Register.jsx";
import UserModify from "./views/modify/UserModify.jsx";
import PostModify from "./views/modify/PostModify.jsx";
import Home from "./views/home/Home.jsx";
import PostCreate from "./views/post/PostCreate.jsx";
import Post from "./views/post/Post.jsx";
import Favorites from "./views/favorites/Favorites.jsx";
import { getToken } from "./utils/token";

function App() {

  const isAuthenticated = getToken() ? true : false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? (<Navigate replace to="/" />) : (<Login />)}/>
        <Route path="/" element={!isAuthenticated ? (<Navigate replace to="/login" />) : (<Home />)}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/user/update" element={!isAuthenticated ? (<Navigate replace to="/login" />) : (<UserModify />)}/>
        <Route path="/post/:id" element={!isAuthenticated ? (<Navigate replace to="/login" />) : (<Post />)}/>
        <Route path="/post/update" element={!isAuthenticated ? (<Navigate replace to="/login" />) : (<PostModify />)}/>
        <Route path="/favorites" element={!isAuthenticated? (<Navigate replace to="/login" />) : (<Favorites />)}/>
        <Route path="/post/create" element={!isAuthenticated ? (<Navigate replace to="/login" />) : (<PostCreate />)}/>

        {/* <Route path="/test" element={user.isAdmin === true ? (<Create />) : (<Create />)}/> */}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
