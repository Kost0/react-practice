import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, username, onLogout }) {
    const location = useLocation();

    return (
        <nav className="main-navigation">
            <div className="nav-brand">
                <Link to="/react-practice/">
                    <h2>Трекер технологий</h2>
                </Link>
            </div>

            <ul className="nav-menu">
                <li>
                    <Link
                        to="/react-practice/"
                        className={location.pathname === '/react-practice/' ? 'active' : ''}
                    >
                        Главная
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/technologies"
                        className={location. pathname === '/react-practice/technologies' ? 'active' : ''}
                    >
                        Все технологии
                    </Link>
                </li>

                {isLoggedIn ?  (
                    <>
                        <li>
                            <Link
                                to="/react-practice/add-technology"
                                className={location.pathname === '/react-practice/add-technology' ?  'active' : ''}
                            >
                                Добавить технологию
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/react-practice/dashboard"
                                className={location. pathname === '/react-practice/dashboard' ? 'active' : ''}
                            >
                                Панель управления
                            </Link>
                        </li>
                    </>
                ) : null}

                <li>
                    <Link
                        to="/react-practice/statistics"
                        className={location. pathname === '/react-practice/statistics' ? 'active' : ''}
                    >
                        Статистика
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/api-demo"
                        className={location. pathname === '/react-practice/api-demo' ? 'active' : ''}
                    >
                        API
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/search"
                        className={location. pathname === '/react-practice/search' ? 'active' : ''}
                    >
                        Поиск
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/forms"
                        className={location. pathname === '/react-practice/forms' ? 'active' : ''}
                    >
                        Формы
                    </Link>
                </li>
                <li>
                    <Link
                        to="/react-practice/settings"
                        className={location.pathname === '/react-practice/settings' ? 'active' : ''}
                    >
                        Настройки
                    </Link>
                </li>

                {isLoggedIn ?  (
                    <li className="user-info">
                        <span className="username">{username}</span>
                        <button onClick={onLogout} className="logout-btn">
                            Выйти
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link
                            to="/react-practice/login"
                            className={location.pathname === '/react-practice/login' ? 'active' :  ''}
                        >
                            Войти
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;