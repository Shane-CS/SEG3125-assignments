import React from 'react';
import { Link } from 'react-router-dom';

const StudioCard = ({ 
  studio, 
  image, 
  showBookButton = true,
  className = ''
}) => {
  // Default image if none provided
  const studioImage = image || 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
  
  return (
    <div className={`card retro-border h-100 ${className}`}>
      <img 
        src={studioImage} 
        className="card-img-top" 
        alt={studio.name} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-heading">{studio.name}</h5>
        <p className="card-text">{studio.description}</p>
        
        <div className="mt-2 mb-3">
          <span className="badge bg-secondary me-2">{studio.size}</span>
        </div>
        
        <h6 className="text-heading mt-2">Features:</h6>
        <ul className="mb-4">
          {studio.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        
        {showBookButton && (
          <Link 
            to="/booking" 
            className="btn btn-primary mt-auto align-self-start"
          >
            Book This Studio
          </Link>
        )}
      </div>
    </div>
  );
};

export default StudioCard;