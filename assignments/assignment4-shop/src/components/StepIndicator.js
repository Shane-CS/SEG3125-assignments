import React from 'react';
import { Row, Col } from 'react-bootstrap';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 'cart', label: '🛒 Cart' },
    { id: 'info', label: '📦 Info' },
    { id: 'confirmation', label: '✅ Confirmation' }
  ];
  
  return (
    <Row className="checkout-steps mb-4">
      {steps.map((step, index) => (
        <Col key={step.id} className={`checkout-step ${currentStep === step.id ? 'active' : ''}`}>
          <div 
            className={`
              py-2 px-3 rounded text-center 
              ${currentStep === step.id ? 'bg-primary bg-opacity-10' : ''}
            `}
          >
            <span className="d-block d-md-inline me-md-2">{step.label}</span>
            {index < steps.length - 1 && (
              <span className="d-none d-md-inline text-muted">→</span>
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default StepIndicator;