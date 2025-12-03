import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
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
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation />
                <main className="main-content">
                    <Routes>
                        <Route path="/react-practice/" element={<Home />} />
                        <Route path="/react-practice/technologies" element={<TechnologyList />} />
                        <Route path="/react-practice/technology/:techId" element={<TechnologyDetail />} />
                        <Route path="/react-practice/add-technology" element={<AddTechnology />} />
                        <Route path="/react-practice/statistics" element={<Statistics />} />
                        <Route path="/react-practice/settings" element={<Settings />} />
                        <Route path="/react-practice/api-demo" element={<ApiDemo />} />
                        <Route path="/react-practice/forms" element={<Forms />} />
                        <Route path="/react-practice/search" element={<TechnologySearch />} />
                        <Route path="/react-practice/notifications" element={<Notifications />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;