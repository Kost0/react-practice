import './App.css';
import { useState, useEffect } from "react";
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";
import QuickActions from "./components/QuickActions.jsx";
import FilterButtons from "./components/FilterButtons.jsx";
import SearchBox from "./components/SearchBox.jsx";

function App() {
    const [technologies, setTechnologies] = useState(() => {
        const saved = localStorage.getItem('techTrackerData');
        if (saved) {
            console.log('Данные загружены из localStorage');
            return JSON.parse(saved);
        }
        return [
            { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed', notes: '' },
            { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress', notes: '' },
            { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started', notes: '' }
        ];
    });

    const [activeFilter, setActiveFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('');

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
        const matchesFilter = activeFilter === 'all' || tech.status === activeFilter;
        const matchesSearch = tech.title.toLowerCase().includes(searchQuery.toLowerCase()) || tech.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch
    });

    useEffect(() => {
        localStorage.setItem('techTrackerData', JSON.stringify(technologies));
        console.log('Данные сохранены в localStorage');
    }, [technologies]);

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === techId ? {...tech, notes: newNotes } : tech
            )
        );
    };

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

            <SearchBox
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                resultCount={filteredTechnologies.length}
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
                            id={technology.id}
                            title={technology.title}
                            description={technology.description}
                            status={technology.status}
                            onStatusChange={() => changeStatus(technology.id)}
                            notes={technology.notes}
                            onNotesChange={updateTechnologyNotes}
                        />
                    </li>
                )}
            </ul>
            {filteredTechnologies.length === 0 && (
                <p className="no-results">
                    {searchQuery ? 'Ничего не найдено по вашему запросу' : 'Нет технологий с выбранным статусом'}
                </p>
            )}
        </div>
    );
}

export default App;