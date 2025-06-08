import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import StepIndicator from '../../components/StepIndicator';
import { useBooking } from '../../context/BookingContext';
import { BOOKING } from '../../config';

const BookingStep2 = () => {
  const { 
    mode, 
    selectedDate, 
    setSelectedDate, 
    selectedTime, 
    setSelectedTime,
    duration,
    setDuration
  } = useBooking();
  const navigate = useNavigate();

  // Local state for form
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [durationInput, setDurationInput] = useState(duration);
  const [errors, setErrors] = useState({});

  // Redirect if mode is not selected
  useEffect(() => {
    if (!mode) {
      navigate('/booking');
    }
  }, [mode, navigate]);

  // Initialize form with existing values
  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateInput(formattedDate);
    }

    if (selectedTime) {
      setTimeInput(selectedTime);
    }

    if (duration) {
      setDurationInput(duration);
    }
  }, [selectedDate, selectedTime, duration]);

  // Handle date change
  const handleDateChange = (e) => {
    setDateInput(e.target.value);
    setErrors(prev => ({ ...prev, date: null }));
  };

  // Handle time change
  const handleTimeChange = (e) => {
    setTimeInput(e.target.value);
    setErrors(prev => ({ ...prev, time: null }));
  };

  // Handle duration change
  const handleDurationChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setDurationInput(value);
    setErrors(prev => ({ ...prev, duration: null }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate date
    if (!dateInput) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDateObj = new Date(dateInput);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDateObj < today) {
        newErrors.date = 'Please select a future date';
      }

      // For simple mode, only allow weekends
      if (mode === 'simple') {
        const day = selectedDateObj.getDay();
        if (day !== 5 && day !== 6) {
          newErrors.date = 'Simple mode bookings are only available on weekends (Saturday and Sunday)';
        }
      }
    }

    // Validate time
    if (!timeInput) {
      newErrors.time = 'Please select a time';
    } else {
      // Check if the session would extend beyond closing time (9 PM / 21:00)
      const [hours] = timeInput.split(':').map(Number);
      const endTime = hours + durationInput;

      if (endTime > 21) {
        newErrors.time = `Session would end after closing time (9 PM). Please select an earlier time or shorter duration.`;
      }
    }

    // Validate duration
    if (!durationInput) {
      newErrors.duration = 'Please select a duration';
    } else if (durationInput < BOOKING.MIN_HOURS) {
      newErrors.duration = `Minimum booking duration is ${BOOKING.MIN_HOURS} hour`;
    } else if (durationInput > BOOKING.MAX_HOURS) {
      newErrors.duration = `Maximum booking duration is ${BOOKING.MAX_HOURS} hours`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Save values to context
      setSelectedDate(new Date(dateInput));
      setSelectedTime(timeInput);
      setDuration(durationInput);

      // Navigate to next step
      navigate('/booking/step/3');
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate('/booking/step/1');
  };

  // Generate time options
  const generateTimeOptions = () => {
    return BOOKING.AVAILABLE_HOURS.map(hour => {
      const formattedHour = hour < 10 ? `0${hour}:00` : `${hour}:00`;
      return (
          <option key={hour} value={formattedHour}>
            {hour < 12 ? `${hour}:00 AM` :
                hour === 12 ? '12:00 PM' :
                    `${hour - 12}:00 PM`}
          </option>
      );
    });
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Select Date & Time"
        subtitle={`Step 2: Choose when you'd like to book your ${mode === 'simple' ? 'simple' : 'advanced'} session`}
        backgroundImage="https://images.unsplash.com/photo-1519683109079-d5f539e1542f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        height="50vh"
      />

      {/* Booking Step Content */}
      <section className="booking-step py-5">
        <div className="container">
          {/* Step Indicator */}
          <StepIndicator currentStep={2} />

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-heading mb-4">Select Your Session Date & Time</h2>
              <p className="lead">
                {mode === 'simple' 
                  ? 'Simple mode bookings are available on weekends only.' 
                  : 'Advanced mode bookings are available any day of the week.'}
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card retro-border">
                <div className="card-body p-4">
                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      {/* Date Selection */}
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="date" className="form-label">Select Date</label>
                          <input
                            type="date"
                            className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                            id="date"
                            value={dateInput}
                            onChange={handleDateChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                          {errors.date && (
                            <div className="invalid-feedback">
                              {errors.date}
                            </div>
                          )}
                          {mode === 'simple' && (
                            <div className="form-text">
                              <span className="material-icons text-warning small">info</span>
                              Simple mode is available on weekends only
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Time Selection */}
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="time" className="form-label">Select Time</label>
                          <select
                            className={`form-select ${errors.time ? 'is-invalid' : ''}`}
                            id="time"
                            value={timeInput}
                            onChange={handleTimeChange}
                            required
                          >
                            <option value="">Select a time</option>
                            {generateTimeOptions()}
                          </select>
                          {errors.time && (
                            <div className="invalid-feedback">
                              {errors.time}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Duration Selection */}
                      <div className="col-12">
                        <div className="mb-4">
                          <label htmlFor="duration" className="form-label">Session Duration (hours)</label>
                          {mode === 'simple' ? (
                            <div className="btn-group w-100" role="group" aria-label="Duration selection">
                              {[1, 2, 3, 4].map(hours => (
                                <button
                                  key={hours}
                                  type="button"
                                  className={`btn ${durationInput === hours ? 'btn-primary' : 'btn-outline-primary'}`}
                                  onClick={() => setDurationInput(hours)}
                                >
                                  {hours} {hours === 1 ? 'hour' : 'hours'}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <input
                              type="number"
                              className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                              id="duration"
                              min={BOOKING.MIN_HOURS}
                              max={BOOKING.MAX_HOURS}
                              value={durationInput}
                              onChange={handleDurationChange}
                              required
                            />
                          )}
                          {errors.duration && (
                            <div className="invalid-feedback">
                              {errors.duration}
                            </div>
                          )}
                          <div className="form-text">
                            <span className="material-icons text-info small">info</span>
                            Sessions can be booked for {BOOKING.MIN_HOURS}-{BOOKING.MAX_HOURS} hours
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
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
                      >
                        Next
                        <span className="material-icons small ms-1">arrow_forward</span>
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

export default BookingStep2;
