import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-5 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Logo and Description */}
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <span className="material-icons me-2">graphic_eq</span>
              <h5 className="mb-0 text-heading">SoundWave Studios</h5>
            </div>
            <p>Professional recording studio offering top-tier equipment and experienced engineers for musicians, podcasters, and voice artists.</p>
          </div>
          
          {/* Quick Links */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6 className="text-heading mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about-us" className="text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/studios" className="text-decoration-none">Studios</Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-decoration-none">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-lg-2 col-md-4 col-6">
            <h6 className="text-heading mb-3">Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/studios" className="text-decoration-none">Music Recording</Link>
              </li>
              <li className="mb-2">
                <Link to="/studios" className="text-decoration-none">Podcast Production</Link>
              </li>
              <li className="mb-2">
                <Link to="/studios" className="text-decoration-none">Voice Over</Link>
              </li>
              <li className="mb-2">
                <Link to="/studios" className="text-decoration-none">Mixing & Mastering</Link>
              </li>
              <li className="mb-2">
                <Link to="/booking" className="text-decoration-none">Book a Session</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-lg-4 col-md-4">
            <h6 className="text-heading mb-3">Contact Us</h6>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <span className="material-icons me-2 small">location_on</span>
                <span>123 Music Avenue, Soundtown, ST 12345</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="material-icons me-2 small">phone</span>
                <span>(555) 123-4567</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="material-icons me-2 small">email</span>
                <span>info@soundwavestudios.com</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="material-icons me-2 small">schedule</span>
                <span>Mon-Fri: 9am-9pm, Sat-Sun: 10am-6pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="row mt-4 pt-4 border-top">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0">&copy; {currentYear} - Designed by Shane Stock for SoundWave Studios.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;