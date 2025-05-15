import React from 'react';
import '../components/styles/StepsSection.css';  // Import the CSS file for styling

const StepsSection: React.FC = () => {
  return (
    <section className="steps">
      <div className="steps-container">
        <p className="steps-tag">STEP</p>
        <h2 className="steps-title">
          Steps to followed<br />of our Campaign Manager Applications
        </h2>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Open our Campaign Manager</h3>
            <p>Come to landing page click on the create campaign button and there create campaign</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>View campaign</h3>
            <p>Go to the campaign to view and edit/ delete the campaign</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Go to Message page</h3>
            <p>Fill the necessary details and click on create message and view the message under to it.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
