import React from 'react';
import { Navigate } from 'react-router';
import { useUserRole } from '../hooks/use-user';

export const PrivateRoute = ({ children, accessLevel }) => {
  const userRole = useUserRole();

  if (accessLevel === undefined && userRole === undefined) {
    return children;
  }

  if (accessLevel !== undefined && userRole !== undefined && accessLevel.includes(userRole) ) {
    return children;
  }
  
  return <Navigate to="/" />;
};