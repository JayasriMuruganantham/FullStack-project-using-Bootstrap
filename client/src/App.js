import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import FinanceTool from './Pages/FinanceTool'; // Assuming you have this component
import TruthOrDare from './Pages/TruthorDare'; // Assuming you have this component
import MusicHall from './Pages/MusicHall'; // Assuming you have this component
import FifteenDaysReminder from './Pages/FifteenDaysReminder'; // Assuming you have this component

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/finance-tool" element={<FinanceTool />} />
        <Route path="/truth-or-dare" element={<TruthOrDare />} />
        <Route path="/music-hall" element={<MusicHall />} />
        <Route path="/15-days-reminder" element={<FifteenDaysReminder />} />
       
      </Routes>
    </Router>
  );
}

export default App;


