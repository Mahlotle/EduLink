import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import AboutUs from './pages/AboutUs';
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import logo from './assets/logo.PNG';
import PageNotFound from "./pages/PageNotFound";

function AppContent() {
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false });
  const navigate = useNavigate(); // Use the navigate hook here

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/auth", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        });
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
        setAuthState({ ...authState, status: false });
      }
    };

    checkAuth();
  }, []); // No need to add `authState` to the dependency array if only set once.

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navbar">
          <div className="links">
            <Link to="/"> 
              <img src={logo} alt="EduLink Logo" className="navbar-logo" />  
            </Link>
            { !authState.status ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <>
                <Link to="/">Home</Link>
                <Link to="/about-us">About Us</Link>
                <Link to="/createpost">Create A Post</Link>
              </>
            )}
          </div>
          <div className="loggedInContainer">
            {authState.status && (
              <>
                <h1>{authState.username}</h1>
                <button onClick={logout}>Logout</button>
              </>
            )}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
