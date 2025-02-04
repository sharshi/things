import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import DiffViewer from './components/DiffViewer';
import Base64Page from './components/Base64Page';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diff" element={<DiffViewer />} />
            <Route path="/base64" element={<Base64Page />} />
        </Routes>
    );
};

export default App;
