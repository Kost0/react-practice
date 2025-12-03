import { useState, useEffect } from 'react';
import './DataImportExport.css';

function DataImportExport() {
    const [technologies, setTechnologies] = useState([]);
    const [status, setStatus] = useState('');
    const [statusType, setStatusType] = useState(''); // 'success', 'error', 'info'
    const [isDragging, setIsDragging] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        loadFromLocalStorage();
    }, []);

    const loadFromLocalStorage = () => {
        try {
            const saved = localStorage.getItem('technologies');
            if (saved) {
                const parsed = JSON.parse(saved);
                setTechnologies(parsed);
                showStatus('Данные загружены из localStorage', 'info');
            } else {
                showStatus('В localStorage пока нет данных', 'info');
            }
        } catch (error) {
            showStatus('Ошибка загрузки данных из localStorage', 'error');
            console.error('Ошибка загрузки:', error);
        }
    };

    const saveToLocalStorage = () => {
        try {
            localStorage.setItem('technologies', JSON.stringify(technologies));
            showStatus('Данные сохранены в localStorage', 'success');
        } catch (error) {
            showStatus('Ошибка сохранения данных', 'error');
            console.error('Ошибка сохранения:', error);
        }
    };

    const showStatus = (message, type) => {
        setStatus(message);
        setStatusType(type);
        setTimeout(() => {
            setStatus('');
            setStatusType('');
        }, 5000);
    };

    const validateTechnologies = (data) => {
        const errors = [];

        if (!Array.isArray(data)) {
            errors.push('Данные должны быть массивом');
            return { valid: false, errors };
        }

        if (data.length === 0) {
            errors.push('Массив технологий пуст');
            return { valid: false, errors };
        }

        data.forEach((tech, index) => {
            if (!tech.title || typeof tech.title !== 'string') {
                errors.push(`Технология ${index + 1}: отсутствует или некорректно поле "title"`);
            }

            if (!tech.description || typeof tech.description !== 'string') {
                errors.push(`Технология ${index + 1}: отсутствует или некорректно поле "description"`);
            }

            if (!tech.category || typeof tech.category !== 'string') {
                errors.push(`Технология ${index + 1}: отсутствует или некорректно поле "category"`);
            }

            const validStatuses = ['not-started', 'in-progress', 'completed'];
            if (tech.status && !validStatuses.includes(tech.status)) {
                errors.push(`Технология ${index + 1}: недопустимое значение статуса "${tech.status}"`);
            }

            if (tech.resources !== undefined && !Array.isArray(tech.resources)) {
                errors.push(`Технология ${index + 1}: поле "resources" должно быть массивом`);
            }

            if (tech.deadline && isNaN(Date.parse(tech.deadline))) {
                errors.push(`Технология ${index + 1}: некорректный формат даты в поле "deadline"`);
            }
        });

        return {
            valid: errors.length === 0,
            errors
        };
    };

    const exportToJSON = () => {
        try {
            if (technologies.length === 0) {
                showStatus('Нет данных для экспорта', 'error');
                return;
            }

            const exportData = {
                exportDate: new Date().toISOString(),
                version: '1.0',
                count: technologies.length,
                technologies: technologies
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');

            link.href = url;
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showStatus(`Экспортировано ${technologies.length} технологий`, 'success');
        } catch (error) {
            showStatus('Ошибка экспорта данных', 'error');
            console.error('Ошибка экспорта:', error);
        }
    };

    const importFromJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.json')) {
            showStatus('Выберите файл формата JSON', 'error');
            event.target.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);

                const techArray = imported.technologies || imported;

                const validation = validateTechnologies(techArray);

                if (!validation.valid) {
                    setValidationErrors(validation.errors);
                    showStatus('Ошибка валидации импортируемых данных', 'error');
                    return;
                }

                setTechnologies(techArray);
                localStorage.setItem('technologies', JSON.stringify(techArray));
                setValidationErrors([]);
                showStatus(`Успешно импортировано ${techArray.length} технологий`, 'success');
            } catch (error) {
                showStatus('Ошибка импорта: неверный формат JSON', 'error');
                console.error('Ошибка импорта:', error);
            }
        };

        reader.onerror = () => {
            showStatus('Ошибка чтения файла', 'error');
        };

        reader.readAsText(file);
        event.target.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];

        if (!file) {
            showStatus('Файл не найден', 'error');
            return;
        }

        if (!file.name.endsWith('.json')) {
            showStatus('Поддерживаются только JSON файлы', 'error');
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                const techArray = imported.technologies || imported;

                const validation = validateTechnologies(techArray);

                if (!validation.valid) {
                    setValidationErrors(validation.errors);
                    showStatus('Ошибка валидации импортируемых данных', 'error');
                    return;
                }

                setTechnologies(techArray);
                localStorage.setItem('technologies', JSON.stringify(techArray));
                setValidationErrors([]);
                showStatus(`Успешно импортировано ${techArray.length} технологий`, 'success');
            } catch (error) {
                showStatus('Ошибка импорта: неверный формат JSON', 'error');
            }
        };

        reader.readAsText(file);
    };

    return (
        <div className="data-import-export">
            <h1>Импорт и экспорт данных</h1>
            <p className="page-description">
                Экспортируйте ваши данные в JSON файл для резервного копирования или
                импортируйте данные из файла
            </p>

            {status && (
                <div
                    className={`status-message status-${statusType}`}
                    role="alert"
                    aria-live="polite"
                >
                    {status}
                </div>
            )}

            {validationErrors.length > 0 && (
                <div className="validation-errors" role="alert">
                    <h3>Ошибки валидации:</h3>
                    <ul>
                        {validationErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="controls">
                <button
                    onClick={exportToJSON}
                    disabled={technologies.length === 0}
                    className="btn-export"
                    aria-label="Экспортировать данные в JSON файл"
                >
                    📥 Экспортировать в JSON
                </button>

                <label className="file-input-label">
                    📤 Импортировать из JSON
                    <input
                        type="file"
                        accept=".json"
                        onChange={importFromJSON}
                        style={{ display: 'none' }}
                        aria-label="Выбрать JSON файл для импорта"
                    />
                </label>

                <button
                    onClick={saveToLocalStorage}
                    disabled={technologies.length === 0}
                    className="btn-save"
                    aria-label="Сохранить данные в localStorage браузера"
                >
                    💾 Сохранить в localStorage
                </button>

                <button
                    onClick={loadFromLocalStorage}
                    className="btn-load"
                    aria-label="Загрузить данные из localStorage браузера"
                >
                    🔄 Загрузить из localStorage
                </button>
            </div>

            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="region"
                aria-label="Область для перетаскивания JSON файла"
            >
                <div className="drop-zone-content">
                    <span className="drop-icon">📁</span>
                    <p>Перетащите JSON-файл сюда</p>
                    <p className="drop-hint">или используйте кнопку "Импортировать из JSON"</p>
                </div>
            </div>

            {technologies.length > 0 && (
                <div className="technologies-preview">
                    <h2>Текущие данные ({technologies.length})</h2>
                    <div className="tech-grid">
                        {technologies.slice(0, 6).map((tech, index) => (
                            <div key={index} className="tech-preview-card">
                                <h3>{tech.title}</h3>
                                <p className="tech-category">{tech.category}</p>
                                <span className={`tech-status status-${tech.status || 'not-started'}`}>
                                    {tech.status || 'not-started'}
                                </span>
                            </div>
                        ))}
                    </div>
                    {technologies.length > 6 && (
                        <p className="more-tech">
                            и еще {technologies.length - 6} технологий...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DataImportExport;