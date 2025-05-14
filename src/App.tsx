import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import MessageGeneratorPage from './pages/MessageGeneratorPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="md" sx={{ minHeight: '80vh', py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/message-generator" element={<MessageGeneratorPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
