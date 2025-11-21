import './FilterButtons.css'

function FilterButtons({activeFilter, onFilterChange, counts}) {
    const filters = [
        { id: 'all', label: 'Все', count: counts.all },
        { id: 'not-started', label: 'Не начато', count: counts.notStarted },
        { id: 'in-progress', label: 'В процессе', count: counts.inProgress },
        { id: 'completed', label: 'Завершено', count: counts.completed }
    ];

    return (
        <div className="filter-buttons">
            <h2>Фильтр по статусу</h2>
            <div className="filter-tabs">
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick = {() => onFilterChange(filter.id)}
                    >
                        {filter.label} <span className="count">({filter.count})</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FilterButtons;