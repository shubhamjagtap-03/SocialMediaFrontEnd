import React, { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
function Create({ setProgress }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate()
  useEffect(() => {
    setProgress(30);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    // Trigger the click event of the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      userId: localStorage.getItem("userId"),
      description: description,
      picturePath: image,
    };
    try {
      const response = await axios.post('http://localhost:3001/posts/', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200 || response.status === 201) {
        console.log(response);
      } else {
        console.log("failed to upload");
      }
    } catch (err) {
      console.log("server err", err);
    }
    finally{
        navigate('/')
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {image && <img src={image} alt="" className="uploaded-image" />}
        </div>
        
        <div className="form-group">
          <textarea
          placeholder="add Caption"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <button type="button"  onClick={handleUploadButtonClick}>
            Select Image
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ display: "none" }}
            required
          />
        </div>
        <div>
          <button className="form-group" type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
