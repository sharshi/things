import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import DiffViewer from './components/DiffViewer';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diff" element={<DiffViewer />} />
        </Routes>
    );
};

export default App;