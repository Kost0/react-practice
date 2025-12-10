import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TechnologyCard from '../components/homePage/TechnologyCard.jsx';
import QuickActions from '../components/homePage/QuickActions.jsx';
import ProgressBar from '../components/homePage/ProgressBar.jsx';
import FilterButtons from '../components/FilterButtons.jsx';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

function Home() {
    const { technologies, updateStatus, updateNotes, updateAllStatuses, progress, initializeTechnologies } = useTechnologies();
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        initializeTechnologies();
    }, []);

    const changeStatus = (id) => {
        const tech = technologies.find(t => t.id === id);
        if (! tech) return;

        let newStatus;
        if (tech.status === 'not-started') {
            newStatus = 'in-progress';
        } else if (tech.status === 'in-progress') {
            newStatus = 'completed';
        } else {
            newStatus = 'not-started';
        }
        updateStatus(id, newStatus);
    };

    const markAllCompleted = () => {
        updateAllStatuses('completed');
    };

    const resetAllStatuses = () => {
        updateAllStatuses('not-started');
    };

    const pickRandomTechnology = () => {
        const notStarted = technologies.filter(tech => tech.status === 'not-started');

        if (notStarted.length === 0) {
            alert('Все технологии уже изучены');
            return;
        }

        const randomTech = notStarted[Math. floor(Math.random() * notStarted.length)];
        alert(`Следующая технология для изучения: ${randomTech.title}`);

        changeStatus(randomTech.id);
    };

    // Фильтрация технологий по статусу
    const filteredTechnologies = technologies.filter(tech => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'not-started') return tech.status === 'not-started';
        if (activeFilter === 'in-progress') return tech.status === 'in-progress';
        if (activeFilter === 'completed') return tech.status === 'completed';
        return true;
    });

    // Подсчет количества технологий по статусам
    const counts = {
        all: technologies.length,
        notStarted: technologies.filter(t => t.status === 'not-started').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length,
        completed: technologies.filter(t => t. status === 'completed').length
    };

    return (
        <div className="home-page">
            <header className="app-header">
                <h1>Трекер изучения технологий</h1>
                <ProgressBar
                    progress={progress}
                    label="Общий прогресс"
                    color="#6e65c6"
                    animated={true}
                    height={20}
                />
            </header>

            <main className="app-main">
                <QuickActions
                    onMarkAllCompleted={markAllCompleted}
                    onResetAllStatuses={resetAllStatuses}
                    onPickRandomTechnology={pickRandomTechnology}
                    technologies={technologies}
                />

                <FilterButtons
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    counts={counts}
                />

                <div className="technology-grid">
                    {filteredTechnologies.map(tech => (
                        <TechnologyCard
                            key={tech. id}
                            technology={tech}
                            onStatusChange={changeStatus}
                            onNotesChange={updateNotes}
                        />
                    ))}
                </div>

                {technologies.length === 0 && (
                    <div className="empty-state">
                        <p>У вас пока нет технологий для изучения. </p>
                        <Link to="/react-practice/add-technology" className="btn btn-primary">
                            Добавить первую технологию
                        </Link>
                    </div>
                )}

                {technologies.length > 0 && filteredTechnologies.length === 0 && (
                    <div className="empty-state">
                        <p>Нет технологий с выбранным статусом.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;