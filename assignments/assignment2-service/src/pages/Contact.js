import React, { useState } from 'react';
import Hero from '../components/Hero';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Simulate successful submission
        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setIsSubmitting(false);
      } catch (err) {
        setError('There was an error submitting your message. Please try again.');
        setIsSubmitting(false);
      }
    }, 1000);
  };
  
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        subtitle="Get in touch with our team"
        backgroundImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80"
      />
      
      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center mb-5">
              <h2 className="text-heading mb-4">Get In Touch</h2>
              <p className="lead">
                Have questions about our studios or services? Want to schedule a tour?
                Fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>
          </div>
          
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-7 mb-5 mb-lg-0">
              {isSubmitted ? (
                <div className="card retro-border p-4 text-center">
                  <div className="card-body">
                    <span className="material-icons text-success display-1 mb-3">check_circle</span>
                    <h3 className="text-heading mb-3">Thank You!</h3>
                    <p className="lead mb-4">Your message has been sent successfully.</p>
                    <p>We will get back to you as soon as possible.</p>
                    <button 
                      className="btn btn-primary mt-3"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: '',
                          message: '',
                          preferredContact: 'email'
                        });
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card retro-border">
                  <div className="card-body p-4">
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone (optional)</label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <select
                          className="form-select"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="Booking Inquiry">Booking Inquiry</option>
                          <option value="Studio Tour">Studio Tour</option>
                          <option value="Technical Question">Technical Question</option>
                          <option value="Pricing Information">Pricing Information</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label d-block">Preferred Contact Method</label>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="preferredContact"
                            id="contactEmail"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="contactEmail">Email</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="preferredContact"
                            id="contactPhone"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="contactPhone">Phone</label>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Sending...
                          </>
                        ) : 'Send Message'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact Information */}
            <div className="col-lg-5">
              <div className="card retro-border h-100">
                <div className="card-body p-4">
                  <h3 className="text-heading mb-4">Contact Information</h3>
                  
                  <div className="d-flex mb-4">
                    <span className="material-icons text-primary me-3">location_on</span>
                    <div>
                      <h5 className="h6 text-heading">Address</h5>
                      <p className="mb-0">123 Music Avenue<br />Soundtown, ST 12345</p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <span className="material-icons text-primary me-3">phone</span>
                    <div>
                      <h5 className="h6 text-heading">Phone</h5>
                      <p className="mb-0">(555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <span className="material-icons text-primary me-3">email</span>
                    <div>
                      <h5 className="h6 text-heading">Email</h5>
                      <p className="mb-0">info@soundwavestudios.com</p>
                    </div>
                  </div>
                  
                  <div className="d-flex mb-4">
                    <span className="material-icons text-primary me-3">schedule</span>
                    <div>
                      <h5 className="h6 text-heading">Hours</h5>
                      <p className="mb-0">
                        Monday - Friday: 9am - 9pm<br />
                        Saturday - Sunday: 10am - 6pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;