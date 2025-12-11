import './TechnologyCard.css'
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
    const getDifficultyLabel = (difficulty) => {
        const labels = {
            'beginner': '🟢 Начальный',
            'intermediate': '🟡 Средний',
            'advanced': '🔴 Продвинутый'
        };
        return labels[difficulty] || null;
    };

    const calculateDaysUntilDeadline = () => {
        if (!technology.deadline) return null;

        const today = new Date();
        const deadline = new Date(technology.deadline);
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    };

    const getDeadlineStatus = (daysLeft) => {
        if (daysLeft < 0) return 'expired';
        if (daysLeft <= 3) return 'urgent';
        if (daysLeft <= 7) return 'soon';
        return 'normal';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const daysLeft = calculateDaysUntilDeadline();
    const deadlineStatus = daysLeft !== null ? getDeadlineStatus(daysLeft) : null;

    return (
        <div
            className="technology-card"
            data-status={technology.status}
        >
            <div>
                <div className="card-header">
                    <h3>{technology.title}</h3>
                    {technology.difficulty && (
                        <span className={`difficulty-badge ${technology.difficulty}`}>
                            {getDifficultyLabel(technology.difficulty)}
                        </span>
                    )}
                </div>

                <p className="card-description">{technology.description}</p>
                <p className="card-category">{technology.category}</p>

                {technology.deadline && (
                    <div className={`deadline-info ${deadlineStatus}`}>
                        <div className="deadline-header">
                            <span className="deadline-icon">📅</span>
                            <strong>Дедлайн:</strong> {formatDate(technology.deadline)}
                        </div>

                        {daysLeft !== null && (
                            <div className="days-remaining">
                                {daysLeft < 0 ? (
                                    <span className="expired">⚠️ Просрочено на {Math.abs(daysLeft)} дн.</span>
                                ) : daysLeft === 0 ? (
                                    <span className="today">🔥 Сегодня последний день!</span>
                                ) : (
                                    <span>Осталось: {daysLeft} дн.</span>
                                )}
                            </div>
                        )}

                        {technology.startDate && (
                            <div className="start-date">
                                Начало: {formatDate(technology.startDate)}
                            </div>
                        )}

                        {technology.estimatedHours && (
                            <div className="estimated-hours">
                                ⏱️ Оценка: {technology.estimatedHours} ч.
                            </div>
                        )}

                        {technology.priority && (
                            <div className={`priority priority-${technology.priority}`}>
                                Приоритет: {
                                technology.priority === 'high' ? 'Высокий' :
                                    technology.priority === 'medium' ? 'Средний' :  'Низкий'
                            }
                            </div>
                        )}
                    </div>
                )}

                {technology.resources && technology.resources.length > 0 && (
                    <div className="card-resources">
                        <span className="resources-label">Ресурсы ({technology.resources.length})</span>
                        <ul className="resources-list">
                            {technology.resources.slice(0, 2).map((resource, index) => (
                                <li key={index}>
                                    <a
                                        href={resource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {resource. length > 40 ? resource.substring(0, 40) + '...' : resource}
                                    </a>
                                </li>
                            ))}
                            {technology.resources.length > 2 && (
                                <li className="more-resources">
                                    +{technology.resources.length - 2} ещё
                                </li>
                            )}
                        </ul>
                    </div>
                )}

                <div
                    onClick={() => onStatusChange(technology. id)}
                    style={{ cursor: 'pointer'}}
                    className="status-section"
                >
                    <p className="status-label">{technology.status}</p>
                </div>
            </div>
            <TechnologyNotes
                notes={technology.notes}
                onNotesChange={onNotesChange}
                techId={technology.id}
            />
        </div>
    );
}

export default TechnologyCard;