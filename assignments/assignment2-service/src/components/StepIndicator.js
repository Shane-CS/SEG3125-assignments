import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 5 }) => {
  // Create an array of step numbers
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  // Step labels
  const stepLabels = [
    'Mode Selection',
    'Date & Time',
    'Gear/Package',
    'Review',
    'Confirmation'
  ];
  
  return (
    <div className="step-indicator">
      {steps.map((step) => {
        // Determine step status
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        
        // Set classes based on status
        let statusClass = '';
        if (isActive) statusClass = 'bg-primary text-white';
        else if (isCompleted) statusClass = 'bg-success text-white';
        else statusClass = 'bg-light text-dark';
        
        return (
          <div key={step} className="d-flex flex-column align-items-center">
            <div 
              className={`step-indicator-item ${statusClass}`}
              aria-current={isActive ? 'step' : undefined}
            >
              {isCompleted ? (
                <span className="material-icons" style={{ fontSize: '1rem' }}>check</span>
              ) : (
                step
              )}
            </div>
            <span className="mt-2 small d-none d-md-block">
              {stepLabels[step - 1]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;