import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  const { theme, toggleTheme } = useBooking();
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="sticky-top">
      <Navbar expanded={expanded} expand="lg" className="navbar">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <span className="material-icons me-2">graphic_eq</span>
            <span className="text-heading">SoundWave Studios</span>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle 
            aria-controls="navbarNav" 
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />

          {/* Navigation Links */}
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto mb-2 mb-lg-0">
              <Nav.Item>
                <NavLink to="/" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                } end onClick={() => setExpanded(false)}>
                  Home
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/about-us" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                } onClick={() => setExpanded(false)}>
                  About Us
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/studios" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                } onClick={() => setExpanded(false)}>
                  Studios
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/faq" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                } onClick={() => setExpanded(false)}>
                  FAQ
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink to="/contact" className={({isActive}) => 
                  `nav-link ${isActive ? 'active' : ''}`
                } onClick={() => setExpanded(false)}>
                  Contact
                </NavLink>
              </Nav.Item>
              <Nav.Item className="ms-lg-2">
                <NavLink to="/booking" className="btn btn-primary" onClick={() => setExpanded(false)}>
                  Book Now
                </NavLink>
              </Nav.Item>
              <Nav.Item className="ms-lg-2 d-flex align-items-center">
                <button 
                  onClick={() => {
                    toggleTheme();
                    setExpanded(false);
                  }} 
                  className="btn btn-link nav-link" 
                  aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  <span className="material-icons">
                    {theme === 'light' ? 'dark_mode' : 'light_mode'}
                  </span>
                </button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
