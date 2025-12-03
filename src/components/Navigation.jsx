import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    const location = useLocation();

    return (
        <nav className="main-navigation">
            <div className="nav-brand">
                <Link to="/react-practice/">
                    <h2>🚀 Трекер технологий</h2>
                </Link>
            </div>

            <ul className="nav-menu">
                <li>
                    <Link
                        to="/react-practice/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        Главная
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/technologies"
                        className={location.pathname === '/technologies' ? 'active' : ''}
                    >
                        Все технологии
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/add-technology"
                        className={location.pathname === '/add-technology' ? 'active' : ''}
                    >
                        Добавить технологию
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/statistics"
                        className={location.pathname === '/statistics' ? 'active' : ''}
                    >
                        Статистика
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/api-demo"
                        className={location.pathname === '/api-demo' ? 'active' : ''}
                    >
                        API
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/search"
                        className={location.pathname === '/search' ? 'active' : ''}
                    >
                        Поиск
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/forms"
                        className={location.pathname === '/forms' ? 'active' : ''}
                    >
                        Формы
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/notifications"
                        className={location.pathname === '/notifications' ?  'active' : ''}
                    >
                        Уведомления
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/settings"
                        className={location.pathname === '/settings' ? 'active' : ''}
                    >
                        Настройки
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;