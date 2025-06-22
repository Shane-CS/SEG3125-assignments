import React from 'react';
import { useBooking } from '../context/BookingContext';

const GearItem = ({ item }) => {
  const { gearSelections, toggleGearItem } = useBooking();
  
  // Check if this item is selected
  const isSelected = gearSelections.some(gear => gear.id === item.id);
  
  // Determine status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available':
        return 'bg-success';
      case 'Limited':
        return 'bg-warning';
      case 'Unavailable':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };
  
  // Determine if item can be selected
  const isDisabled = item.status === 'Unavailable';
  
  return (
    <div 
      className={`card mb-3 ${isSelected ? 'retro-border' : ''}`}
      style={{ transition: 'all 0.3s ease' }}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="card-title mb-0 text-heading">{item.name}</h6>
          <span className={`badge ${getStatusBadge(item.status)}`}>
            {item.status}
          </span>
        </div>
        
        <p className="card-text small mb-3">{item.description}</p>
        
        <div className="d-flex justify-content-between align-items-center">
          {item.additionalFee > 0 && (
            <span className="text-muted">
              +${item.additionalFee}
            </span>
          )}
          
          <div className="form-check form-switch ms-auto">
            <input
              className="form-check-input"
              type="checkbox"
              id={`gear-${item.id}`}
              checked={isSelected}
              onChange={() => toggleGearItem(item)}
              disabled={isDisabled}
            />
            <label className="form-check-label" htmlFor={`gear-${item.id}`}>
              {isSelected ? 'Selected' : 'Select'}
            </label>
          </div>
        </div>
        
        {item.recommended && (
          <div className="mt-2">
            <span className="badge bg-info">Recommended</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GearItem;