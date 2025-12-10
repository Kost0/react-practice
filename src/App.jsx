import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import ApiDemo from './pages/ApiDemo';
import TechnologySearch from './pages/TechnologySearch';
import Forms from "./pages/Forms.jsx";
import Notifications from "./pages/Notifications.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = localStorage.getItem('username') || '';
        setIsLoggedIn(loggedIn);
        setUsername(user);
    }, []);

    const handleLogin = (user) => {
        setIsLoggedIn(true);
        setUsername(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <div className="App">
                <Navigation
                    isLoggedIn={isLoggedIn}
                    username={username}
                    onLogout={handleLogout}
                />
                <main className="main-content">
                    <Routes>
                        <Route path="/react-practice/" element={<Home />} />
                        <Route path="/react-practice/technologies" element={<TechnologyList />} />
                        <Route path="/react-practice/technology/:techId" element={<TechnologyDetail />} />
                        <Route path="/react-practice/statistics" element={<Statistics />} />
                        <Route path="/react-practice/api-demo" element={<ApiDemo />} />
                        <Route path="/react-practice/forms" element={<Forms />} />
                        <Route path="/react-practice/search" element={<TechnologySearch />} />
                        <Route path="/react-practice/notifications" element={<Notifications />} />
                        <Route path="/react-practice/settings" element={<Settings />} />

                        <Route
                            path="/react-practice/login"
                            element={<Login onLogin={handleLogin} />}
                        />

                        <Route
                            path="/react-practice/add-technology"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <AddTechnology />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/react-practice/dashboard"
                            element={
                                <ProtectedRoute isLoggedIn={isLoggedIn}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;