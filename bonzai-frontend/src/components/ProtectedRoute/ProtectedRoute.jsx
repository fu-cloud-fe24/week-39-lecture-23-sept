import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore.js';

const ProtectedRoute = ({ children, allowedRoles}) => {
    const user = useAuthStore((state) => state.user);

    if(!user) return <Navigate to="/auth" />;
    if(!allowedRoles.includes(user.role)) return <Navigate to="/auth" />

    return children;
}

export default ProtectedRoute;
