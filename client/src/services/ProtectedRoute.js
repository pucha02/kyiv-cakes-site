import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); // Проверяем наличие токена
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;