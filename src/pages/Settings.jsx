import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings() {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        notifications: true,
        autoSave: true,
        theme: 'light'
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('appSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const updateSetting = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        localStorage.setItem('appSettings', JSON.stringify(newSettings));
    };

    const handleExportData = () => {
        const technologies = localStorage.getItem('technologies');
        const appSettings = localStorage.getItem('appSettings');

        const exportData = {
            exportedAt: new Date().toISOString(),
            technologies: technologies ? JSON.parse(technologies) : [],
            settings: appSettings ? JSON.parse(appSettings) : {}
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `tech-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Данные успешно экспортированы!');
    };

    const handleImportData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);

                if (importedData.technologies) {
                    localStorage.setItem('technologies', JSON.stringify(importedData.technologies));
                }
                if (importedData.settings) {
                    localStorage.setItem('appSettings', JSON.stringify(importedData.settings));
                    setSettings(importedData.settings);
                }

                alert('Данные успешно импортированы!');
                window.location.reload();
            } catch (error) {
                alert('Ошибка при импорте данных. Проверьте формат файла.');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    };

    const handleClearAllData = () => {
        if (window.confirm('Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.')) {
            localStorage.removeItem('technologies');
            localStorage.removeItem('appSettings');
            alert('Все данные удалены!');
            navigate('/');
            window.location.reload();
        }
    };

    const handleResetToDefaults = () => {
        if (window.confirm('Сбросить все настройки к значениям по умолчанию?')) {
            const defaultSettings = {
                notifications: true,
                autoSave: true,
                theme: 'light'
            };
            setSettings(defaultSettings);
            localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
            alert('Настройки сброшены к значениям по умолчанию!');
        }
    };

    return (
        <div className="page settings-page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    ← Назад на главную
                </Link>
                <h1>Настройки приложения</h1>
            </div>

            <div className="settings-section">
                <h2>Общие настройки</h2>

                <div className="setting-item">
                    <div className="setting-header">
                        <div>
                            <div className="setting-title">Уведомления</div>
                            <p className="setting-description">
                                Получать уведомления о прогрессе обучения
                            </p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.notifications}
                                onChange={(e) => updateSetting('notifications', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-header">
                        <div>
                            <div className="setting-title">Автосохранение</div>
                            <p className="setting-description">
                                Автоматически сохранять изменения
                            </p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.autoSave}
                                onChange={(e) => updateSetting('autoSave', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Тема оформления</h2>
                <p>Выберите тему для интерфейса приложения</p>

                <div className="theme-selector">
                    <div
                        className={`theme-option theme-light ${settings.theme === 'light' ? 'active' : ''}`}
                        onClick={() => updateSetting('theme', 'light')}
                    >
                        <div className="theme-preview"></div>
                        <div className="theme-name">Светлая</div>
                    </div>

                    <div
                        className={`theme-option theme-dark ${settings.theme === 'dark' ? 'active' : ''}`}
                        onClick={() => updateSetting('theme', 'dark')}
                    >
                        <div className="theme-preview"></div>
                        <div className="theme-name">Темная</div>
                    </div>

                    <div
                        className={`theme-option theme-blue ${settings.theme === 'blue' ? 'active' : ''}`}
                        onClick={() => updateSetting('theme', 'blue')}
                    >
                        <div className="theme-preview"></div>
                        <div className="theme-name">Синяя</div>
                    </div>
                </div>
            </div>

            <div className="settings-section">
                <h2>Управление данными</h2>

                <div className="setting-item">
                    <div className="setting-title">Экспорт и импорт данных</div>
                    <p className="setting-description">
                        Сохраните свой прогресс в файл или загрузите данные из резервной копии
                    </p>
                    <div className="export-import-buttons">
                        <button
                            className="secondary-button"
                            onClick={handleExportData}
                        >
                            📥 Экспортировать данные
                        </button>
                        <label className="secondary-button">
                            📤 Импортировать данные
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImportData}
                                className="file-input"
                            />
                        </label>
                    </div>
                </div>

                <div className="setting-item">
                    <div className="setting-title">Сброс настроек</div>
                    <p className="setting-description">
                        Вернуть все настройки к значениям по умолчанию
                    </p>
                    <button
                        className="secondary-button"
                        onClick={handleResetToDefaults}
                    >
                        🔄 Сбросить настройки
                    </button>
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
                        🗑️ Удалить все данные
                    </button>
                </div>
            </div>

            <div className="settings-section">
                <div className="settings-info">
                    <h3>💡 Полезная информация</h3>
                    <ul>
                        <li>Все данные хранятся локально в вашем браузере</li>
                        <li>Регулярно создавайте резервные копии данных</li>
                        <li>При очистке данных браузера ваш прогресс будет удален</li>
                        <li>Используйте экспорт для переноса данных на другое устройство</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Settings;