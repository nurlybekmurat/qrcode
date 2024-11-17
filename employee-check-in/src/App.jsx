import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import CheckInPage from './components/CheckInPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodeGenerator />} />
        <Route path="/check-in" element={<CheckInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
