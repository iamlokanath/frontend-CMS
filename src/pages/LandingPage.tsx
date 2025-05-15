import React from 'react';
import '../components/styles/LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <section className="landing">
      <div className="landing-content">
        <h1>
         AI-Powered Campaigns & LinkedIn Messaging <br /><span className="highlight">Campaign Management System</span> <br /> 
        </h1>
        <p className="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore animi, repudiandae iusto sint facere placeat cumque impedit ipsam alias.
        </p>
        <div className="cta-buttons">
          <a href="/">
          <button className="primary-btn">Create Campaign</button>
          </a>
          <a href="/">
          <button className="secondary-btn">Generate Message</button>
          </a>
        </div>
        <div className="rating">
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <span>5.0 from 80+ reviews</span>
        </div>
      </div>

      <div className="cards-grid">
        <div className="card image-card">
          <img src="/assets/logo.png" alt="Pipes" />
        </div>
        <div className="card dark-card">
          <h2>10+</h2>
          <p>Our Valuable Users</p>
        </div>
        <div className="card light-card">
          <p>Total Campaigns <span className="growth">⬈ 8%</span></p>
          <h2>151+</h2>
          <small>Increase of <span className="increase">26</span> this month</small>
        </div>
        <div className="card green-card">
          <h2>1+</h2>
          <p>Years of Dedicated Service</p>
        </div>
        <div className="card dark-card">
          <p>Generate Optimal LinkedIn Message with our <br />Campaign Management System</p>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
