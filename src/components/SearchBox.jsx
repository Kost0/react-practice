import './SearchBox.css'

function SearchBox({ searchQuery, onSearchChange, resultCount }) {
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Поиск технологий"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
            />
            <span className="search-count">Найдено: {resultCount}</span>
        </div>
    );
}

export default SearchBox;