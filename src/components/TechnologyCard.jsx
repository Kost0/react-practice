import './TechnologyCard.css'
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
    return (
        <div
            className="technology-card"
            data-status={technology.status}
        >
            <div>
                <h3>{technology.title}</h3>
                <p>{technology.description}</p>
                <p>{technology.category}</p>
                <div
                    onClick={() => onStatusChange(technology.id)}
                     style={{ cursor: 'pointer'}}
                >
                    <p>{technology.status}</p>
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