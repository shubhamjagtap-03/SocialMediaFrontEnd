import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthProvider';

const Register = ({setProgress}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const {isAuth, setIsAuth} = useContext(AuthContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userName,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3001/auth/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
  
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        
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
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" >
            signin
          </button>
        </div>

       
        <div>
          <Link className="form-link" to="/login">
            Have an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
