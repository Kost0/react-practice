import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, isLoggedIn }) {
    if (!isLoggedIn) {
        return <Navigate to="/react-practice/login" replace />;
    }

    return children;
}

export default ProtectedRoute;