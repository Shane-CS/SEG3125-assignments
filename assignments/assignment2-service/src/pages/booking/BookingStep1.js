import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import StepIndicator from '../../components/StepIndicator';
import { useBooking } from '../../context/BookingContext';

const BookingStep1 = () => {
  const { mode, setMode, resetBooking } = useBooking();
  const navigate = useNavigate();

  // Reset booking when first entering the booking flow
  useEffect(() => {
    resetBooking();
  }, []);

  // Handle mode selection
  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    navigate('/booking/step/2');
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Book Your Session"
        subtitle="Choose the booking mode that works best for you"
        backgroundImage="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        height="50vh"
      />

      {/* Booking Step Content */}
      <section className="booking-step py-5">
        <div className="container">
          {/* Step Indicator */}
          <StepIndicator currentStep={1} />

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-heading mb-4">Choose Your Booking Mode</h2>
              <p className="lead">
                Select the booking mode that best fits your experience level and needs.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Simple Mode Card */}
            <div className="col-md-6">
              <div 
                className={`card h-100 ${mode === 'simple' ? 'retro-border' : ''}`}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => handleModeSelect('simple')}
              >
                <div className="card-body p-4 text-center">
                  <span className="material-icons display-1 mb-3 text-primary">person</span>
                  <h3 className="card-title text-heading">Simple Mode</h3>
                  <p className="card-text mb-4">
                    Perfect for beginners, podcasters, and those who want a guided experience with fewer decisions.
                  </p>

                  <h4 className="h6 text-heading mb-3">Features:</h4>
                  <ul className="list-unstyled text-start mb-4">
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Engineer-assisted session
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Pre-selected equipment packages
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Weekend availability
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Deposit option ($25)
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      $75/hour rate
                    </li>
                  </ul>

                  <p className="small text-muted mb-4">
                    <em>Recommended for: First-time studio users, podcasters, voice-over artists, and those who prefer guidance.</em>
                  </p>

                  <button 
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeSelect('simple');
                    }}
                  >
                    Select Simple Mode
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Mode Card */}
            <div className="col-md-6">
              <div 
                className={`card h-100 ${mode === 'advanced' ? 'retro-border' : ''}`}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => handleModeSelect('advanced')}
              >
                <div className="card-body p-4 text-center">
                  <span className="material-icons display-1 mb-3 text-secondary">settings</span>
                  <h3 className="card-title text-heading">Advanced Mode</h3>
                  <p className="card-text mb-4">
                    For experienced users who want complete control over gear selection and session details.
                  </p>

                  <h4 className="h6 text-heading mb-3">Features:</h4>
                  <ul className="list-unstyled text-start mb-4">
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Full gear selection control
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Any day availability
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Flexible session duration
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      Full payment required
                    </li>
                    <li className="mb-2">
                      <span className="material-icons text-success me-2 small">check_circle</span>
                      $60/hour base rate + gear fees
                    </li>
                  </ul>

                  <p className="small text-muted mb-4">
                    <em>Recommended for: Experienced musicians, producers, and engineers who know exactly what they need.</em>
                  </p>

                  <button 
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModeSelect('advanced');
                    }}
                  >
                    Select Advanced Mode
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8 mx-auto text-center">
              <p className="text-muted">
                Not sure which mode to choose? <a href="/faq" className="text-decoration-none">Check our FAQ</a> or <a href="/contact" className="text-decoration-none">contact us</a> for assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingStep1;
