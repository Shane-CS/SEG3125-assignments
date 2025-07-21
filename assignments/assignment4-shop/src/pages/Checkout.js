import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Table, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';

const Checkout = ({ cartItems, updateCartItemQuantity, removeFromCart }) => {
  const navigate = useNavigate();

  // State for checkout step
  const [step, setStep] = useState('cart'); // 'cart', 'info', 'confirmation'

  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate shipping (simplified for demo)
  const shipping = subtotal > 0 ? 5.00 : 0;

  // Calculate total
  const total = subtotal + shipping;

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(index, newQuantity);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, we would validate the form and process the payment
    // For this demo, we'll just navigate to the confirmation page
    navigate('/confirmation');
  };

  // Render cart step
  const renderCartStep = () => {
    if (cartItems.length === 0) {
      return (
        <div className="text-center py-5">
          <i className="bi bi-cart3 fs-1 text-muted"></i>
          <h3 className="mt-3">Your cart is empty</h3>
          <p className="mb-4">Add some products to your cart to proceed with checkout.</p>
          <Button as={Link} to="/shop" variant="primary" size="lg">
            Start Shopping
          </Button>
        </div>
      );
    }

    return (
      <>
        <h2 className="mb-4">Your Cart</h2>

        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Table responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            {item.image ? (
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                className="me-3"
                              />
                            ) : (
                              <div 
                                className="me-3 d-flex align-items-center justify-content-center bg-light"
                                style={{ width: '60px', height: '60px', borderRadius: '4px' }}
                              >
                                <small className="text-muted">No image</small>
                              </div>
                            )}
                            <div style={{ maxWidth: '250px' }}>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">
                                {item.options && item.options.bagSize && `Size: ${item.options.bagSize}`}
                                {item.options && item.options.bagSize && item.options.color && ' | '}
                                {item.options && item.options.color && `Color: ${item.options.color}`}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <div className="d-flex align-items-center" style={{ width: '120px' }}>
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(index, item.quantity - 1)}
                              style={{ zIndex: 1 }}
                            >
                              <i className="bi bi-dash"></i>
                            </Button>
                            <Form.Control 
                              type="number" 
                              min="1" 
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                              className="mx-2 text-center"
                              style={{ width: '50px', position: 'relative', zIndex: 0 }}
                            />
                            <Button 
                              variant="outline-secondary" 
                              size="sm"
                              onClick={() => handleQuantityChange(index, item.quantity + 1)}
                              style={{ zIndex: 1 }}
                            >
                              <i className="bi bi-plus"></i>
                            </Button>
                          </div>
                        </td>
                        <td className="fw-bold">${(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <Button 
                            variant="link" 
                            className="text-danger p-0"
                            onClick={() => removeFromCart(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between">
              <Button 
                as={Link} 
                to="/shop" 
                variant="outline-secondary"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Button>
            </div>
          </Col>

          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header className="bg-transparent">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={() => setStep('info')}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  // Render info step
  const renderInfoStep = () => {
    return (
      <>
        <h2 className="mb-4">Shipping & Payment</h2>

        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <h5 className="mb-3">Shipping Information</h5>
                  <Row className="mb-3">
                    <Col md={6} className="mb-3 mb-md-0">
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="fullName" 
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={4} className="mb-3 mb-md-0">
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="city" 
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3 mb-md-0">
                      <Form.Group>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="postalCode" 
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="country" 
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <hr className="my-4" />

                  <h5 className="mb-3">Payment Information</h5>
                  <Form.Group className="mb-3">
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="cardName" 
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="cardNumber" 
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                      <Form.Group>
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="cardExpiry" 
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>CVV</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="cardCvv" 
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          placeholder="XXX"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4">
                    <Button 
                      variant="outline-secondary"
                      onClick={() => setStep('cart')}
                    >
                      Back to Cart
                    </Button>
                    <Button 
                      type="submit" 
                      variant="primary"
                    >
                      Complete Order
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header className="bg-transparent">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                {cartItems.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span className="text-truncate pe-2" style={{ maxWidth: '70%' }}>
                        {item.name} ({item.quantity}x)
                      </span>
                      <span className="flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {item.options && Object.keys(item.options).length > 0 && (
                      <small className="text-muted">
                        {Object.entries(item.options).map(([key, value]) => (
                          `${key}: ${value}`
                        )).join(', ')}
                      </small>
                    )}
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
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Container className="py-4">
      <StepIndicator currentStep={step} />

      {step === 'cart' && renderCartStep()}
      {step === 'info' && renderInfoStep()}
    </Container>
  );
};

export default Checkout;
