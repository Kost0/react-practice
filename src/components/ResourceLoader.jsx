import { useState } from 'react';
import './ResourceLoader.css';

function ResourceLoader({ techId, techTitle, existingResources = [], onResourcesUpdated }) {
    const [loading, setLoading] = useState(false);
    const [loadedResources, setLoadedResources] = useState([]);
    const [error, setError] = useState(null);

    const mockResourcesAPI = {
        'react': [
            { title: 'React Documentation', url: 'https://react.dev', type: 'docs' },
            { title: 'React Tutorial', url: 'https://react.dev/learn', type: 'tutorial' },
            { title: 'React Hooks Guide', url: 'https://react.dev/reference/react', type: 'guide' },
            { title: 'React Community', url: 'https://react.dev/community', type: 'community' }
        ],
        'node': [
            { title: 'Node.js Docs', url: 'https://nodejs.org/docs', type: 'docs' },
            { title: 'Node.js Guides', url: 'https://nodejs.org/en/learn', type: 'tutorial' },
            { title: 'NPM Registry', url: 'https://www.npmjs.com', type: 'tool' }
        ],
        'typescript': [
            { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs', type: 'docs' },
            { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play', type: 'tool' },
            { title: 'DefinitelyTyped', url: 'https://github.com/DefinitelyTyped/DefinitelyTyped', type: 'repo' }
        ],
        'default': [
            { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', type: 'docs' },
            { title: 'Stack Overflow', url: 'https://stackoverflow.com', type: 'community' },
            { title: 'GitHub', url: 'https://github.com', type: 'repo' }
        ]
    };

    const loadResourcesFromAPI = async () => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            const searchKey = techTitle.toLowerCase().split(' ')[0];
            let resources = mockResourcesAPI[searchKey] || mockResourcesAPI['default'];

            if (Math.random() > 0.5) {
                resources = [
                    ...resources,
                    {
                        title: `${techTitle} на YouTube`,
                        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(techTitle)}`,
                        type: 'video'
                    },
                    {
                        title: `${techTitle} на Reddit`,
                        url: `https://www.reddit.com/search/?q=${encodeURIComponent(techTitle)}`,
                        type: 'community'
                    }
                ];
            }

            setLoadedResources(resources);

            const technologies = JSON.parse(localStorage.getItem('technologies') || '[]');
            const updatedTechnologies = technologies.map(tech => {
                if (tech.id === techId) {
                    const allResources = [
                        ...(tech.resources || []),
                        ...resources.map(r => r.url)
                    ];
                    const uniqueResources = [...new Set(allResources)];
                    return { ...tech, resources: uniqueResources };
                }
                return tech;
            });

            localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

            if (onResourcesUpdated) {
                onResourcesUpdated(resources);
            }

        } catch (err) {
            setError('Не удалось загрузить ресурсы');
            console.error('Ошибка загрузки ресурсов:', err);
        } finally {
            setLoading(false);
        }
    };

    const addCustomResource = () => {
        const url = prompt('Введите URL ресурса:');
        if (!url) return;

        const title = prompt('Введите название ресурса:');
        if (!title) return;

        const newResource = { title, url, type: 'custom' };

        setLoadedResources(prev => [...prev, newResource]);

        const technologies = JSON.parse(localStorage.getItem('technologies') || '[]');
        const updatedTechnologies = technologies.map(tech => {
            if (tech.id === techId) {
                return {
                    ...tech,
                    resources: [...(tech.resources || []), url]
                };
            }
            return tech;
        });

        localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

        if (onResourcesUpdated) {
            onResourcesUpdated([newResource]);
        }
    };

    const getResourceIcon = (type) => {
        const icons = {
            'docs': '📚',
            'tutorial': '🎓',
            'guide': '📖',
            'video': '🎥',
            'community': '👥',
            'tool': '🛠️',
            'repo': '💻',
            'custom': '⭐'
        };
        return icons[type] || '🔗';
    };

    return (
        <div className="resource-loader">
            <div className="loader-header">
                <h3>📦 Дополнительные ресурсы</h3>
                <div className="loader-actions">
                    <button
                        onClick={loadResourcesFromAPI}
                        disabled={loading}
                        className="load-btn"
                    >
                        {loading ? (
                            <>
                                <span className="btn-spinner"></span>
                                Загрузка...
                            </>
                        ) : (
                            '⬇️ Загрузить из API'
                        )}
                    </button>
                    <button
                        onClick={addCustomResource}
                        className="add-btn"
                    >
                        ➕ Добавить свой
                    </button>
                </div>
            </div>

            {error && (
                <div className="loader-error">
                    ⚠️ {error}
                </div>
            )}

            {loadedResources.length > 0 && (
                <div className="resources-list">
                    <h4>Найденные ресурсы ({loadedResources.length})</h4>
                    <div className="resources-grid">
                        {loadedResources.map((resource, index) => (
                            <div key={index} className="resource-item">
                                <div className="resource-icon">
                                    {getResourceIcon(resource.type)}
                                </div>
                                <div className="resource-info">
                                    <h5>{resource.title}</h5>
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="resource-link"
                                    >
                                        {resource.url}
                                    </a>
                                    <span className="resource-type">{resource.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {existingResources.length > 0 && (
                <div className="existing-resources">
                    <h4>Существующие ресурсы ({existingResources.length})</h4>
                    <ul>
                        {existingResources.map((url, index) => (
                            <li key={index}>
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {url}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ResourceLoader;