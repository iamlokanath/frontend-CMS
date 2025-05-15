import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <span className="logo-icon">
            <img src="/assets/logo.png" alt="logo" />
          </span>
          <span className="logo-text">CMS</span>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Lorem</h4>
            <ul>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Lorem</h4>
            <ul>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Lorem</h4>
            <ul>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
              <li>lorem</li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <p>Follow us on</p>
          <div className="social-icons">
            <a href="https://twitter.com"><i className="fab fa-twitter" /></a>
            <a href="https://linkedin.com"><i className="fab fa-linkedin" /></a>
            <a href="https://facebook.com"><i className="fab fa-facebook" /></a>
          </div>

        </div>
      </div>
      <div className="footer-bottom">
        <p>© Campaign Manager 2025. All Rights Reserved. Website is designed and developed by Lokanath Panda</p>
      </div>
    </footer>
  );
};

export default Footer;
