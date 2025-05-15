import React from 'react';
import './App.css';
import CampaignDashboard from './pages/CampaignDashboard';
import MessageGenerator from './pages/MessageGenerator';
import Navbar from './components/layouts/Navbar';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
      <hr />
      <CampaignDashboard />
      <hr />
      <MessageGenerator />
    </div>
  );
}

export default App;
