import './App.css';
//import { useEffect } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import QuickActions from "./components/QuickActions.jsx";
import useTechnologies from "./hooks/useTechnologies.js";
import ProgressBar from "./components/ProgressBar.jsx";

function App() {
    const { technologies, updateStatus, updateNotes, updateAllStatuses, progress } = useTechnologies();

    const changeStatus = (id) => {
        const tech = technologies.find(t => t.id === id);
        if (!tech) return;

        let newStatus;
        if (tech.status === 'not-started') {
            newStatus = 'in-progress'
        } else if (tech.status === 'in-progress') {
            newStatus = 'completed'
        } else {
            newStatus = 'not-started'
        }
        updateStatus(id, newStatus);
    };

    const markAllCompleted = () => {
        updateAllStatuses('completed')
    };

    const resetAllStatuses = () => {
        updateAllStatuses('not-started')
    };

    const pickRandomTechnology = () => {
        const notStarted = technologies.filter(tech => tech.status === 'not-started');
        if (notStarted.length === 0) {
            alert('Все технологии уже изучены');
            return;
        }
        const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
        alert(`Следующая технология для изучения: ${randomTech.title}`);

        changeStatus(randomTech.id);
    };

    /*useEffect(() => {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        console.log('Данные сохранены в localStorage');
    }, [technologies]);*/


    return (
        <div className="App">
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
            </main>
        </div>
    );
}

export default App;