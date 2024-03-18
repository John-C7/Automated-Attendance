import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:8800/auth/check', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/NotAuthorized" replace />;
};

export default AuthProvider;
