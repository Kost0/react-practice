import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [username, setUsername] = useState('');
    const [technologies, setTechnologies] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        completed:  0,
        inProgress: 0,
        notStarted: 0
    });

    useEffect(() => {
        const user = localStorage.getItem('username') || 'Пользователь';
        setUsername(user);

        const saved = localStorage.getItem('technologies');
        if (saved) {
            const techs = JSON.parse(saved);
            setTechnologies(techs);

            setStats({
                total: techs.length,
                completed: techs.filter(t => t. status === 'completed').length,
                inProgress: techs.filter(t => t.status === 'in-progress').length,
                notStarted: techs. filter(t => t.status === 'not-started').length
            });
        }
    }, []);

    return (
        <div className="page dashboard-page">
            <div className="dashboard-header">
                <h1>Панель управления</h1>
                <p className="welcome-text">Добро пожаловать, <strong>{username}</strong>!</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-info">
                        <h3>{stats.total}</h3>
                        <p>Всего технологий</p>
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon">✅</div>
                    <div className="stat-info">
                        <h3>{stats.completed}</h3>
                        <p>Завершено</p>
                    </div>
                </div>

                <div className="stat-card in-progress">
                    <div className="stat-icon">⚡</div>
                    <div className="stat-info">
                        <h3>{stats.inProgress}</h3>
                        <p>В процессе</p>
                    </div>
                </div>

                <div className="stat-card not-started">
                    <div className="stat-icon">📝</div>
                    <div className="stat-info">
                        <h3>{stats.notStarted}</h3>
                        <p>Не начато</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="info-card">
                    <h2>Защищенные данные</h2>
                    <p>Эта страница доступна только авторизованным пользователям.</p>
                    <p>Здесь вы можете управлять своими технологиями и отслеживать прогресс обучения.</p>
                </div>

                <div className="quick-links">
                    <h3>Быстрые действия</h3>
                    <div className="links-grid">
                        <Link to="/react-practice/" className="quick-link">
                            Главная страница
                        </Link>
                        <Link to="/react-practice/technologies" className="quick-link">
                            Все технологии
                        </Link>
                        <Link to="/react-practice/add-technology" className="quick-link">
                            Добавить технологию
                        </Link>
                        <Link to="/react-practice/statistics" className="quick-link">
                            Статистика
                        </Link>
                    </div>
                </div>

                {technologies.length > 0 && (
                    <div className="recent-technologies">
                        <h3>Последние добавленные технологии</h3>
                        <div className="tech-list">
                            {technologies.slice(-5).reverse().map(tech => (
                                <div key={tech.id} className="tech-item">
                                    <span className="tech-title">{tech.title}</span>
                                    <span className={`tech-status status-${tech.status}`}>
                    {tech.status === 'completed' && '✅ Завершено'}
                                        {tech.status === 'in-progress' && '⚡ В процессе'}
                                        {tech.status === 'not-started' && '📝 Не начато'}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;