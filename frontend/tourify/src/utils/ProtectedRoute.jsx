import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {
	const { userInfo  } = useAuth();

if (!userInfo || userInfo.role_id !== 2) {
return <Navigate to="/" replace />;

}
	return children;
}
