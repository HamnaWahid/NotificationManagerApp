import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ path: string; element: React.ReactNode }> = ({
  path,
  element,
}) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to='/' replace={true} />
  );
};

export default PrivateRoute;
