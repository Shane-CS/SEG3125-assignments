import React from 'react';

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  height = '60vh', 
  overlay = true,
  children,
  alignment = 'center',
  buttonText,
  buttonLink,
  buttonOnClick
}) => {
  // Default background if none
  const bgImage = backgroundImage || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
  
  // Alignment classes
  const alignmentClasses = {
    'left': 'text-start justify-content-start',
    'center': 'text-center justify-content-center',
    'right': 'text-end justify-content-end'
  };
  
  return (
    <section 
      className="hero" 
      style={{ 
        backgroundImage: `url(${bgImage})`,
        minHeight: height
      }}
    >
      {overlay && <div className="hero-overlay"></div>}
      
      <div className="container">
        <div className={`hero-content d-flex flex-column ${alignmentClasses[alignment]}`}>
          {title && <h1 className="display-4 fw-bold mb-3 slide-in">{title}</h1>}
          {subtitle && <p className="lead mb-4 fade-in">{subtitle}</p>}
          
          {children}
          
          {buttonText && (
            <div className="mt-4">
              {buttonLink ? (
                <a 
                  href={buttonLink} 
                  className="btn btn-primary btn-lg retro-border"
                >
                  {buttonText}
                </a>
              ) : (
                <button 
                  onClick={buttonOnClick} 
                  className="btn btn-primary btn-lg retro-border"
                >
                  {buttonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;