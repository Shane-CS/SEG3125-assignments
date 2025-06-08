import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Context
import { BookingProvider } from './context/BookingContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Studios from './pages/Studios';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import BookingStep1 from './pages/booking/BookingStep1';
import BookingStep2 from './pages/booking/BookingStep2';
import BookingStep3 from './pages/booking/BookingStep3';
import BookingStep4 from './pages/booking/BookingStep4';
import BookingStep5 from './pages/booking/BookingStep5';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <BookingProvider>
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<BookingStep1 />} />
            <Route path="/booking/step/1" element={<BookingStep1 />} />
            <Route path="/booking/step/2" element={<BookingStep2 />} />
            <Route path="/booking/step/3" element={<BookingStep3 />} />
            <Route path="/booking/step/4" element={<BookingStep4 />} />
            <Route path="/booking/step/5" element={<BookingStep5 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}

export default App;