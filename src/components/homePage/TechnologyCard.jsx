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

                {technology.resources && technology.resources.length > 0 && (
                    <div className="card-resources">
                        <span className="resources-label">📚 Ресурсы ({technology.resources.length})</span>
                        <ul className="resources-list">
                            {technology.resources.slice(0, 2).map((resource, index) => (
                                <li key={index}>
                                    <a
                                        href={resource}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {resource.length > 40 ? resource.substring(0, 40) + '...' : resource}
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
                    onClick={() => onStatusChange(technology.id)}
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