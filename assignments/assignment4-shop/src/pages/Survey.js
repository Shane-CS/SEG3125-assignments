import React from 'react';
import { Container, Card } from 'react-bootstrap';
import SurveyForm from '../components/SurveyForm';

const Survey = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h1 className="mb-3">Help us improve your experience ☕</h1>
        <p className="lead text-muted">Your feedback helps us brew something better for everyone.</p>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <SurveyForm />
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Survey;