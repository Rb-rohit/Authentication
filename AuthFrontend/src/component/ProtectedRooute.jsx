import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = () => {
    // const token = localStorage.getItem('token');

    const { myData, isAuthenticated, loading } = useContext(AuthContext)

    console.log("myData, isAuthenticated, loading ", myData, isAuthenticated, loading)

    return isAuthenticated ? <Outlet /> : <Navigate to="login" />
};

export default ProtectedRoute;