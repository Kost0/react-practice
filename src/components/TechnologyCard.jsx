import './TechnologyCard.css'

function TechnologyCard({title, description, status}) {
    return (
        <div className="technology-card" data-status={status}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Статус: {status}</p>
        </div>
    );
}

export default TechnologyCard;