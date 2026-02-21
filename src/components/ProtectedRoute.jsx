import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user is found in context, send them to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the page they asked for (like Dashboard)
  return children;
};

export default ProtectedRoute;