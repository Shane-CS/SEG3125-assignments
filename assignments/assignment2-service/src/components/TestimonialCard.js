import React from 'react';

const TestimonialCard = ({ testimonial, className = '' }) => {
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          className="material-icons" 
          style={{ color: i <= rating ? '#FF9F00' : '#e0e0e0', fontSize: '18px' }}
        >
          star
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`card retro-border h-100 ${className}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title text-heading mb-0">{testimonial.name}</h5>
          <span className="badge bg-info">{testimonial.type}</span>
        </div>
        
        <div className="mb-3">
          {renderStars(testimonial.rating)}
        </div>
        
        <blockquote className="blockquote mb-0">
          <p className="mb-0 fst-italic">"{testimonial.quote}"</p>
        </blockquote>
      </div>
    </div>
  );
};

export default TestimonialCard;