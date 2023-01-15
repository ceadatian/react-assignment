import React from 'react';
import './ProgressBar.css'

interface Props {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
        Step {currentStep}
        {currentStep === 4 && <p>Review</p>}
      </div>
    </div>
  );
};

export default ProgressBar;
