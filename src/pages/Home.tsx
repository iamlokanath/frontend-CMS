import React from 'react'
import '../components/styles/Home.css';
import Navbar from '../components/layouts/Navbar';
import LandingPage from './LandingPage';
import Footer from '../components/layouts/Footer';
import MissionSection from './MissionSection';
import StepsSection from './StepsSection';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
      <StepsSection />
      <MissionSection />
      <Footer />
    </div>
  )
}

export default Home