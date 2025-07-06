import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Form, Button, Offcanvas } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import { beanProducts, toolProducts } from '../data/products';

const Shop = ({ addToCart }) => {
  // State for active category
  const [activeCategory, setActiveCategory] = useState('beans');
  
  // State for filters
  const [filters, setFilters] = useState({});
  
  // State for sorting
  const [sortOption, setSortOption] = useState('');
  
  // State for mobile filter sidebar
  const [showFilters, setShowFilters] = useState(false);
  
  // Get products based on active category
  const products = activeCategory === 'beans' ? beanProducts : toolProducts;
  
  // Initialize category from localStorage if available
  useEffect(() => {
    const savedCategory = localStorage.getItem('defaultCategory');
    if (savedCategory && (savedCategory === 'beans' || savedCategory === 'tools')) {
      setActiveCategory(savedCategory);
      localStorage.removeItem('defaultCategory');
    }
  }, []);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // If no filters are selected, show all products
    if (Object.keys(filters).length === 0) return true;
    
    // Check if product matches all selected filters
    return Object.entries(filters).every(([filterType, selectedValues]) => {
      // If no values are selected for this filter type, it passes
      if (selectedValues.length === 0) return true;
      
      // Special case for price range filter
      if (filterType === 'priceRange') {
        return selectedValues.some(range => {
          if (range === 'Under $20') return product.price < 20;
          if (range === '$20-$50') return product.price >= 20 && product.price <= 50;
          if (range === 'Over $50') return product.price > 50;
          return false;
        });
      }
      
      // For other filter types, check if product details match any selected value
      if (filterType === 'tastingNotes') {
        // For tasting notes, check if any of the product's tasting notes match any selected value
        return selectedValues.some(value => 
          product.details.tastingNotes && product.details.tastingNotes.includes(value)
        );
      }
      
      // For color filter
      if (filterType === 'color') {
        return selectedValues.some(value => 
          product.details.color && product.details.color.includes(value)
        );
      }
      
      // For brewing method filter (tools)
      if (filterType === 'brewingMethod') {
        // Check if the tool is compatible with the selected brewing method
        if (product.details.compatibility) {
          return selectedValues.some(method => 
            product.details.compatibility.toLowerCase().includes(method.toLowerCase())
          );
        }
        return false;
      }
      
      // For standard filters, check if the product detail matches any selected value
      const productValue = product.details[filterType];
      if (Array.isArray(productValue)) {
        return selectedValues.some(value => productValue.includes(value));
      }
      return selectedValues.includes(productValue);
    });
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
    return 0; // Default: no sorting
  });
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilters({}); // Reset filters when changing category
  };
  
  return (
    <Container className="my-4">
      {/* Category Tabs */}
      <Nav 
        variant="tabs" 
        className="mb-4 border-0"
        activeKey={activeCategory}
        onSelect={handleCategoryChange}
      >
        <Nav.Item>
          <Nav.Link 
            eventKey="beans" 
            className={`px-4 ${activeCategory === 'beans' ? 'fw-bold' : ''}`}
          >
            ☕ Coffee Beans
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            eventKey="tools" 
            className={`px-4 ${activeCategory === 'tools' ? 'fw-bold' : ''}`}
          >
            🛠 Brewing Tools
          </Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Row>
        {/* Filter Sidebar - Desktop */}
        <Col lg={3} className="d-none d-lg-block">
          <FilterSidebar 
            category={activeCategory} 
            filters={filters} 
            setFilters={setFilters} 
          />
        </Col>
        
        {/* Product Grid */}
        <Col lg={9}>
          {/* Mobile Filter Button & Sort */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Button 
              variant="outline-secondary" 
              className="d-lg-none"
              onClick={() => setShowFilters(true)}
            >
              <i className="bi bi-funnel me-2"></i>
              Filters
            </Button>
            
            <div className="d-flex align-items-center">
              <small className="text-muted me-2">
                {sortedProducts.length} products found
              </small>
              <Form.Select 
                size="sm" 
                style={{ width: 'auto' }}
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </Form.Select>
            </div>
          </div>
          
          {/* Products */}
          <Row className="g-4">
            {sortedProducts.length > 0 ? (
              sortedProducts.map(product => (
                <Col key={product.id} sm={6} lg={4} className="mb-4">
                  <ProductCard product={product} addToCart={addToCart} />
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <i className="bi bi-search fs-1 text-muted"></i>
                <p className="mt-3">No products match your filters.</p>
                <Button 
                  variant="outline-primary" 
                  onClick={() => setFilters({})}
                >
                  Clear All Filters
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      
      {/* Mobile Filter Sidebar */}
      <Offcanvas 
        show={showFilters} 
        onHide={() => setShowFilters(false)} 
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <FilterSidebar 
            category={activeCategory} 
            filters={filters} 
            setFilters={setFilters} 
          />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Shop;