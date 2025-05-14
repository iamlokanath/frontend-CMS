import React from 'react';
import './App.css';
import CampaignDashboard from './components/CampaignDashboard';
import MessageGenerator from './components/MessageGenerator';

function App() {
  return (
    <div className="App">
      <h1>OutFlo Campaign Management</h1>
      <CampaignDashboard />
      <hr />
      <MessageGenerator />
    </div>
  );
}

export default App;
