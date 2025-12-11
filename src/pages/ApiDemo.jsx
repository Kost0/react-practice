import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';
import './ApiDemo.css';

function ApiDemo() {
    const { technologies, loading, error, refetch } = useTechnologiesApi();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [addedNotification, setAddedNotification] = useState('');

    useEffect(() => {
        if (! searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            searchGitHub(searchQuery);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const searchGitHub = async (query) => {
        setSearching(true);
        setSearchError(null);

        try {
            const response = await fetch(
                `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}+stars:>1000&sort=stars&per_page=12`
            );

            if (!response.ok) {
                throw new Error('Ошибка поиска');
            }

            const data = await response.json();
            setSearchResults(data.items || []);
        } catch (err) {
            setSearchError(err.message);
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const addTechnology = (repo) => {
        const existingTechnologies = JSON.parse(localStorage.getItem('technologies') || '[]');

        const isDuplicate = existingTechnologies.some(
            tech => tech.title. toLowerCase() === repo.name.toLowerCase()
        );

        if (isDuplicate) {
            setAddedNotification(`❌ ${repo.name} уже добавлен`);
            setTimeout(() => setAddedNotification(''), 3000);
            return;
        }

        const newTechnology = {
            id: Date.now(),
            title: repo.name,
            description: repo.description || 'Нет описания',
            status: 'not-started',
            notes: '',
            category: 'general',
            resources: [repo.html_url]
        };

        const updatedTechnologies = [...existingTechnologies, newTechnology];
        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

        setAddedNotification(`${repo.name} добавлен в список`);
        setTimeout(() => setAddedNotification(''), 3000);

        refetch();
    };

    if (loading) {
        return (
            <div className="api-demo-loading">
                <div className="spinner-large"></div>
                <p>Загрузка технологий из API...</p>
            </div>
        );
    }

    return (
        <div className="page api-demo-page">
            <div className="page-header">
                <Link to="/react-practice/" className="back-link">
                    Назад на главную
                </Link>
                <div className="header-content">
                    <h1>Поиск технологий</h1>
                    <button onClick={refetch} className="refresh-btn">
                        Обновить данные
                    </button>
                </div>
            </div>

            {error && (
                <div className="api-error">
                    <h3>Произошла ошибка</h3>
                    <p>{error}</p>
                    <button onClick={refetch} className="retry-btn">
                        Попробовать снова
                    </button>
                </div>
            )}

            {addedNotification && (
                <div className="add-notification">
                    {addedNotification}
                </div>
            )}

            <div className="search-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Поиск технологий на GitHub (например:  react, vue, python)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    {searching && <div className="search-spinner"></div>}
                </div>

                {searchError && (
                    <div className="search-error">
                        {searchError}
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h2>Результаты поиска ({searchResults.length})</h2>
                        <div className="results-grid">
                            {searchResults.map((repo) => (
                                <div key={repo.id} className="result-card">
                                    <h3>{repo.name}</h3>
                                    <p>{repo.description || 'Нет описания'}</p>
                                    <button
                                        onClick={() => addTechnology(repo)}
                                        className="add-btn"
                                    >
                                        Добавить
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {searchQuery && ! searching && searchResults.length === 0 && ! searchError && (
                    <div className="no-results">
                        <p>Ничего не найдено</p>
                        <p className="no-results-hint">Попробуйте другой запрос</p>
                    </div>
                )}
            </div>

            <RoadmapImporter onImport={(newTechnologies) => {
                console.log('Импортировано технологий:', newTechnologies. length);
                refetch();
            }} />
        </div>
    );
}

export default ApiDemo;