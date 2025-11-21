import './App.css';
import { useState } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import QuickActions from "./components/QuickActions.jsx";
import FilterButtons from "./components/FilterButtons.jsx";

function App() {
    const [technologies, setTechnologies] = useState([
        { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
        { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
        { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
    ])

    const [activeFilter, setActiveFilter] = useState('all')

    const changeStatus = (id) => {
        setTechnologies(prev => prev.map(tech => {
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
        setTechnologies(prev => prev.map(tech => ({...tech, status: 'completed'})));
    };

    const resetAllStatuses = () => {
        setTechnologies(prev => prev.map(tech => ({...tech, status: 'not-started'})));
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

    const completed = technologies.filter(tech => tech.status === 'completed').length;
    const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStarted = technologies.filter(tech => tech.status === 'not-started').length;

    const filteredTechnologies = technologies.filter(tech => {
        if (activeFilter === 'all') {
            return true
        }
        return tech.status === activeFilter;
    })

    return (
        <div className="App">
            <ProgressHeader
                amount={technologies.length}
                studied={completed}
            />

            <QuickActions
                onMarkAllCompleted={markAllCompleted}
                onResetAllStatuses={resetAllStatuses}
                onPickRandomTechnology={pickRandomTechnology}
            />

            <FilterButtons
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={{all: technologies.length, completed, inProgress, notStarted}}
            />

            <ul>
                {filteredTechnologies.map(technology =>
                    <li key={technology.id}>
                        <TechnologyCard
                            title={technology.title}
                            description={technology.description}
                            status={technology.status}
                            onStatusChange={() => changeStatus(technology.id)}
                        />
                    </li>
                )}
            </ul>
            {filteredTechnologies.length === 0 && (
                <p style={{textAlign: 'center', color: '#999', padding: '20px'}}>
                    Нет технологий с выбранным статусом
                </p>
            )}
        </div>
    );
}

export default App;