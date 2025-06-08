import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import StepIndicator from '../../components/StepIndicator';
import GearItem from '../../components/GearItem';
import { useBooking } from '../../context/BookingContext';
import gearAvailabilityData from '../../assets/mock/gear-availability.json';

const BookingStep3 = () => {
  const { 
    mode, 
    packageChoice, 
    setPackageChoice,
    extras,
    toggleExtra,
    gearSelections,
    setGearSelections
  } = useBooking();
  const navigate = useNavigate();

  // Local state
  const [gearData, setGearData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showRecommendedOnly, setShowRecommendedOnly] = useState(false);
  const [expandedGearList, setExpandedGearList] = useState(false);

  // Redirect if mode is not selected
  useEffect(() => {
    if (!mode) {
      navigate('/booking');
    }
  }, [mode, navigate]);

  // Fetch gear data for advanced mode
  useEffect(() => {
    if (mode === 'advanced') {
      setLoading(true);

      // Simulate API call with timeout
      setTimeout(() => {
        try {
          // Use the statically imported gear data
          setGearData(gearAvailabilityData);
          // Set first category as active by default
          if (gearAvailabilityData.categories && gearAvailabilityData.categories.length > 0) {
            setActiveCategory(gearAvailabilityData.categories[0].id);
          }
          setLoading(false);
        } catch (err) {
          console.error('Error loading gear data:', err);
          setError('Failed to load gear data. Please try again.');
          setLoading(false);
        }
      }, 500);
    }
  }, [mode]);

  // Handle package selection for simple mode
  const handlePackageSelect = (packageType) => {
    setPackageChoice(packageType);
  };

  // Handle back button
  const handleBack = () => {
    navigate('/booking/step/2');
  };

  // Handle next button
  const handleNext = () => {
    // Validate selection
    if (mode === 'simple' && !packageChoice) {
      alert('Please select a package to continue.');
      return;
    }

    navigate('/booking/step/4');
  };

  // Handle selecting all recommended gear
  const handleSelectRecommended = () => {
    if (!gearData) return;

    const recommendedGear = [];

    gearData.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.recommended && item.status !== 'Unavailable') {
          recommendedGear.push(item);
        }
      });
    });

    setGearSelections(recommendedGear);
  };

  // Handle removing an item directly from the selected items list
  const handleRemoveItem = (itemId) => {
    setGearSelections(prevSelections => 
      prevSelections.filter(item => item.id !== itemId)
    );
  };

  // Filter gear items based on search and recommended filter
  const filterGearItems = (items) => {
    if (showRecommendedOnly) {
      return items.filter(item => item.recommended);
    }
    return items;
  };

  // Render simple mode content
  const renderSimpleMode = () => (
    <div className="row g-4">
      <div className="col-12">
        <h3 className="text-heading mb-4">Choose Your Package</h3>

        <div className="row g-4">
          {/* Standard Package */}
          <div className="col-md-6">
            <div 
              className={`card h-100 ${packageChoice === 'standard' ? 'retro-border' : ''}`}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => handlePackageSelect('standard')}
            >
              <div className="card-body p-4 text-center">
                <span className="material-icons display-4 mb-3 text-primary">mic</span>
                <h4 className="card-title text-heading">Standard Package</h4>
                <p className="card-text mb-4">
                  Our most popular package for podcasters and voice-over artists.
                </p>

                <h5 className="h6 text-heading mb-3">Includes:</h5>
                <ul className="list-unstyled text-start mb-4">
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Engineer-assisted session
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    2 Shure SM7B microphones
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Basic mixing console
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Headphones for all participants
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Basic audio processing
                  </li>
                </ul>

                <button 
                  className={`btn ${packageChoice === 'standard' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePackageSelect('standard');
                  }}
                >
                  {packageChoice === 'standard' ? 'Selected' : 'Select Package'}
                </button>
              </div>
            </div>
          </div>

          {/* Premium Package */}
          <div className="col-md-6">
            <div 
              className={`card h-100 ${packageChoice === 'premium' ? 'retro-border' : ''}`}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
              onClick={() => handlePackageSelect('premium')}
            >
              <div className="card-body p-4 text-center">
                <span className="material-icons display-4 mb-3 text-secondary">music_note</span>
                <h4 className="card-title text-heading">Premium Package</h4>
                <p className="card-text mb-4">
                  Perfect for musicians and those seeking professional-grade equipment.
                </p>

                <h5 className="h6 text-heading mb-3">Includes:</h5>
                <ul className="list-unstyled text-start mb-4">
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Engineer-assisted session
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Neumann U87 condenser microphone
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Neve 1073 preamp
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    LA-2A compressor
                  </li>
                  <li className="mb-2">
                    <span className="material-icons text-success me-2 small">check_circle</span>
                    Professional mixing and mastering
                  </li>
                </ul>

                <button 
                  className={`btn ${packageChoice === 'premium' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePackageSelect('premium');
                  }}
                >
                  {packageChoice === 'premium' ? 'Selected' : 'Select Package'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Extra Options */}
        <div className="card mt-4">
          <div className="card-body">
            <h4 className="text-heading h5 mb-3">Additional Options</h4>

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="extraTime"
                checked={extras.extraTime}
                onChange={() => toggleExtra('extraTime')}
              />
              <label className="form-check-label" htmlFor="extraTime">
                Add Extra 30 Minutes (+$35)
              </label>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="savePreferences"
                checked={extras.savePreferences}
                onChange={() => toggleExtra('savePreferences')}
              />
              <label className="form-check-label" htmlFor="savePreferences">
                Save my preferences for next time
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render advanced mode content
  const renderAdvancedMode = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading available gear...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }

    if (!gearData || !gearData.categories) {
      return (
        <div className="alert alert-warning" role="alert">
          No gear data available. Please try again later.
        </div>
      );
    }

    return (
      <div className="row g-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-heading mb-0">Select Your Gear</h3>

            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary"
                onClick={handleSelectRecommended}
              >
                <span className="material-icons small me-1">recommend</span>
                Select Recommended
              </button>

              <div className="form-check form-switch d-flex align-items-center ms-3">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  id="showRecommended"
                  checked={showRecommendedOnly}
                  onChange={() => setShowRecommendedOnly(!showRecommendedOnly)}
                />
                <label className="form-check-label" htmlFor="showRecommended">
                  Show Recommended Only
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Category Navigation */}
            <div className="col-md-3">
              <div className="list-group mb-4">
                {gearData.categories.map(category => (
                  <button
                    key={category.id}
                    className={`list-group-item list-group-item-action ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-heading">Selected Items: {gearSelections.length}</h5>
                  <div className="card-text">
                    {gearSelections.length === 0 ? (
                      <span className="text-muted">No items selected</span>
                    ) : (
                      <>
                        <ul className="list-unstyled mb-0">
                          {(expandedGearList ? gearSelections : gearSelections.slice(0, 3)).map(item => (
                            <li key={item.id} className="small mb-2 d-flex justify-content-between align-items-center">
                              <div>
                                <span className="material-icons text-success me-1 small">check_circle</span>
                                {item.name}
                              </div>
                              <button 
                                type="button" 
                                className="btn btn-sm btn-outline-danger" 
                                onClick={() => handleRemoveItem(item.id)}
                                aria-label={`Remove ${item.name}`}
                              >
                                <span className="material-icons small">close</span>
                              </button>
                            </li>
                          ))}
                          {!expandedGearList && gearSelections.length > 3 && (
                            <li className="small text-center mt-2">
                              <button 
                                type="button" 
                                className="btn btn-sm btn-outline-primary" 
                                onClick={() => setExpandedGearList(true)}
                              >
                                Show all {gearSelections.length} items
                              </button>
                            </li>
                          )}
                        </ul>
                        {expandedGearList && gearSelections.length > 3 && (
                          <div className="text-center mt-2">
                            <button 
                              type="button" 
                              className="btn btn-sm btn-outline-primary" 
                              onClick={() => setExpandedGearList(false)}
                            >
                              Show less
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Gear Items */}
            <div className="col-md-9">
              {gearData.categories.map(category => (
                <div 
                  key={category.id} 
                  className={activeCategory === category.id ? 'd-block' : 'd-none'}
                >
                  <h4 className="text-heading h5 mb-3">{category.name}</h4>

                  {filterGearItems(category.items).length === 0 ? (
                    <p className="text-muted">No items match your filter criteria.</p>
                  ) : (
                    filterGearItems(category.items).map(item => (
                      <GearItem key={item.id} item={item} />
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={mode === 'simple' ? 'Choose Your Package' : 'Select Your Gear'}
        subtitle={`Step 3: ${mode === 'simple' ? 'Select a pre-configured package' : 'Customize your gear selection'}`}
        backgroundImage="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
        height="50vh"
      />

      {/* Booking Step Content */}
      <section className="booking-step py-5">
        <div className="container">
          {/* Step Indicator */}
          <StepIndicator currentStep={3} />

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="text-heading mb-4">
                {mode === 'simple' ? 'Choose Your Package' : 'Select Your Gear'}
              </h2>
              <p className="lead">
                {mode === 'simple' 
                  ? 'Select a pre-configured package that suits your needs.' 
                  : 'Customize your session by selecting the gear you need.'}
              </p>
            </div>
          </div>

          {/* Mode-specific content */}
          {mode === 'simple' ? renderSimpleMode() : renderAdvancedMode()}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-5">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={handleBack}
            >
              <span className="material-icons small me-1">arrow_back</span>
              Back
            </button>
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next
              <span className="material-icons small ms-1">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingStep3;
