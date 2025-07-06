import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button, Badge, Offcanvas } from 'react-bootstrap';

const Header = ({ cartItems, theme, toggleTheme }) => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate cart subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const handleCheckout = () => {
    handleCloseCart();
    navigate('/checkout');
  };

  return (
    <header>
      <Navbar expand="lg" className="py-3 fixed-top bg-body">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">Steep & Bloom Co.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
              <Nav.Link as={Link} to="/shop" className="mx-2">Shop</Nav.Link>
              <Nav.Link as={Link} to="/about" className="mx-2">About</Nav.Link>
              <Nav.Link as={Link} to="/blog" className="mx-2">Blog</Nav.Link>
              <Button 
                variant="link" 
                className="mx-2 p-0 position-relative" 
                onClick={handleShowCart}
                aria-label="Shopping cart"
              >
                <i className="bi bi-cart3 fs-5"></i>
                {totalItems > 0 && (
                  <Badge 
                    pill 
                    bg="primary" 
                    className="position-absolute"
                    style={{ top: '-5px', right: '-8px', fontSize: '0.65rem' }}
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Button 
                id="theme-toggle" 
                onClick={toggleTheme} 
                variant="link" 
                className="mx-2 p-0"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <i className="bi bi-sun-fill fs-5"></i>
                <i className="bi bi-moon-fill fs-5"></i>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Cart Sidebar */}
      <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-cart3 fs-1 text-muted"></i>
              <p className="mt-3">Your cart is empty</p>
              <Button 
                variant="primary" 
                as={Link} 
                to="/shop" 
                onClick={handleCloseCart}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="cart-items mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cart-item-image me-3" 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{item.name}</h6>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <small className="text-muted">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </small>
                        <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span className="fw-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline-secondary" onClick={handleCloseCart}>
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
