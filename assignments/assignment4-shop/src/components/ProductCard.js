import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
  const { id, name, price, image, category, featured } = product;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation to product detail
    e.stopPropagation(); // Prevent event bubbling

    // Disable the button temporarily to prevent double clicks
    const button = e.currentTarget;
    button.disabled = true;

    addToCart(product, 1);

    // Re-enable the button after a short delay
    setTimeout(() => {
      button.disabled = false;
    }, 500);
  };

  return (
    <Card className="product-card h-100 border-0 shadow-sm d-flex flex-column">
      <Link to={`/product/${id}`} className="text-decoration-none d-flex flex-column flex-grow-1">
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={image} 
            alt={name}
            className="product-image"
          />
        </div>
        <Card.Body className="d-flex flex-column flex-grow-1">
          <div>
            <small className="text-muted text-uppercase">{category}</small>
            <Card.Title className="mb-1 mt-2 h5">{name}</Card.Title>
            {featured && (
              <Badge 
                bg="success" 
                className="mb-2 text-white"
              >
                Featured
              </Badge>
            )}
            <Card.Text className="fw-bold mb-3">${price.toFixed(2)}</Card.Text>
          </div>
          <div className="mt-auto pt-3">
            <Button 
              variant="primary" 
              className="w-100"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
