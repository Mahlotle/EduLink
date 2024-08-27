import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Changed useHistory to useNavigate
import axios from "axios";

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, [id]); // Added 'id' as a dependency to avoid warning about missing dependencies

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <h1> You are on {username} timeline</h1>
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`); // Changed history.push to navigate
                }}
              >
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
