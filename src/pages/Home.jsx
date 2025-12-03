import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import TechnologyCard from '../components/homePage/TechnologyCard.jsx';
import QuickActions from '../components/homePage/QuickActions.jsx';
import ProgressBar from '../components/homePage/ProgressBar.jsx';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

function Home() {
    const { technologies, updateStatus, updateNotes, updateAllStatuses, progress, initializeTechnologies } = useTechnologies();

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
    };

    const markAllCompleted = () => {
        updateAllStatuses('completed');
    };

    const resetAllStatuses = () => {
        updateAllStatuses('not-started');
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
                    technologies={technologies}
                />

                <div className="technology-grid">
                    {technologies.map(tech => (
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
                        <Link to="/add-technology" className="btn btn-primary">
                            Добавить первую технологию
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;