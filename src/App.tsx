import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import DiffViewer from './components/DiffViewer';
import Base64Page from './components/Base64Page';
import PercentageCalculator from './components/PercentageCalculator';
import Navbar from './components/Navbar';
import PaceCalculator from './components/PaceCalculator';
import TaskManager from './components/TaskManager';

import './styles.css';

const App = () => {

    return (
        <div>
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="diff" element={<DiffViewer />} />
                    <Route path="base64" element={<Base64Page />} />
                    <Route path="percentage-calculator" element={<PercentageCalculator />} />
                    <Route path="pace-calculator" element={<PaceCalculator />} />
                    <Route path="task-manager" element={<TaskManager />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
