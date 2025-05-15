import React from 'react';
import './App.css';
import CampaignDashboard from './components/CampaignDashboard';
import MessageGenerator from './components/MessageGenerator';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';

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
