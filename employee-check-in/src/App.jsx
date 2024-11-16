import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCodePage from './components/QRCodePage';
import CheckInPage from './components/CheckInPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCodePage />} />
        <Route path="/check-in" element={<CheckInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
