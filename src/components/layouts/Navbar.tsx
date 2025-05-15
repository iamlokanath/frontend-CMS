import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="logo">        
        <img src="/assets/logo.png" alt="Prodmast Logo" className="logo-icon" />
        <span className="logo-text">Campaign Manager</span>
      </div>

      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/">Campaign</a>
        <a href="/">Message Generator</a>
      </div>

      <button className="signup-btn">Contact Us</button>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
