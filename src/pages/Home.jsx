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
        if (!tech) return;

        let newStatus;
        if (tech.status === 'not-started') {
            newStatus = 'in-progress';
        } else if (tech.status === 'in-progress') {
            newStatus = 'completed';
        } else {
            newStatus = 'not-started';
        }
        updateStatus(id, newStatus);

        if (window.showNotification) {
            const messages = {
                'not-started': 'Статус изменен на "Не начато"',
                'in-progress': 'Статус изменен на "В процессе"',
                'completed': '🎉 Технология завершена!'
            };
            window.showNotification(messages[newStatus], newStatus === 'completed' ? 'success' : 'info');
        }
    };

    const markAllCompleted = () => {
        updateAllStatuses('completed');
        if (window.showNotification) {
            window.showNotification('🎉 Все технологии отмечены как завершенные!', 'success');
        }
    };

    const resetAllStatuses = () => {
        updateAllStatuses('not-started');
        if (window.showNotification) {
            window.showNotification('Статусы всех технологий сброшены', 'info');
        }
    };

    const pickRandomTechnology = () => {
        const notStarted = technologies.filter(tech => tech.status === 'not-started');

        if (notStarted.length === 0) {
            if (window.showNotification) {
                window.showNotification('Все технологии уже изучены! 🎓', 'warning');
            }
            return;
        }

        const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];

        if (window.showNotification) {
            window.showNotification(`Следующая технология: ${randomTech.title}`, 'info');
        }

        changeStatus(randomTech.id);
    };

    // Фильтрация технологий
    const filteredTechnologies = technologies.filter(tech => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'completed') return tech.status === 'completed';
        if (activeFilter === 'in-progress') return tech.status === 'in-progress';
        if (activeFilter === 'not-started') return tech.status === 'not-started';
        return true;
    });

    // Подсчет для фильтров
    const filterCounts = {
        all: technologies.length,
        completed: technologies.filter(t => t.status === 'completed').length,
        inProgress: technologies.filter(t => t.status === 'in-progress').length,
        notStarted: technologies.filter(t => t.status === 'not-started').length
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
                    counts={filterCounts}
                />

                <div className="technology-grid">
                    {filteredTechnologies.map(tech => (
                        <TechnologyCard
                            key={tech.id}
                            technology={tech}
                            onStatusChange={changeStatus}
                            onNotesChange={updateNotes}
                        />
                    ))}
                </div>

                {technologies.length === 0 && (
                    <div className="empty-state">
                        <p>У вас пока нет технологий для изучения.</p>
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