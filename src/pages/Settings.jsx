import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../components/MUI/ThemeProviderWrapper';
import './Settings.css';

function Settings() {
    const navigate = useNavigate();
    const { mode, toggleTheme } = useContext(ThemeContext);
    const [settings, setSettings] = useState({
        theme: 'light'
    });

    useEffect(() => {
        setSettings({ theme: mode });
        document.body.setAttribute('data-theme', mode);
    }, [mode]);

    useEffect(() => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setSettings(parsed);
            document.body.setAttribute('data-theme', parsed.theme || 'light');
        }
    }, []);

    const updateTheme = (theme) => {
        const newSettings = { ...settings, theme };
        setSettings(newSettings);
        localStorage.setItem('appSettings', JSON.stringify(newSettings));
        localStorage.setItem('muiThemeMode', theme);
        document.body.setAttribute('data-theme', theme);

        if (mode !== theme) {
            toggleTheme();
        }
    };

    const handleClearAllData = () => {
        if (window.confirm('Вы уверены, что хотите удалить все данные?  Это действие нельзя отменить.')) {
            localStorage.removeItem('technologies');
            localStorage.removeItem('appSettings');
            localStorage.removeItem('muiThemeMode');
            document.body.setAttribute('data-theme', 'light');
            alert('Все данные удалены! ');
            navigate('/');
            window.location.reload();
        }
    };

    return (
        <div className="page settings-page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    Назад на главную
                </Link>
                <h1>Настройки приложения</h1>
            </div>

            <div className="settings-section">
                <h2>Тема оформления</h2>
                <p>Выберите тему для интерфейса приложения (применяется ко всем компонентам, включая MUI)</p>

                <div className="theme-selector">
                    <div
                        className={`theme-option theme-light ${settings.theme === 'light' ? 'active' : ''}`}
                        onClick={() => updateTheme('light')}
                    >
                        <div className="theme-preview"></div>
                        <div className="theme-name">Светлая</div>
                    </div>

                    <div
                        className={`theme-option theme-dark ${settings.theme === 'dark' ? 'active' : ''}`}
                        onClick={() => updateTheme('dark')}
                    >
                        <div className="theme-preview"></div>
                        <div className="theme-name">Тёмная</div>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Опасная зона</h2>

                <div className="setting-item danger-zone">
                    <div className="setting-title">Удалить все данные</div>
                    <p className="setting-description">
                        Это действие удалит все ваши технологии, заметки и настройки.
                        Восстановление будет невозможно.
                    </p>
                    <button
                        className="danger-button"
                        onClick={handleClearAllData}
                    >
                        Удалить все данные
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;