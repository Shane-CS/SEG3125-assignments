import React, { createContext, useState, useContext, useEffect } from 'react';
import { PRICING } from '../config';

// Create context
const BookingContext = createContext();

// Custom hook to use the booking context
export const useBooking = () => useContext(BookingContext);

// Provider component
export const BookingProvider = ({ children }) => {
  // Theme state (light/dark)
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Booking state
  const [mode, setMode] = useState(null); // 'simple' or 'advanced'
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(1); // Default 1 hour
  const [gearSelections, setGearSelections] = useState([]);
  const [packageChoice, setPackageChoice] = useState(null);
  const [extras, setExtras] = useState({
    extraTime: false,
    savePreferences: false
  });
  const [cost, setCost] = useState(0);

  // Update document theme attribute when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Compute cost whenever relevant state changes
  useEffect(() => {
    let calculatedCost = 0;
    
    if (mode === 'simple') {
      calculatedCost = duration * PRICING.SIMPLE_MODE.HOURLY_RATE;
      if (extras.extraTime) {
        calculatedCost += PRICING.SIMPLE_MODE.EXTRA_30_MIN;
      }
    } else if (mode === 'advanced') {
      calculatedCost = duration * PRICING.ADVANCED_MODE.HOURLY_RATE;
      
      // Add cost of selected gear
      gearSelections.forEach(gear => {
        if (gear.additionalFee) {
          calculatedCost += gear.additionalFee;
        }
      });
    }
    
    setCost(calculatedCost);
  }, [mode, duration, gearSelections, extras, packageChoice]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Toggle gear item selection
  const toggleGearItem = (gearItem) => {
    setGearSelections(prevSelections => {
      const exists = prevSelections.some(item => item.id === gearItem.id);
      
      if (exists) {
        return prevSelections.filter(item => item.id !== gearItem.id);
      } else {
        return [...prevSelections, gearItem];
      }
    });
  };

  // Toggle extra options
  const toggleExtra = (extraKey) => {
    setExtras(prevExtras => ({
      ...prevExtras,
      [extraKey]: !prevExtras[extraKey]
    }));
  };

  // Reset booking state
  const resetBooking = () => {
    setMode(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setDuration(1);
    setGearSelections([]);
    setPackageChoice(null);
    setExtras({
      extraTime: false,
      savePreferences: false
    });
    setCost(0);
  };

  // Submit booking
  const submitBooking = async () => {
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return a success response
      return {
        success: true,
        bookingId: `SW-${Date.now().toString().slice(-6)}`,
        message: 'Booking confirmed successfully!'
      };
    } catch (error) {
      console.error('Error submitting booking:', error);
      return {
        success: false,
        message: 'There was an error processing your booking. Please try again.'
      };
    }
  };

  // Context value
  const value = {
    // State
    theme,
    mode,
    selectedDate,
    selectedTime,
    duration,
    gearSelections,
    packageChoice,
    extras,
    cost,
    
    // Methods
    setMode,
    setSelectedDate,
    setSelectedTime,
    setDuration,
    setGearSelections,
    setPackageChoice,
    toggleTheme,
    toggleGearItem,
    toggleExtra,
    resetBooking,
    submitBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;