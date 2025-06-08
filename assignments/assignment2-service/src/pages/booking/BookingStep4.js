import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import StepIndicator from '../../components/StepIndicator';
import { useBooking } from '../../context/BookingContext';
import { PRICING } from '../../config';

const BookingStep4 = () => {
  const { 
    mode, 
    selectedDate, 
    selectedTime,
    duration,
    gearSelections,
    packageChoice,
    extras,
    cost,
    submitBooking
  } = useBooking();
  const navigate = useNavigate();
  
  // Local state
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentOption, setPaymentOption] = useState(mode === 'simple' ? 'deposit' : 'full');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Redirect if mode is not selected
  useEffect(() => {
    if (!mode) {
      navigate('/booking');
    }
  }, [mode, navigate]);
  
  // Format date for display
  const formatDate = (date) => {
    if (!date) return 'Not selected';
    
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time for display
  const formatTime = (time) => {
    if (!time) return 'Not selected';
    
    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };
  
  // Calculate payment amount
  const calculatePaymentAmount = () => {
    if (mode === 'simple' && paymentOption === 'deposit') {
      return PRICING.SIMPLE_MODE.DEPOSIT;
    }
    return cost;
  };
  
  // Handle back button
  const handleBack = () => {
    navigate('/booking/step/3');
  };
  
  // Handle submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await submitBooking();
      
      if (response.success) {
        navigate('/booking/step/5');
      } else {
        setError(response.message || 'An error occurred while processing your booking.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Review & Payment"
        subtitle="Step 4: Review your booking details and complete payment"
        backgroundImage="https://images.unsplash.com/photo-1567787609866-9077b9d3f2f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
        height="50vh"
      />
      
      {/* Booking Step Content */}
      <section className="booking-step py-5">
        <div className="container">
          {/* Step Indicator */}
          <StepIndicator currentStep={4} />
          
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-heading mb-4">Review Your Booking</h2>
              <p className="lead">
                Please review your booking details and complete payment to confirm your session.
              </p>
            </div>
          </div>
          
          <div className="row">
            {/* Booking Summary */}
            <div className="col-lg-7 mb-4 mb-lg-0">
              <div className="card retro-border mb-4">
                <div className="card-header bg-primary text-white">
                  <h3 className="h5 mb-0 text-heading">Booking Summary</h3>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h4 className="h6 text-heading">Booking Mode</h4>
                      <p>{mode === 'simple' ? 'Simple Mode' : 'Advanced Mode'}</p>
                    </div>
                    <div className="col-md-6">
                      <h4 className="h6 text-heading">Duration</h4>
                      <p>{duration} {duration === 1 ? 'hour' : 'hours'}</p>
                    </div>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h4 className="h6 text-heading">Date</h4>
                      <p>{formatDate(selectedDate)}</p>
                    </div>
                    <div className="col-md-6">
                      <h4 className="h6 text-heading">Time</h4>
                      <p>{formatTime(selectedTime)}</p>
                    </div>
                  </div>
                  
                  {mode === 'simple' ? (
                    <div className="mb-4">
                      <h4 className="h6 text-heading">Package</h4>
                      <p>
                        {packageChoice === 'standard' ? 'Standard Package' : 'Premium Package'}
                        <br />
                        <small className="text-muted">
                          {packageChoice === 'standard' 
                            ? 'Includes engineer assistance, 2 Shure SM7B microphones, basic mixing console, headphones, and basic audio processing.' 
                            : 'Includes engineer assistance, Neumann U87 microphone, Neve 1073 preamp, LA-2A compressor, and professional mixing and mastering.'}
                        </small>
                      </p>
                      
                      {extras.extraTime && (
                        <div className="mt-2">
                          <span className="badge bg-info">Extra 30 Minutes</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <h4 className="h6 text-heading">Selected Gear ({gearSelections.length} items)</h4>
                      {gearSelections.length === 0 ? (
                        <p className="text-muted">No gear selected</p>
                      ) : (
                        <ul className="list-group">
                          {gearSelections.map(item => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                              <div>
                                <span className="fw-bold">{item.name}</span>
                                <br />
                                <small className="text-muted">{item.description}</small>
                              </div>
                              {item.additionalFee > 0 && (
                                <span className="badge bg-secondary">+${item.additionalFee}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  
                  <div className="card bg-light">
                    <div className="card-body">
                      <h4 className="h6 text-heading mb-3">Cost Breakdown</h4>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Base Rate:</span>
                        <span>${mode === 'simple' ? PRICING.SIMPLE_MODE.HOURLY_RATE : PRICING.ADVANCED_MODE.HOURLY_RATE} × {duration} {duration === 1 ? 'hour' : 'hours'}</span>
                      </div>
                      
                      {mode === 'simple' && extras.extraTime && (
                        <div className="d-flex justify-content-between mb-2">
                          <span>Extra 30 Minutes:</span>
                          <span>+${PRICING.SIMPLE_MODE.EXTRA_30_MIN}</span>
                        </div>
                      )}
                      
                      {mode === 'advanced' && gearSelections.length > 0 && (
                        <div className="d-flex justify-content-between mb-2">
                          <span>Gear Fees:</span>
                          <span>+${gearSelections.reduce((total, item) => total + (item.additionalFee || 0), 0)}</span>
                        </div>
                      )}
                      
                      <hr />
                      
                      <div className="d-flex justify-content-between fw-bold">
                        <span>Total:</span>
                        <span>${cost}</span>
                      </div>
                      
                      {mode === 'simple' && (
                        <div className="mt-3 small">
                          <span className="material-icons text-info small me-1">info</span>
                          You can pay a ${PRICING.SIMPLE_MODE.DEPOSIT} deposit now and the remaining balance on the day of your session.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="col-lg-5">
              <div className="card retro-border">
                <div className="card-header bg-primary text-white">
                  <h3 className="h5 mb-0 text-heading">Payment Details</h3>
                </div>
                <div className="card-body">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    {/* Payment Options (Simple Mode Only) */}
                    {mode === 'simple' && (
                      <div className="mb-4">
                        <label className="form-label">Payment Option</label>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentOption"
                            id="payDeposit"
                            value="deposit"
                            checked={paymentOption === 'deposit'}
                            onChange={() => setPaymentOption('deposit')}
                          />
                          <label className="form-check-label" htmlFor="payDeposit">
                            Pay Deposit (${PRICING.SIMPLE_MODE.DEPOSIT})
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="paymentOption"
                            id="payFull"
                            value="full"
                            checked={paymentOption === 'full'}
                            onChange={() => setPaymentOption('full')}
                          />
                          <label className="form-check-label" htmlFor="payFull">
                            Pay Full Amount (${cost})
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {/* Payment Method */}
                    <div className="mb-4">
                      <label className="form-label">Payment Method</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="creditCard"
                          value="creditCard"
                          checked={paymentMethod === 'creditCard'}
                          onChange={() => setPaymentMethod('creditCard')}
                        />
                        <label className="form-check-label" htmlFor="creditCard">
                          Credit Card
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="paypal"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                        />
                        <label className="form-check-label" htmlFor="paypal">
                          PayPal
                        </label>
                      </div>
                    </div>
                    
                    {/* Credit Card Details (only show if credit card is selected) */}
                    {paymentMethod === 'creditCard' && (
                      <>
                        <div className="mb-3">
                          <label htmlFor="cardName" className="form-label">Name on Card</label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardName"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label htmlFor="cardNumber" className="form-label">Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label htmlFor="expDate" className="form-label">Expiration Date</label>
                            <input
                              type="text"
                              className="form-control"
                              id="expDate"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label htmlFor="cvv" className="form-label">CVV</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cvv"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    {/* PayPal Message (only show if PayPal is selected) */}
                    {paymentMethod === 'paypal' && (
                      <div className="alert alert-info">
                        You will be redirected to PayPal to complete your payment of ${calculatePaymentAmount()}.
                      </div>
                    )}
                    
                    <div className="d-flex justify-content-between mt-4">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={handleBack}
                      >
                        <span className="material-icons small me-1">arrow_back</span>
                        Back
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            Pay ${calculatePaymentAmount()}
                            <span className="material-icons small ms-1">arrow_forward</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingStep4;