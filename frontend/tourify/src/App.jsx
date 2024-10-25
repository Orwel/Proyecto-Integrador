// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
