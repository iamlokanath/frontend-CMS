import React from 'react'
import '../components/styles/Home.css';
import Navbar from '../components/layouts/Navbar';
import LandingPage from './LandingPage';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
    </div>
  )
}

export default Home