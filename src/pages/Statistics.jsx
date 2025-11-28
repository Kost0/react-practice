import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Statistics.css';

function Statistics() {
    const [technologies, setTechnologies] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        notStarted: 0,
        progress: 0
    });

    useEffect(() => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const techs = JSON.parse(saved);
            setTechnologies(techs);

            const completed = techs.filter(t => t.status === 'completed').length;
            const inProgress = techs.filter(t => t.status === 'in-progress').length;
            const notStarted = techs.filter(t => t.status === 'not-started').length;
            const progress = techs.length > 0 ? Math.round((completed / techs.length) * 100) : 0;

            setStats({
                total: techs.length,
                completed,
                inProgress,
                notStarted,
                progress
            });
        }
    }, []);

    const categoryStats = technologies.reduce((acc, tech) => {
        if (!acc[tech.category]) {
            acc[tech.category] = { total: 0, completed: 0 };
        }
        acc[tech.category].total++;
        if (tech.status === 'completed') {
            acc[tech.category].completed++;
        }
        return acc;
    }, {});

    return (
        <div className="page statistics-page">
            <div className="page-header">
                <Link to="/" className="back-link">
                    ← Назад на главную
                </Link>
                <h1>Статистика обучения</h1>
            </div>

            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Всего технологий</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.completed}</div>
                        <div className="stat-label">Завершено</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🔄</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.inProgress}</div>
                        <div className="stat-label">В процессе</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">⏸️</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.notStarted}</div>
                        <div className="stat-label">Не начато</div>
                    </div>
                </div>
            </div>

            <div className="progress-chart">
                <h2>Общий прогресс</h2>
                <div className="circular-progress">
                    <svg viewBox="0 0 200 200" className="progress-ring">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#667eea" />
                                <stop offset="100%" stopColor="#764ba2" />
                            </linearGradient>
                        </defs>
                        <circle
                            className="progress-ring-bg"
                            cx="100"
                            cy="100"
                            r="85"
                        />
                        <circle
                            className="progress-ring-fill"
                            cx="100"
                            cy="100"
                            r="85"
                            style={{
                                strokeDasharray: `${stats.progress * 5.34} 534`,
                                strokeDashoffset: 0
                            }}
                        />
                    </svg>
                    <div className="progress-text">
                        <div className="progress-percentage">{stats.progress}%</div>
                        <div className="progress-subtitle">завершено</div>
                    </div>
                </div>
            </div>

            <div className="bar-chart">
                <h2>Прогресс по статусам</h2>
                <div className="chart-container">
                    <div className="bar-item">
                        <div className="bar-label">Завершено</div>
                        <div className="bar-wrapper">
                            <div
                                className="bar bar-completed"
                                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                            >
                                <span className="bar-value">{stats.completed}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bar-item">
                        <div className="bar-label">В процессе</div>
                        <div className="bar-wrapper">
                            <div
                                className="bar bar-progress"
                                style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                            >
                                <span className="bar-value">{stats.inProgress}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bar-item">
                        <div className="bar-label">Не начато</div>
                        <div className="bar-wrapper">
                            <div
                                className="bar bar-not-started"
                                style={{ width: `${stats.total > 0 ? (stats.notStarted / stats.total) * 100 : 0}%` }}
                            >
                                <span className="bar-value">{stats.notStarted}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {Object.keys(categoryStats).length > 0 && (
                <div className="category-stats">
                    <h2>Статистика по категориям</h2>
                    <div className="category-grid">
                        {Object.entries(categoryStats).map(([category, data]) => {
                            const categoryProgress = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
                            return (
                                <div key={category} className="category-card">
                                    <h3>{category}</h3>
                                    <div className="category-progress">
                                        <div className="category-bar">
                                            <div
                                                className="category-bar-fill"
                                                style={{ width: `${categoryProgress}%` }}
                                            />
                                        </div>
                                        <span className="category-percentage">{categoryProgress}%</span>
                                    </div>
                                    <div className="category-details">
                                        <span>{data.completed} / {data.total} завершено</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Statistics;