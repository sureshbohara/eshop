import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = () => {
  const username = localStorage.getItem('auth_name');
  return username ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
