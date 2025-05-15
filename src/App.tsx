import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CampaignDashboard from './pages/CampaignDashboard';
// import MessageGenerator from './pages/MessageGenerator';
// import Navbar from './components/layouts/Navbar';
// import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import { CampaignDashboard, MessageGenerator } from './components';
import Navbar from './components/layouts/Navbar';
import LandingPage from './pages/LandingPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/campaign" element={<CampaignDashboard />}/>
          <Route path="/message" element={<MessageGenerator />}/>
          <Route path="/landing" element={<LandingPage />}/>
          
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
