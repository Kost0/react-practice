import { useState, useEffect } from 'react';

function useTechnologiesApi() {
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTechnologies = async () => {
        try {
            setLoading(true);
            setError(null);

            await new Promise(resolve => setTimeout(resolve, 1000));

            // Проверяем localStorage - если есть данные, используем их
            const savedTechnologies = localStorage.getItem('technologies');

            if (savedTechnologies && JSON.parse(savedTechnologies).length > 0) {
                setTechnologies(JSON.parse(savedTechnologies));
            } else {
                const mockTechnologies = [
                    {
                        id: 1,
                        title: 'React',
                        description: 'Библиотека для создания пользовательских интерфейсов',
                        category: 'frontend',
                        difficulty: 'beginner',
                        status: 'not-started',
                        notes: '',
                        resources: ['https://react.dev', 'https://ru.reactjs.org']
                    },
                    {
                        id: 2,
                        title: 'Node.js',
                        description: 'Среда выполнения JavaScript на сервере',
                        category: 'backend',
                        difficulty: 'intermediate',
                        status: 'not-started',
                        notes: '',
                        resources: ['https://nodejs.org', 'https://nodejs.org/ru/docs/']
                    },
                    {
                        id: 3,
                        title: 'TypeScript',
                        description: 'Типизированное надмножество JavaScript',
                        category: 'frontend',
                        difficulty: 'intermediate',
                        status: 'not-started',
                        notes: '',
                        resources: ['https://www.typescriptlang.org']
                    },
                    {
                        id: 4,
                        title: 'PostgreSQL',
                        description: 'Объектно-реляционная система управления базами данных',
                        category: 'database',
                        difficulty: 'intermediate',
                        status: 'not-started',
                        notes: '',
                        resources: ['https://www.postgresql.org']
                    },
                    {
                        id: 5,
                        title: 'Docker',
                        description: 'Платформа для разработки, доставки и запуска приложений',
                        category: 'devops',
                        difficulty: 'intermediate',
                        status: 'not-started',
                        notes: '',
                        resources: ['https://www.docker.com']
                    }
                ];

                setTechnologies(mockTechnologies);
                localStorage.setItem('technologies', JSON.stringify(mockTechnologies));
            }
        } catch (err) {
            setError('Не удалось загрузить технологии');
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };

    const addTechnology = async (techData) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            const newTech = {
                id: Date.now(),
                ...techData,
                status: techData.status || 'not-started',
                notes: techData.notes || '',
                createdAt: new Date().toISOString()
            };

            const updatedTechnologies = [...technologies, newTech];
            setTechnologies(updatedTechnologies);
            localStorage.setItem('technologies', JSON.stringify(updatedTechnologies));

            return newTech;
        } catch (err) {
            throw new Error('Не удалось добавить технологию');
        }
    };

    useEffect(() => {
        fetchTechnologies();
    }, []);

    return {
        technologies,
        loading,
        error,
        refetch: fetchTechnologies,
        addTechnology
    };
}

export default useTechnologiesApi;