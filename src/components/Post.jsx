import React, { useState ,useEffect} from 'react';
import '../css/Home.css';
import axios from 'axios';

const Post = ({ post }) => {
  const [isLike, setIsLike] = useState(false); 
  const[like,setLike] = useState(Object.keys(post.likes).length)
   useEffect(() => {
    // Check if the post.likes object includes the current userId
    const userId = localStorage.getItem("userId");
    if (post.likes && post.likes.hasOwnProperty(userId)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post]);

  const likeHandler = (postId) => {
    const userId = localStorage.getItem("userId");
    const postIdString = String(postId);
    try {
      axios.patch(`http://localhost:3001/posts/${postIdString}/like`,
      { userId: userId },
      {
        headers : {
          "authorization" : localStorage.getItem('token')
        }
      }
      );
      setLike(isLike ? like - 1 : like + 1);
      setIsLike(!isLike);
    } catch (err) {
      console.log("Problem in like API", err);
    }
  };

  return (
    <div key={post._id} className="card-post">
      <div className="card-image">
        <img src={post.picturePath} alt="post" />
      </div>

      <div className="card-content">
        <div className="card-icons">
          <span className={isLike ?`material-icons` : `material-symbols-rounded` }
           onClick={() => likeHandler(post._id)}>
            favorite
          </span>
        </div>
        
        <div className="card-icons">
          <span className="material-symbols-rounded">mode_comment</span>
        </div>
      </div>
      <div className='post-Likes'>{like}  likes</div>
      <div className="post-caption">{post.description}</div>

      <div className="comment-section">
        <div className="input-container">
          <input type="text" id="text" placeholder="Add comment......" />
        </div>
        <div>
          <button id="post-btn">Post</button>
        </div>
      </div>
      <button id="btn">{post.userName}</button>
    </div>
  );
};

export default Post;
