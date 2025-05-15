import React from 'react';
import '../components/styles/MissionSection.css'; // Import the CSS file for styling

const MissionSection: React.FC = () => {
  return (
    <section className="mission">
      <div className="mission-container">
        <p className="mission-tag">OUR MISSION</p>
        <h1 className="mission-heading">We’ve helped<br />many Users across the world</h1>
        <p className="mission-subheading">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fugiat saepe minima possimus accusamus, dicta consequatur. Repellat harum ex veritatis quae iure optio! Temporibus possimus debitis, blanditiis ipsum dolor accusantium?.
        </p>

        <div className="mission-stats">
          <div className="stat-box">
            <h3>24%</h3>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="stat-box">
            <h3>10K</h3>
            <p>Lorem, ipsum dolor.</p>
          </div>
          <div className="stat-box">
            <h3>10+</h3>
            <p>Lorem ipsum dolor sit.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
