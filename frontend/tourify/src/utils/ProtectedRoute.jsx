import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
	const { userInfo  } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
    
    if (!userInfo || userInfo.role_id !== 2) {
      navigate('/', { replace: true });
    }
  }, [userInfo, navigate]); 

  return userInfo && userInfo.role_id === 2 ? children : null;
};