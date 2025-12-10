import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (username === 'admin' && password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);

            onLogin(username);

            navigate('/react-practice/');
        } else {
            setError('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className="page login-page">
            <div className="login-container">
                <div className="login-card">
                    <h1>Вход в систему</h1>
                    <p className="login-subtitle">Трекер изучения технологий</p>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя:</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Войти
                        </button>
                    </form>

                    <div className="login-hint">
                        <p>💡 Для демонстрации используйте:</p>
                        <p><strong>Логин:</strong> admin</p>
                        <p><strong>Пароль:</strong> password</p>
                    </div>

                    <div className="login-footer">
                        <Link to="/react-practice/">← Вернуться на главную</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;