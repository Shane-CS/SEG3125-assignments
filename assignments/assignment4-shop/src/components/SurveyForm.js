import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SurveyForm = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would send this data to a server
    console.log({ rating, comments, email });
    setSubmitted(true);
    
    // Reset form
    setRating(0);
    setComments('');
    setEmail('');
    
    // Show success message briefly before redirecting
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
  
  if (submitted) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success fs-1"></i>
        </div>
        <h3>Thank you for your feedback!</h3>
        <p className="mb-4">We appreciate you taking the time to share your thoughts.</p>
        <p className="text-muted">Redirecting to home page...</p>
      </div>
    );
  }
  
  return (
    <Form onSubmit={handleSubmit} className="survey-form">
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">How was your experience?</Form.Label>
        <div 
          className="rating d-flex justify-content-center my-3" 
          onMouseLeave={() => setHoveredRating(0)}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <div 
              key={star}
              className="star mx-2"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              style={{ cursor: 'pointer' }}
            >
              {star <= (hoveredRating || rating) ? (
                <i className="bi bi-star-fill text-warning"></i>
              ) : (
                <i className="bi bi-star"></i>
              )}
            </div>
          ))}
        </div>
        {rating > 0 && (
          <div className="text-center text-muted mb-3">
            {rating === 5 ? 'Excellent!' : 
             rating === 4 ? 'Very Good!' :
             rating === 3 ? 'Good' :
             rating === 2 ? 'Fair' : 'Poor'}
          </div>
        )}
      </Form.Group>
      
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Comments</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={4} 
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Tell us what you liked or how we can improve..."
        />
      </Form.Group>
      
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Email (optional)</Form.Label>
        <Form.Control 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        <Form.Text className="text-muted">
          We'll only use this to follow up on your feedback if needed.
        </Form.Text>
      </Form.Group>
      
      <div className="text-center">
        <Button 
          type="submit" 
          variant="primary" 
          size="lg" 
          className="px-5"
          disabled={rating === 0}
        >
          Submit Feedback
        </Button>
      </div>
    </Form>
  );
};

export default SurveyForm;