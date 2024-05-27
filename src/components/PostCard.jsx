import React from 'react'


const PostCard = ({ post, onClose }) => {
  return (
    <center> <div className="post-detail-modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <h3>{post.userName}</h3>
      <img src={post.picturePath} alt={post.description} />
      <div className="card-icons"><span className="material-icons">favorite</span>{post.likes.length}</div>
      <p>{post.description}</p>
      {/* Additional details or actions can be added here */}
    </div>
  </div></center>
   
  )
}

export default PostCard
