import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Survey from './pages/Survey';
import About from './pages/About';
import Blog from './pages/Blog';

function App() {
  // State for cart items
  const [cartItems, setCartItems] = useState([]);

  // State for theme (light/dark)
  const [theme, setTheme] = useState('light');

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
  }, []);

  // Add to cart function
  const addToCart = (product, quantity = 1, options = {}) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item if product doesn't exist
        return [...prevItems, { ...product, quantity, options }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Update cart item quantity
  const updateCartItemQuantity = (index, quantity) => {
    setCartItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = quantity;
      return updatedItems;
    });
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      <Header 
        cartItems={cartItems} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetail addToCart={addToCart} />} 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cartItems} 
                updateCartItemQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
              />
            } 
          />
          <Route 
            path="/confirmation" 
            element={<Confirmation cartItems={cartItems} clearCart={clearCart} />} 
          />
          <Route path="/survey" element={<Survey />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
