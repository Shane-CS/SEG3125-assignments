import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  geographyOptions, 
  indicatorOptions,
  incomeQuintileOptions,
  timeframeOptions, 
  defaultFilters 
} from '../data/filters';

const FilterSidebar = ({ 
  onApplyFilters, 
  initialFilters = defaultFilters,
  isCollapsed,
  toggleSidebar
}) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState(initialFilters);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  // Apply filters
  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  // Reset filters to defaults
  const handleResetFilters = () => {
    setFilters(defaultFilters);
    onApplyFilters(defaultFilters);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''} ${!isCollapsed ? 'sidebar-visible' : ''}`}>
      {/* Sidebar toggle button - only visible on mobile */}
      <button 
        className="sidebar-toggle d-lg-none" /* Only show on mobile */
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        )}
      </button>

      {/* Sidebar content - hidden when collapsed */}
      {!isCollapsed && (
        <div className="sidebar-content">
          <div className="filter-section">
            <h3 className="filter-title">{t('filter.title')}</h3>

            {/* Indicator filter */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="indicator-filter">
                {t('filter.indicator')}
              </label>
              <select
                id="indicator-filter"
                className="filter-select form-select"
                value={filters.indicator}
                onChange={(e) => handleFilterChange('indicator', e.target.value)}
              >
                {indicatorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label()}
                  </option>
                ))}
              </select>
            </div>

            {/* Geography filter */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="geography-filter">
                {t('filter.geography')}
              </label>
              <select
                id="geography-filter"
                className="filter-select form-select"
                value={filters.geography}
                onChange={(e) => handleFilterChange('geography', e.target.value)}
              >
                {geographyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label()}
                  </option>
                ))}
              </select>
            </div>

            {/* Income Quintile filter - shown for all indicators */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="income-quintile-filter">
                {t('filter.incomeQuintile')}
              </label>
              <select
                id="income-quintile-filter"
                className="filter-select form-select"
                value={filters.incomeQuintile}
                onChange={(e) => handleFilterChange('incomeQuintile', e.target.value)}
              >
                {incomeQuintileOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label()}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe filter */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="timeframe-filter">
                {t('filter.timeframe')}
              </label>
              <select
                id="timeframe-filter"
                className="filter-select form-select"
                value={filters.timeframe}
                onChange={(e) => handleFilterChange('timeframe', e.target.value)}
              >
                {timeframeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label()}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter actions */}
            <div className="filter-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleApplyFilters}
              >
                {t('filter.apply')}
              </button>
              <button 
                className="btn btn-outline-secondary" 
                onClick={handleResetFilters}
              >
                {t('filter.reset')}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default FilterSidebar;
