import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import StepIndicator from '../../components/StepIndicator';
import { useBooking } from '../../context/BookingContext';

const BookingStep5 = () => {
  const { 
    mode, 
    selectedDate, 
    selectedTime,
    duration,
    resetBooking
  } = useBooking();
  const navigate = useNavigate();
  
  // Generate a random booking ID
  const bookingId = `SW-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Redirect if date is not selected (meaning they didn't go through the booking process)
  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      navigate('/booking');
    }
  }, [selectedDate, selectedTime, navigate]);
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (time) => {
    if (!time) return '';
    
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  // Handle "Book Another Session" button
  const handleBookAnother = () => {
    resetBooking();
    navigate('/booking');
  };
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Booking Confirmed!"
        subtitle="Your session has been successfully booked"
        backgroundImage="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        height="50vh"
      />
      
      {/* Booking Step Content */}
      <section className="booking-step py-5">
        <div className="container">
          {/* Step Indicator */}
          <StepIndicator currentStep={5} />
          
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card retro-border text-center">
                <div className="card-body p-5">
                  <span className="material-icons display-1 text-success mb-4">check_circle</span>
                  <h2 className="text-heading mb-4">Thank You for Your Booking!</h2>
                  <p className="lead mb-4">
                    Your booking has been confirmed and we're looking forward to your session.
                  </p>
                  
                  <div className="card bg-light mb-4">
                    <div className="card-body">
                      <h3 className="h5 text-heading mb-3">Booking Details</h3>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <strong>Booking ID:</strong>
                          <p className="mb-0">{bookingId}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <strong>Booking Type:</strong>
                          <p className="mb-0">{mode === 'simple' ? 'Simple Mode' : 'Advanced Mode'}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <strong>Date:</strong>
                          <p className="mb-0">{formatDate(selectedDate)}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <strong>Time:</strong>
                          <p className="mb-0">{formatTime(selectedTime)}</p>
                        </div>
                        <div className="col-12">
                          <strong>Duration:</strong>
                          <p className="mb-0">{duration} {duration === 1 ? 'hour' : 'hours'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="alert alert-info mb-4">
                    <h4 className="h6 text-heading mb-2">What's Next?</h4>
                    <p className="mb-0">
                      We've sent a confirmation email with all the details to your email address. 
                      Please arrive 15 minutes before your session to get set up.
                    </p>
                  </div>
                  
                  <div className="card mb-4">
                    <div className="card-body">
                      <h3 className="h5 text-heading mb-3">Studio Location</h3>
                      <p className="mb-2">
                        <span className="material-icons text-primary me-2 small">location_on</span>
                        123 Music Avenue, Soundtown, ST 12345
                      </p>
                      <p className="mb-0">
                        <span className="material-icons text-primary me-2 small">phone</span>
                        (555) 123-4567
                      </p>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                    <button 
                      className="btn btn-primary"
                      onClick={handleBookAnother}
                    >
                      Book Another Session
                    </button>
                    <Link to="/" className="btn btn-outline-secondary">
                      Return to Home
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p>
                  Have questions about your booking? Check our <Link to="/faq">FAQ</Link> or <Link to="/contact">contact us</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials CTA */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3 className="text-heading mb-4">Enjoyed Your Experience?</h3>
          <p className="lead mb-4">
            After your session, we'd love to hear about your experience at SoundWave Studios.
            Your feedback helps us improve and lets others know about our services.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Share Your Feedback
          </Link>
        </div>
      </section>
    </>
  );
};

export default BookingStep5;