import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import DiffViewer from './components/DiffViewer';
import Base64Page from './components/Base64Page';
import PercentageCalculator from './components/PercentageCalculator';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diff" element={<DiffViewer />} />
            <Route path="/base64" element={<Base64Page />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="*" element={<Home />} />
        </Routes>
    );
};

export default App;
