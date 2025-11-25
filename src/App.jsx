import './App.css';
//import { useEffect } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import QuickActions from "./components/QuickActions.jsx";
import useTechnologies from "./hooks/useTechnologies.js";
import ProgressBar from "./components/ProgressBar.jsx";

function App() {
    const { technologies, updateStatus, updateNotes, progress } = useTechnologies();

    const changeStatus = (id) => {
        updateStatus(prev => prev.map(tech => {
            if (tech.id === id) {
                let newStatus;
                if (tech.status === 'not-started') {
                    newStatus = 'in-progress'
                } else if (tech.status === 'in-progress') {
                    newStatus = 'completed'
                } else {
                    newStatus = 'not-started'
                }
                return {...tech, status: newStatus}
            }
            return tech;
        }))
    };

    const markAllCompleted = () => {
        updateStatus(prev => prev.map(tech => ({...tech, status: 'completed'})));
    };

    const resetAllStatuses = () => {
        updateStatus(prev => prev.map(tech => ({...tech, status: 'not-started'})));
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
                    color="#4CAF50"
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
                            onStatusChange={updateStatus}
                            onNotesChange={updateNotes}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;