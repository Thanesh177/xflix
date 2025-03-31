// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetail from './MovieDetail';
import PasscodeGate from './PasscodeGate';
import { DatasetProvider } from './DatasetContext';


function App() {
  return (
    <PasscodeGate>
        <DatasetProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
          </Routes>
        </DatasetProvider>
    </PasscodeGate>
  );
}

export default App;