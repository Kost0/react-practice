import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        if (!username.trim()) {
            setError('Введите имя пользователя');
            setIsLoading(false);
            return;
        }

        if (password.length < 4) {
            setError('Пароль должен содержать минимум 4 символа');
            setIsLoading(false);
            return;
        }

        const userData = {
            username,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('authUser', JSON.stringify(userData));

        if (window.showNotification) {
            window.showNotification(`Добро пожаловать, ${username}!`, 'success');
        }

        setIsLoading(false);

        if (onLogin) {
            onLogin(userData);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>Вход в систему</h1>
                    <p>Трекер изучения технологий</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && (
                        <div className="login-error" role="alert">
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите ваше имя"
                            disabled={isLoading}
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Минимум 4 символа"
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-small"></span>
                                Вход...
                            </>
                        ) : (
                            'Войти'
                        )}
                    </button>

                    <div className="login-hint">
                        <p>💡 Подсказка: используйте любое имя и пароль от 4 символов</p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;