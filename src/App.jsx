import './App.css';
import TechnologyCard from "./components/TechnologyCard.jsx";
import ProgressHeader from "./components/ProgressHeader.jsx";

function App() {
    const technologies = [
        { id: 1, title: 'React Components', description: 'Изучение базовых компонентов', status: 'completed' },
        { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'in-progress' },
        { id: 3, title: 'State Management', description: 'Работа с состоянием компонентов', status: 'not-started' }
    ]

    let completed = 0;
    technologies.forEach(tech => {
        if (tech.status === 'completed') {
        completed++
        }
    })

    return (
        <div className="App">
            <ProgressHeader
                amount={technologies.length}
                studied={completed}
            />

            <ul>
                {technologies.map(technology =>
                    <li key={technology.id}>
                        <TechnologyCard
                            title={technology.title}
                            description={technology.description}
                            status={technology.status}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App;