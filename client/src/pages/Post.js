import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);  // Initialize as an array
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);  // Assuming response.data is an array
    });
  }, [id]);  // Add [id] as a dependency to avoid infinite loops

//ADDING COMMENTS
const addComment = ()=>{
  axios.post("http://localhost:3001/comments", {commentBody: newComment , PostId: id ,} ,
    {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      }, 
    }

  ).then((response)=>{
    if (response.data.error) {
      console.log(response.data.error);
    } else {
 const commentToAdd = {commentBody: newComment};
    setComments([...comments, commentToAdd])//(Array destructuring) basically means collect all the previous comments and add the new one to update
    setNewComment("");
    }
  });
}

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>

      <div className="rightSide">
        <div className="addCommentContainer"></div>
        <input className="inputBox" value={newComment} type="text" placeholder="Post your reply" autoComplete="off" onChange={(event)=>{setNewComment(event.target.value)}}/>
        <button className="button" onClick = {addComment}>Reply</button>

        <div className="listOfContainer">
          {comments.map((comment, key) => {
            return <div key={key} className="comment"> {comment.commentBody} </div>
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
