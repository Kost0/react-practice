import { Link } from 'react-router-dom';
import useTechnologiesApi from '../hooks/useTechnologiesApi';
import RoadmapImporter from '../components/RoadmapImporter';
import './ApiDemo.css';

function ApiDemo() {
    const { technologies, loading, error, refetch } = useTechnologiesApi();

    const handleImport = (newTechnologies) => {
        console.log('Импортировано технологий:', newTechnologies.length);
    };

    if (loading) {
        return (
            <div className="api-demo-loading">
                <div className="spinner-large"></div>
                <p>Загрузка технологий из API...</p>
            </div>
        );
    }

    return (
        <div className="page api-demo-page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    ← Назад на главную
                </Link>
                <div className="header-content">
                    <h1>Работа с API</h1>
                    <button onClick={refetch} className="refresh-btn">
                        🔄 Обновить данные
                    </button>
                </div>
            </div>

            {error && (
                <div className="api-error">
                    <h3>⚠️ Произошла ошибка</h3>
                    <p>{error}</p>
                    <button onClick={refetch} className="retry-btn">
                        Попробовать снова
                    </button>
                </div>
            )}

            <RoadmapImporter onImport={handleImport} />
        </div>
    );
}

export default ApiDemo;