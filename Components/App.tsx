import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

import HomePage from './home/HomePage';
import Chart from './chart/ChartPage';
import Header from './common/Header';

function App() {
    return (
        <div className="container-fluid">
            <Header/>
            <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/chart" element={<Chart />} />
            </Routes>
        </div>
    );
}

export default App;