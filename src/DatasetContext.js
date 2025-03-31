// src/DatasetContext.js
import React, { createContext, useState } from 'react';

export const DatasetContext = createContext();

export const DatasetProvider = ({ children }) => {
  const [dataset, setDataset] = useState('moviesB'); // default dataset

  // Function to toggle between datasets.
  const toggleDataset = () => {
    setDataset(prev => (prev === 'moviesA' ? 'moviesB' : 'moviesA'));
    console.log('Switched dataset to:', dataset === 'moviesA' ? 'moviesB' : 'moviesA');
  };

  return (
    <DatasetContext.Provider value={{ dataset, toggleDataset }}>
      {children}
    </DatasetContext.Provider>
  );
};