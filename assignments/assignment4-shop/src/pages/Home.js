import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/products';

const Home = ({ addToCart }) => {
  // Get featured products
  const featuredProducts = allProducts.filter(product => product.featured);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <div className="hero-content text-center">
            <h1 className="display-5 fw-bold mb-4">Welcome to Steep & Bloom Co.</h1>
            <p className="lead mb-4">Fresh-roasted. Fast-shipped. Brew better today.</p>
            <Button 
              as={Link} 
              to="/shop" 
              variant="primary" 
              size="lg" 
              className="px-4 py-2"
            >
              Shop Now
            </Button>
          </div>
        </Container>
      </section>

      {/* Category Cards */}
      <Container className="my-5">
        <Row className="g-4">
          <Col md={6}>
            <Card className="category-card border-0 h-100">
              <Card.Body className="text-center category-beans">
                <h3 className="mb-3">☕ Beans</h3>
                <p className="mb-4">Light to bold — hand-picked, freshly roasted beans for every palette.</p>
                <Button 
                  as={Link} 
                  to="/shop" 
                  variant="primary"
                  onClick={() => localStorage.setItem('defaultCategory', 'beans')}
                >
                  Browse Beans
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="category-card border-0 h-100">
              <Card.Body className="text-center category-tools">
                <h3 className="mb-3">🛠 Tools</h3>
                <p className="mb-4">Everything you need to master your brew at home, beautifully designed.</p>
                <Button 
                  as={Link} 
                  to="/shop" 
                  variant="primary"
                  onClick={() => localStorage.setItem('defaultCategory', 'tools')}
                >
                  Browse Tools
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Featured Products */}
      <Container className="my-5">
        <h2 className="mb-4">Featured Products</h2>
        <Row className="g-4">
          {featuredProducts.map(product => (
            <Col key={product.id} md={6} lg={4}>
              <ProductCard product={product} addToCart={addToCart} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Promotional Banner */}
      <section className="py-5 my-5 promo-banner">
        <Container>
          <Row className="align-items-center">
            <Col md={7} className="text-center text-md-start">
              <h2 className="mb-3">Join Our Coffee Club</h2>
              <p className="lead mb-4">Get fresh beans delivered monthly and save 15% on every order.</p>
            </Col>
            <Col md={5} className="d-none d-md-block">
              <img 
                src="https://images.unsplash.com/photo-1680988469690-b0687fd61bcc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Coffee Club" 
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Brewing Guide Teaser */}
      <Container className="my-5">
        <Row className="g-4">
          <Col md={4} className="mb-4 mb-md-0">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1703592419600-fccbb40d5b96?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Card.Body>
                <Card.Title>Pour Over Guide</Card.Title>
                <Card.Text>Master the art of pour-over brewing with our step-by-step guide.</Card.Text>
                <Button 
                  as={Link} 
                  to="/blog#post-1" 
                  variant="outline-primary"
                >
                  Read Guide
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1708127368781-cd5f069a90a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlbmNoJTIwcHJlc3N8ZW58MHx8MHx8fDA%3D" />
              <Card.Body>
                <Card.Title>French Press Tips</Card.Title>
                <Card.Text>Get the perfect French press brew every time with these expert tips.</Card.Text>
                <Button 
                  as={Link} 
                  to="/blog#post-5" 
                  variant="outline-primary"
                >
                  Read Guide
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1616388761741-a5936c6f61f6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              <Card.Body>
                <Card.Title>Espresso Basics</Card.Title>
                <Card.Text>Learn the fundamentals of pulling the perfect espresso shot at home.</Card.Text>
                <Button 
                  as={Link} 
                  to="/blog#post-6" 
                  variant="outline-primary"
                >
                  Read Guide
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
