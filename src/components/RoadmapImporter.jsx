import { useState } from 'react';
import './RoadmapImporter.css';

function RoadmapImporter({ onImport }) {
    const [importing, setImporting] = useState(false);
    const [selectedRoadmap, setSelectedRoadmap] = useState('frontend');

    const mockRoadmaps = {
        frontend: {
            name: 'Frontend Developer',
            technologies: [
                {
                    title: 'HTML5',
                    description: 'Язык разметки для создания веб-страниц',
                    category: 'frontend',
                    difficulty: 'beginner',
                    resources: ['https://developer.mozilla.org/ru/docs/Web/HTML']
                },
                {
                    title: 'CSS3',
                    description: 'Каскадные таблицы стилей для оформления веб-страниц',
                    category: 'frontend',
                    difficulty: 'beginner',
                    resources: ['https://developer.mozilla.org/ru/docs/Web/CSS']
                },
                {
                    title: 'JavaScript',
                    description: 'Язык программирования для веб-разработки',
                    category: 'frontend',
                    difficulty: 'intermediate',
                    resources: ['https://learn.javascript.ru']
                },
                {
                    title: 'React',
                    description: 'Библиотека для создания пользовательских интерфейсов',
                    category: 'frontend',
                    difficulty: 'intermediate',
                    resources: ['https://react.dev']
                },
                {
                    title: 'Vue.js',
                    description: 'Прогрессивный фреймворк для создания UI',
                    category: 'frontend',
                    difficulty: 'intermediate',
                    resources: ['https://vuejs.org']
                }
            ]
        },
        backend: {
            name: 'Backend Developer',
            technologies: [
                {
                    title: 'Node.js',
                    description: 'Среда выполнения JavaScript на сервере',
                    category: 'backend',
                    difficulty: 'intermediate',
                    resources: ['https://nodejs.org']
                },
                {
                    title: 'Express.js',
                    description: 'Веб-фреймворк для Node.js',
                    category: 'backend',
                    difficulty: 'intermediate',
                    resources: ['https://expressjs.com']
                },
                {
                    title: 'Python',
                    description: 'Язык программирования для backend разработки',
                    category: 'backend',
                    difficulty: 'beginner',
                    resources: ['https://www.python.org']
                },
                {
                    title: 'Django',
                    description: 'Высокоуровневый веб-фреймворк на Python',
                    category: 'backend',
                    difficulty: 'intermediate',
                    resources: ['https://www.djangoproject.com']
                }
            ]
        },
        fullstack: {
            name: 'Full Stack Developer',
            technologies: [
                {
                    title: 'React',
                    description: 'Библиотека для создания пользовательских интерфейсов',
                    category: 'frontend',
                    difficulty: 'intermediate',
                    resources: ['https://react.dev']
                },
                {
                    title: 'Node.js',
                    description: 'Среда выполнения JavaScript на сервере',
                    category: 'backend',
                    difficulty: 'intermediate',
                    resources: ['https://nodejs.org']
                },
                {
                    title: 'MongoDB',
                    description: 'NoSQL база данных',
                    category: 'database',
                    difficulty: 'intermediate',
                    resources: ['https://www.mongodb.com']
                },
                {
                    title: 'PostgreSQL',
                    description: 'Реляционная база данных',
                    category: 'database',
                    difficulty: 'intermediate',
                    resources: ['https://www.postgresql.org']
                },
                {
                    title: 'GraphQL',
                    description: 'Язык запросов для API',
                    category: 'backend',
                    difficulty: 'advanced',
                    resources: ['https://graphql.org']
                }
            ]
        },
        devops: {
            name: 'DevOps Engineer',
            technologies: [
                {
                    title: 'Docker',
                    description: 'Платформа для контейнеризации приложений',
                    category: 'devops',
                    difficulty: 'intermediate',
                    resources: ['https://www.docker.com']
                },
                {
                    title: 'Kubernetes',
                    description: 'Система оркестрации контейнеров',
                    category: 'devops',
                    difficulty: 'advanced',
                    resources: ['https://kubernetes.io']
                },
                {
                    title: 'CI/CD',
                    description: 'Непрерывная интеграция и доставка',
                    category: 'devops',
                    difficulty: 'intermediate',
                    resources: ['https://about.gitlab.com/topics/ci-cd/']
                },
                {
                    title: 'AWS',
                    description: 'Облачная платформа Amazon',
                    category: 'devops',
                    difficulty: 'advanced',
                    resources: ['https://aws.amazon.com']
                }
            ]
        }
    };

    const handleImportRoadmap = async () => {
        try {
            setImporting(true);

            await new Promise(resolve => setTimeout(resolve, 1500));

            const roadmapData = mockRoadmaps[selectedRoadmap];

            if (!roadmapData) {
                throw new Error('Дорожная карта не найдена');
            }

            const existingTechnologies = JSON.parse(localStorage.getItem('technologies') || '[]');
            const existingTitles = new Set(existingTechnologies.map(tech => tech.title.toLowerCase()));

            const newTechnologies = roadmapData.technologies
                .filter(tech => !existingTitles.has(tech.title.toLowerCase()))
                .map(tech => ({
                    id: Date.now() + Math.random(),
                    ...tech,
                    status: 'not-started',
                    notes: '',
                    createdAt: new Date().toISOString()
                }));

            if (newTechnologies.length === 0) {
                alert('Все технологии из этой дорожной карты уже добавлены!');
                setImporting(false);
                return;
            }

            const updatedTechnologies = [...existingTechnologies, ...newTechnologies];
            localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

            if (onImport) {
                onImport(newTechnologies);
            }

            alert(`Успешно импортировано ${newTechnologies.length} новых технологий из дорожной карты "${roadmapData.name}"!`);

            window.location.reload();
        } catch (err) {
            alert(`Ошибка импорта: ${err.message}`);
            console.error('Ошибка импорта:', err);
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="roadmap-importer">
            <h3>Импорт дорожной карты</h3>
            <p className="importer-description">
                Выберите готовую дорожную карту для быстрого добавления технологий
            </p>

            <div className="import-controls">
                <select
                    value={selectedRoadmap}
                    onChange={(e) => setSelectedRoadmap(e.target.value)}
                    className="roadmap-select"
                    disabled={importing}
                >
                    <option value="frontend">Frontend Developer</option>
                    <option value="backend">Backend Developer</option>
                    <option value="fullstack">Full Stack Developer</option>
                    <option value="devops">DevOps Engineer</option>
                </select>

                <button
                    onClick={handleImportRoadmap}
                    disabled={importing}
                    className="import-button"
                >
                    {importing ? (
                        <>
                            <span className="spinner-small"></span>
                            Импортирую...
                        </>
                    ) : (
                        '⬇️ Импортировать дорожную карту'
                    )}
                </button>
            </div>

            <div className="roadmap-preview">
                <h4>Технологии в выбранной дорожной карте:</h4>
                <ul className="preview-list">
                    {mockRoadmaps[selectedRoadmap].technologies.map((tech, index) => (
                        <li key={index}>
                            <strong>{tech.title}</strong> - {tech.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RoadmapImporter;