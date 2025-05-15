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
      <h1>Campaign Management</h1>
      <CampaignDashboard />
      <hr />
      <MessageGenerator />
    </div>
  );
}

export default App;
