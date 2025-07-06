import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3">Steep & Bloom Co.</h5>
            <p className="mb-2">Crafting exceptional coffee experiences for enthusiasts who appreciate quality beans and brewing tools.</p>
          </Col>

          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3">Shop</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/shop" className="text-decoration-none">All Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" onClick={() => localStorage.setItem('defaultCategory', 'beans')} className="text-decoration-none">Beans</Link>
              </li>
              <li className="mb-2">
                <Link to="/shop" onClick={() => localStorage.setItem('defaultCategory', 'tools')} className="text-decoration-none">Tools</Link>
              </li>
            </ul>
          </Col>

          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/about#our-story" className="text-decoration-none">Our Story</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-decoration-none">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/about#contact" className="text-decoration-none">Contact</Link>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <small>&copy; {currentYear} Steep & Bloom Co. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
