import React from 'react';
import { Form, Accordion } from 'react-bootstrap';
import { beanFilters, toolFilters } from '../data/products';

const FilterSidebar = ({ category, filters, setFilters }) => {
  // Get the appropriate filter options based on category
  const filterOptions = category === 'beans' ? beanFilters : toolFilters;

  // Handle checkbox change
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      // If the filter type doesn't exist yet, create it
      if (!prevFilters[filterType]) {
        return {
          ...prevFilters,
          [filterType]: [value]
        };
      }

      // If the value is already selected, remove it
      if (prevFilters[filterType].includes(value)) {
        return {
          ...prevFilters,
          [filterType]: prevFilters[filterType].filter(item => item !== value)
        };
      }

      // Otherwise, add the value to the selected filters
      return {
        ...prevFilters,
        [filterType]: [...prevFilters[filterType], value]
      };
    });
  };

  // Check if a filter is selected
  const isFilterSelected = (filterType, value) => {
    return !!(filters[filterType] && filters[filterType].includes(value));
  };

  // Render filter groups based on category
  const renderFilterGroups = () => {
    if (category === 'beans') {
      return (
        <>
          <FilterGroup 
            title="Roast Level" 
            options={filterOptions.roastLevel}
            filterType="roastLevel"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Origin" 
            options={filterOptions.origin}
            filterType="origin"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Brew Method" 
            options={filterOptions.brewMethod}
            filterType="brewMethod"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Tasting Notes" 
            options={filterOptions.tastingNotes}
            filterType="tastingNotes"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Grind Type" 
            options={filterOptions.grindType}
            filterType="grindType"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Bag Size" 
            options={filterOptions.bagSize}
            filterType="bagSize"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />
        </>
      );
    } else {
      return (
        <>
          <FilterGroup 
            title="Material" 
            options={filterOptions.material}
            filterType="material"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Color" 
            options={filterOptions.color}
            filterType="color"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Price Range" 
            options={filterOptions.priceRange}
            filterType="priceRange"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />

          <FilterGroup 
            title="Brewing Method" 
            options={filterOptions.brewingMethod}
            filterType="brewingMethod"
            filters={filters}
            handleFilterChange={handleFilterChange}
            isFilterSelected={isFilterSelected}
          />
        </>
      );
    }
  };

  return (
    <div className="filter-sidebar">
      <h4 className="mb-4">Filters: {category === 'beans' ? 'Beans' : 'Tools'}</h4>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        {renderFilterGroups()}
      </Accordion>

      {Object.keys(filters).length > 0 && (
        <button 
          className="btn btn-outline-secondary mt-3 w-100"
          onClick={() => setFilters({})}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

// Filter group component
const FilterGroup = ({ title, options, filterType, filters, handleFilterChange, isFilterSelected }) => {
  return (
    <Accordion.Item eventKey={filterType} className="mb-2">
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        <Form>
          {options.map((option, index) => (
            <Form.Check 
              key={index}
              type="checkbox"
              id={`${filterType}-${index}`}
              label={option}
              checked={isFilterSelected(filterType, option)}
              onChange={() => handleFilterChange(filterType, option)}
              className="mb-2"
            />
          ))}
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default FilterSidebar;
