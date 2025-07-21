import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';

const Confirmation = ({ cartItems, clearCart }) => {
  // Generate a random order number only once when component mounts
  const [orderNumber] = useState(() => Math.floor(10000 + Math.random() * 90000));

  // Store cart items in local state to prevent them from disappearing
  const [orderItems] = useState([...cartItems]);

  // Store clearCart function in a ref to prevent it from causing re-renders
  const clearCartRef = useRef(clearCart);

  // Update the ref if clearCart changes
  useEffect(() => {
    clearCartRef.current = clearCart;
  }, [clearCart]);

  // Calculate subtotal using orderItems instead of cartItems
  const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate shipping (simplified for demo)
  const shipping = subtotal > 0 ? 5.00 : 0;

  // Calculate total
  const total = subtotal + shipping;

  // Clear cart when navigating away from confirmation page
  useEffect(() => {
    // Cleanup function that runs when component unmounts
    return () => {
      // Use the ref to avoid dependency on clearCart
      if (clearCartRef.current) {
        clearCartRef.current();
      }
    };
  }, []);

  return (
    <Container className="py-4">
      <StepIndicator currentStep="confirmation" />

      <div className="text-center py-4">
        <h1 className="display-5 mb-3">Thank you for your order!</h1>
        <p className="lead mb-4">We hope your next cup is your best yet.</p>
        <p className="mb-4">Order <strong>#{orderNumber}</strong></p>
      </div>

      <Row className="justify-content-center mb-5">
        <Col md={8} lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-transparent">
              <h4 className="mb-0">Order Summary</h4>
            </Card.Header>
            <Card.Body>
              {orderItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between mb-3">
                  <div>
                    <span className="fw-medium">{item.name}</span>
                    <span className="text-muted ms-2">x{item.quantity}</span>
                    {item.options && Object.keys(item.options).length > 0 && (
                      <small className="d-block text-muted">
                        {Object.entries(item.options).map(([key, value]) => (
                          `${key}: ${value}`
                        )).join(', ')}
                      </small>
                    )}
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold mt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mb-5">
        <p className="mb-4">Your order will ship soon. You'll receive tracking details via email.</p>

        <div className="d-flex justify-content-center gap-3">
          <Button 
            as={Link} 
            to="/shop" 
            variant="primary"
          >
            Continue Shopping
          </Button>
          <Button 
            as={Link} 
            to="/survey" 
            variant="outline-secondary"
          >
            Take Our Short Survey
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Confirmation;
