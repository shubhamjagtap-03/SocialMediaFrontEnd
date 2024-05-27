import React, { useState, useContext } from 'react';
import '../css/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const Login = ({ setProgress }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(30);
  
    try {
      const userData = {
        userName,
        password,
      };
  
      const response = await axios.post('http://localhost:3001/auth/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        const userId = response.data.response.user.id;
        console.log(userId);
        localStorage.setItem('token', token);
        localStorage.setItem("userId",userId)
        
        setIsAuth(true); // Update the authentication state
      } else {
        console.error('Invalid password', response.statusText);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setProgress(100);
      navigate('/'); 
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>SocialBee</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="form-group" type="submit">
            Login
          </button>
        </div>
        <div>
          <Link className="form-link" to="/register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
