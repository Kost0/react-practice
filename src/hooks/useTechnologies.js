import useLocalStorage from './useLocalStorage.js'

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 3,
        title: 'React hooks',
        description: 'Написание своих хуков',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'Data bases',
        description: 'Работа с базами данных',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
    {
        id: 5,
        title: 'Go',
        description: 'Написание серверных приложений',
        status: 'not-started',
        notes: '',
        category: 'backend'
    },
]

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const updateStatus = (techId, newStatus) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateNotes = (techId, newNotes) => {
        setTechnologies(prev =>
            prev.map(tech =>
                tech.id === techId ? { ...tech, notes: newNotes } : tech
            )
        );
    };

    const updateAllStatuses = (newStatus) => {
        setTechnologies(prev =>
            prev.map(tech => ( {...tech, status: newStatus }))
        );
    };

    const calculateProgress = () => {
        if (technologies.length === 0) return 0;
        const completed = technologies.filter(tech => tech.status === 'completed').length;
        return Math.round((completed / technologies.length) * 100);
    };

    const initializeTechnologies = () => {
        const saved = localStorage.getItem('technologies');
        if (!saved || JSON.parse(saved).length === 0) {
            setTechnologies(initialTechnologies);
        }
    };

    return {
        technologies,
        updateStatus,
        updateNotes,
        updateAllStatuses,
        progress: calculateProgress(),
        initializeTechnologies
    };
}

export default useTechnologies;