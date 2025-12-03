import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeadlineForm from '../components/forms/DeadlineForm';
import BulkEditForm from '../components/forms/BulkEditForm';
import DataImportExport from '../components/forms/DataImportExport';
import './Forms.css';

function Forms() {
    const [activeDemo, setActiveDemo] = useState(null);

    const exampleTech = {
        id: 1,
        title: 'React',
        description: 'Библиотека для создания пользовательских интерфейсов',
        category: 'frontend'
    };

    const handleSaveDeadline = (updatedTech) => {
        console.log('Сохранены сроки:', updatedTech);
        alert('Сроки изучения сохранены!');
        setActiveDemo(null);
    };

    const handleSaveBulkEdit = (updatedTechnologies) => {
        console.log('Обновлены технологии:', updatedTechnologies);
    };

    const handleCancel = () => {
        setActiveDemo(null);
    };

    return (
        <div className="page forms-demo-page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    ← Назад на главную
                </Link>
                <h1>Работа с формами</h1>
            </div>

            {!activeDemo && (
                <div className="demo-selector">
                    <div className="demo-card" onClick={() => setActiveDemo('deadline')}>
                        <div className="demo-icon">📅</div>
                        <h3>Сроки изучения</h3>
                        <p>
                            Форма для установки сроков изучения технологии с валидацией
                            дат, расчетом времени и полной доступностью
                        </p>
                        <button className="demo-btn">Открыть форму →</button>
                    </div>

                    <div className="demo-card" onClick={() => setActiveDemo('bulk')}>
                        <div className="demo-icon">✏️</div>
                        <h3>Массовое редактирование</h3>
                        <p>
                            Компонент для выбора нескольких технологий и
                            одновременного изменения их статусов с фильтрацией
                        </p>
                        <button className="demo-btn">Открыть редактор →</button>
                    </div>

                    <div className="demo-card" onClick={() => setActiveDemo('import')}>
                        <div className="demo-icon">📦</div>
                        <h3>Импорт/Экспорт</h3>
                        <p>
                            Компонент для экспорта данных в JSON и импорта с валидацией
                            структуры, обработкой ошибок и drag-and-drop
                        </p>
                        <button className="demo-btn">Открыть →</button>
                    </div>
                </div>
            )}

            {activeDemo === 'deadline' && (
                <div className="demo-content">
                    <button
                        onClick={() => setActiveDemo(null)}
                        className="back-to-demos"
                    >
                        ← Назад
                    </button>
                    <DeadlineForm
                        technology={exampleTech}
                        onSave={handleSaveDeadline}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {activeDemo === 'bulk' && (
                <div className="demo-content">
                    <button
                        onClick={() => setActiveDemo(null)}
                        className="back-to-demos"
                    >
                        ← Назад
                    </button>
                    <BulkEditForm
                        onSave={handleSaveBulkEdit}
                        onCancel={handleCancel}
                    />
                </div>
            )}

            {activeDemo === 'import' && (
                <div className="demo-content">
                    <button
                        onClick={() => setActiveDemo(null)}
                        className="back-to-demos"
                    >
                        ← Назад
                    </button>
                    <DataImportExport />
                </div>
            )}
        </div>
    );
}

export default Forms;