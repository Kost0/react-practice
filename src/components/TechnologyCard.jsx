function TechnologyCard({title, description, status}) {
    return (
        <div className="technology-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Статус: {status}</p>
        </div>
    );
}

export default TechnologyCard;