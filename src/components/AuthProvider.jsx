// AuthProvider.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/auth/verify", {
        headers: {
          "authorization": localStorage.getItem("token")
        }
      });

     

      setIsAuth(true);
    } catch (error) {
      
      if (error.response && error.response.status === 401) {
        setIsAuth(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, []); 


return (
  <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
    {children}
  </AuthContext.Provider>
);

};

export default AuthProvider;
