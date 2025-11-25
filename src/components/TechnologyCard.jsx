import './TechnologyCard.css'
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({ key, technology, onStatusChange, onNotesChange }) {
    return (
        <div
            className="technology-card"
            data-status={technology.status}
        >
            <div
                onClick={onStatusChange}
                style={{ cursor: 'pointer'}}
            >
                <h3>{technology.title}</h3>
                <p>{technology.description}</p>
                <p>{technology.status}</p>
            </div>
            <TechnologyNotes
                notes={technology.notes}
                onNotesChange={onNotesChange}
                techId={key}
            />
        </div>
    );
}

export default TechnologyCard;