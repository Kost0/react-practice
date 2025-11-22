import './TechnologyCard.css'
import TechnologyNotes from "./TechnologyNotes.jsx";

function TechnologyCard({id, title, description, status, onStatusChange, notes, onNotesChange}) {
    return (
        <div
            className="technology-card"
            data-status={status}
        >
            <div
                onClick={onStatusChange}
                style={{ cursor: 'pointer'}}
            >
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{status}</p>
            </div>
            <TechnologyNotes
                notes={notes}
                onNotesChange={onNotesChange}
                techId={id}
            />
        </div>
    );
}

export default TechnologyCard;