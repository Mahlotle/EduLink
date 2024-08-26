import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Check if the token is present
    if (!token) {
      console.warn("No access token found, redirecting to login.");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    axios
      .get("http://localhost:3001/posts", {
        headers: { accessToken: token },
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => like.PostId));
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized, redirecting to login.");
          navigate("/login"); // Redirect on 401 error
        }
      });
  }, [navigate]);

  // LIKE A POST
  const likeAPost = (postId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No access token found, redirecting to login.");
      navigate("/login");
      return;
    }

    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: token } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        // Logic to change color when liked and disliked
        if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => id !== postId));
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      })
      .catch((error) => {
        console.error("Error liking post:", error);
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized, redirecting to login.");
          navigate("/login"); // Redirect on 401 error
        }
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">{value.username}</div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"}
                />
              </div>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
