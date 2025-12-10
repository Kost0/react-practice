import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const authUser = localStorage.getItem('authUser');
            setIsAuthenticated(!!authUser);
        };

        checkAuth();

        const handleStorageChange = (e) => {
            if (e.key === 'authUser') {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    if (isAuthenticated === null) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                gap: '20px',
                background: 'var(--bg-primary)'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '5px solid var(--border-color)',
                    borderTopColor: '#667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1em' }}>
                    Проверка авторизации...
                </p>
                <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/react-practice/login" replace />;
    }

    return children;
}

export default ProtectedRoute;