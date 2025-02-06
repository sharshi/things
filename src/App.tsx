import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './components/Home';
import DiffViewer from './components/DiffViewer';
import Base64Page from './components/Base64Page';
import PercentageCalculator from './components/PercentageCalculator';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', boxSizing: 'border-box' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="diff" element={<DiffViewer />} />
                    <Route path="base64" element={<Base64Page />} />
                    <Route path="percentage-calculator" element={<PercentageCalculator />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
