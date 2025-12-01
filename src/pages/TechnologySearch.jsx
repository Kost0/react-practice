import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './TechnologySearch.css';

function TechnologySearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allTechnologies, setAllTechnologies] = useState([]);

    const searchTimeoutRef = useRef(null);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        const loadTechnologies = () => {
            const saved = localStorage.getItem('technologies');
            if (saved) {
                setAllTechnologies(JSON.parse(saved));
            }
        };
        loadTechnologies();
    }, []);

    const searchTechnologies = async (query) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        try {
            setLoading(true);

            if (!query.trim()) {
                setSearchResults([]);
                setLoading(false);
                return;
            }

            await new Promise((resolve, reject) => {
                const timeout = setTimeout(resolve, 300);
                abortControllerRef.current.signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                    reject(new Error('Aborted'));
                });
            });

            const lowerQuery = query.toLowerCase();
            const filtered = allTechnologies.filter(tech =>
                tech.title.toLowerCase().includes(lowerQuery) ||
                tech.description.toLowerCase().includes(lowerQuery) ||
                tech.category.toLowerCase().includes(lowerQuery)
            );

            setSearchResults(filtered);
        } catch (err) {
            if (err.message !== 'Aborted') {
                console.error('Ошибка поиска:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            searchTechnologies(value);
        }, 500);
    };

    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    // Очистка поиска
    const handleClear = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <div className="page technology-search-page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    ← Назад на главную
                </Link>
                <h1>🔍 Поиск технологий</h1>
            </div>

            <div className="search-container">
                <div className="search-box-wrapper">
                    <input
                        type="text"
                        placeholder="Введите название технологии, описание или категорию..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input-large"
                    />
                    {loading && (
                        <div className="search-loader">
                            <div className="spinner-mini"></div>
                        </div>
                    )}
                    {searchTerm && (
                        <button onClick={handleClear} className="clear-button">
                            ✕
                        </button>
                    )}
                </div>

                <div className="search-info">
                    {searchTerm ? (
                        loading ? (
                            <p>Поиск...</p>
                        ) : (
                            <p>Найдено результатов: <strong>{searchResults.length}</strong></p>
                        )
                    ) : (
                        <p>Начните вводить для поиска среди {allTechnologies.length} технологий</p>
                    )}
                </div>
            </div>

            <div className="search-results-section">
                {searchResults.length > 0 ? (
                    <div className="results-grid">
                        {searchResults.map(tech => (
                            <div key={tech.id} className="result-card">
                                <div className="result-header">
                                    <h3>{tech.title}</h3>
                                    <span className={`status-indicator status-${tech.status}`}>
                                        {tech.status === 'completed' && '✓'}
                                        {tech.status === 'in-progress' && '⏳'}
                                        {tech.status === 'not-started' && '○'}
                                    </span>
                                </div>
                                <p className="result-description">{tech.description}</p>
                                <div className="result-footer">
                                    <span className="result-category">
                                        📁 {tech.category}
                                    </span>
                                    <Link
                                        to={`/technology/${tech.id}`}
                                        className="view-link"
                                    >
                                        Подробнее →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    searchTerm && !loading && (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>Ничего не найдено</h3>
                            <p>Попробуйте изменить поисковый запрос</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default TechnologySearch;