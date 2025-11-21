import './TechnologyCard.css'

function TechnologyCard({title, description, status, onStatusChange}) {
    return (
        <div
            className="technology-card"
            data-status={status}
            onClick={onStatusChange}
        >
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{status}</p>
        </div>
    );
}

export default TechnologyCard;