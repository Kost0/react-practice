import './QuickActions.css'
import { useState } from 'react'
import Modal from './Modal'

function QuickActions({onMarkAllCompleted, onResetAllStatuses, technologies}) {
    const [showExportModal, setShowExportModal] = useState(false);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            technologies: technologies
        };
        const dataStr = JSON.stringify(data, null, 2);
        console.log('Данные для экспорта:', dataStr)
        setShowExportModal(true);
    };

    return (
        <div className="quick-actions">
            <h2>Быстрые действия</h2>
            <div className="action-buttons">
                <button
                    className="action-btn btn-complete"
                    onClick={onMarkAllCompleted}
                >
                    Отметить все как выполненные
                </button>

                <button
                    className="action-btn btn-reset"
                    onClick={onResetAllStatuses}
                >
                    Сбросить все статусы
                </button>

                <button
                    className="action-btn"
                    onClick={handleExport}
                >
                    Экспорт данных
                </button>

                <Modal
                    isOpen={showExportModal}
                    onClose={() => setShowExportModal(false)}
                    title="Экспорт данных"
                >
                    <p>Данные успешно подготовлены для экспорта!</p>
                    <p>Проверьте консоль разработчика для просмотра данных.</p>
                    <button onClick={() => setShowExportModal(false)}>
                        Закрыть
                    </button>
                </Modal>
            </div>
        </div>
    );
}

export default QuickActions