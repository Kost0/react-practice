import './QuickActions.css'

function QuickActions({onMarkAllCompleted, onResetAllStatuses, onPickRandomTechnology}) {
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
                    className="action-btn btn-random"
                    onClick={onPickRandomTechnology}
                >
                    Выбрать случайную следующую технологию
                </button>
            </div>
        </div>
    );
}

export default QuickActions