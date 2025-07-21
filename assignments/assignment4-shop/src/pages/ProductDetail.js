import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Form, Alert } from 'react-bootstrap';
import { allProducts } from '../data/products';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the product by ID
  const product = allProducts.find(p => p.id === id);

  // State for selected options
  const [selectedOptions, setSelectedOptions] = useState({});

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // State for success message
  const [showSuccess, setShowSuccess] = useState(false);

  // Get related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 3);

  // Initialize selected options based on product details
  useEffect(() => {
    if (product) {
      const initialOptions = {};

      // For beans, set default bag size
      if (product.category === 'beans' && product.details.bagSizes) {
        initialOptions.bagSize = product.details.bagSizes[0];
      }

      // For tools with color options, set default color
      if (product.category === 'tools' && product.details.color) {
        initialOptions.color = product.details.color[0];
      }

      setSelectedOptions(initialOptions);
    }
  }, [product]);

  // Handle option change
  const handleOptionChange = (option, value) => {
    setSelectedOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const handleAddToCart = (e) => {
    // Disable the button temporarily to prevent double clicks
    const button = e.currentTarget;
    button.disabled = true;

    addToCart(product, quantity, selectedOptions);
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      button.disabled = false;
    }, 3000);
  };

  // If product not found
  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <Button as={Link} to="/shop" variant="primary" className="mt-3">
          Back to Shop
        </Button>
      </Container>
    );
  }

  // Render product details based on category
  const renderProductDetails = () => {
    if (product.category === 'beans') {
      return (
        <div className="mb-4">
          <h5 className="mb-3">Specifications</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>Roast Level:</strong> {product.details.roastLevel}
            </li>
            <li className="mb-2">
              <strong>Origin:</strong> {product.details.origin}
            </li>
            <li className="mb-2">
              <strong>Recommended Brew:</strong> {product.details.brewMethod}
            </li>
            <li className="mb-2">
              <strong>Tasting Notes:</strong> {product.details.tastingNotes.join(', ')}
            </li>
            <li className="mb-2">
              <strong>Grind Type:</strong> {product.details.grindType}
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <h5 className="mb-3">Specifications</h5>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>Material:</strong> {product.details.material}
            </li>
            {product.details.capacity && (
              <li className="mb-2">
                <strong>Capacity:</strong> {product.details.capacity}
              </li>
            )}
            {product.details.includes && (
              <li className="mb-2">
                <strong>Includes:</strong> {Array.isArray(product.details.includes) 
                  ? product.details.includes.join(', ') 
                  : product.details.includes}
              </li>
            )}
            {product.details.compatibility && (
              <li className="mb-2">
                <strong>Compatibility:</strong> {product.details.compatibility}
              </li>
            )}
            {product.details.features && (
              <li className="mb-2">
                <strong>Features:</strong> {Array.isArray(product.details.features) 
                  ? product.details.features.join(', ') 
                  : product.details.features}
              </li>
            )}
          </ul>
        </div>
      );
    }
  };

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <div className="mb-4">
        <small className="text-muted">
          <Link to="/" className="text-decoration-none">Home</Link>
          {' > '}
          <Link to="/shop" className="text-decoration-none">Shop</Link>
          {' > '}
          <span>{product.name}</span>
        </small>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert 
          variant="success" 
          className="mb-4 d-flex justify-content-between align-items-center"
        >
          <span>
            <i className="bi bi-check-circle me-2"></i>
            Product added to cart!
          </span>
          <Button 
            variant="success" 
            size="sm"
            onClick={() => navigate('/checkout')}
          >
            View Cart
          </Button>
        </Alert>
      )}

      <Row className="mb-5">
        {/* Product Image */}
        <Col md={6} className="mb-4 mb-md-0">
          <div className="bg-light rounded p-3 d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="img-fluid rounded" 
              style={{ maxHeight: '100%', maxWidth: '100%' }}
            />
          </div>
        </Col>

        {/* Product Info */}
        <Col md={6}>
          <h1 className="mb-2">{product.name}</h1>

          {product.featured && (
            <Badge bg="success" className="mb-3 text-white">Top Pick</Badge>
          )}

          <p className="mb-3">{product.description}</p>

          <h3 className="mb-4">${product.price.toFixed(2)}</h3>

          {/* Options for beans */}
          {product.category === 'beans' && product.details.bagSizes && (
            <Form.Group className="mb-4">
              <Form.Label><strong>Bag Size</strong></Form.Label>
              <Form.Select 
                value={selectedOptions.bagSize || ''}
                onChange={(e) => handleOptionChange('bagSize', e.target.value)}
              >
                {product.details.bagSizes.map((size, index) => (
                  <option key={index} value={size}>{size}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {/* Options for tools with colors */}
          {product.category === 'tools' && product.details.color && (
            <Form.Group className="mb-4">
              <Form.Label><strong>Color</strong></Form.Label>
              <div className="d-flex gap-2">
                {product.details.color.map((color, index) => (
                  <Button 
                    key={index}
                    variant={selectedOptions.color === color ? 'primary' : 'outline-secondary'}
                    onClick={() => handleOptionChange('color', color)}
                    className="px-3 py-2"
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </Form.Group>
          )}

          {/* Quantity */}
          <Form.Group className="mb-4">
            <Form.Label><strong>Quantity</strong></Form.Label>
            <div className="d-flex align-items-center" style={{ maxWidth: '150px' }}>
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <i className="bi bi-dash"></i>
              </Button>
              <Form.Control 
                type="number" 
                min="1" 
                value={quantity}
                onChange={handleQuantityChange}
                className="mx-2 text-center"
              />
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="bi bi-plus"></i>
              </Button>
            </div>
          </Form.Group>

          {/* Product details */}
          {renderProductDetails()}

          {/* Add to Cart Button */}
          <Button 
            variant="primary" 
            size="lg" 
            className="w-100 mt-3"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>

      {/* Related Products */}
      <section className="mb-5">
        <h3 className="mb-4">You May Also Like</h3>
        <Row className="g-4">
          {relatedProducts.map(relatedProduct => (
            <Col key={relatedProduct.id} md={4} className="mb-4">
              <div 
                className="card h-100 border-0 shadow-sm product-card"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name} 
                  className="card-img-top product-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{relatedProduct.name}</h5>
                  <p className="card-text fw-bold">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default ProductDetail;
