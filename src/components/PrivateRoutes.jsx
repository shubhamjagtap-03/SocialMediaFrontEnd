// PrivateRoutes.jsx
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoutes = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" replace={true} />;
};


export default PrivateRoutes;
