import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  timeframeOptions,
  dsrMetricOptions,
  dsrBuyerTypeOptions,
  ltiMetricOptions,
  ltiInsuranceOptions,
  ltvMetricOptions,
  ltvBuyerTypeOptions
} from '../data/filters-exports';

const ChartFilter = ({ 
  initialFilters, 
  onApplyFilters,
  chartType
}) => {
  const { t } = useTranslation();

  // Set default filters based on chart type
  const getDefaultFilters = () => {
    switch (chartType) {
      case 'debtServiceRatio':
        return {
          metric: 'share_above_25',
          buyerType: 'all',
          timeframe: '5y'
        };
      case 'loanToIncome':
        return {
          metric: 'share_above_450',
          insuranceStatus: 'all',
          timeframe: '5y'
        };
      case 'loanToValue':
        return {
          metric: 'average',
          buyerType: 'all',
          timeframe: '5y'
        };
      default:
        return {
          timeframe: '5y'
        };
    }
  };

  const [filters, setFilters] = useState(initialFilters || getDefaultFilters());
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsExpanded(false); // Collapse after applying
  };

  return (
    <div className="chart-filter">
      {/* Filter Toggle Button */}
      <button 
        className="btn btn-sm btn-outline-secondary d-flex align-items-center mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls={`filter-panel-${chartType}`}
      >
        {isExpanded ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill me-2" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg>
            {t('filter.hide')}
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel me-2" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
            </svg>
            {t('filter.show')}
          </>
        )}
      </button>

      {/* Filter Panel - Expandable */}
      <div 
        id={`filter-panel-${chartType}`}
        className={`chart-filter-panel ${isExpanded ? 'show' : 'collapse'}`}
        style={{ 
          maxHeight: isExpanded ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out'
        }}
      >
        <div className="card p-3 mb-3">
          <div className="row g-2">
            {/* Render filters based on chart type */}
            {chartType === 'debtServiceRatio' && (
              <>
                {/* Metric filter for Mortgage Debt Service Ratio */}
                <div className="col-md-4">
                  <label className="form-label small" htmlFor={`metric-filter-${chartType}`}>
                    {t('filter.dsrMetric')}
                  </label>
                  <select
                    id={`metric-filter-${chartType}`}
                    className="form-select form-select-sm"
                    value={filters.metric}
                    onChange={(e) => handleFilterChange('metric', e.target.value)}
                  >
                    {dsrMetricOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buyer Type filter for Mortgage Debt Service Ratio */}
                <div className="col-md-4">
                  <label className="form-label small" htmlFor={`buyer-type-filter-${chartType}`}>
                    {t('filter.buyerType')}
                  </label>
                  <select
                    id={`buyer-type-filter-${chartType}`}
                    className="form-select form-select-sm"
                    value={filters.buyerType}
                    onChange={(e) => handleFilterChange('buyerType', e.target.value)}
                  >
                    {dsrBuyerTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label()}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {chartType === 'loanToIncome' && (
              <>
                {/* Metric filter for Loan-to-Income Ratio */}
                <div className="col-md-4">
                  <label className="form-label small" htmlFor={`metric-filter-${chartType}`}>
                    {t('filter.ltiMetric')}
                  </label>
                  <select
                    id={`metric-filter-${chartType}`}
                    className="form-select form-select-sm"
                    value={filters.metric}
                    onChange={(e) => handleFilterChange('metric', e.target.value)}
                  >
                    {ltiMetricOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Insurance Status filter for Loan-to-Income Ratio */}
                <div className="col-md-4">
                  <label className="form-label small" htmlFor={`insurance-status-filter-${chartType}`}>
                    {t('filter.insuranceStatus')}
                  </label>
                  <select
                    id={`insurance-status-filter-${chartType}`}
                    className="form-select form-select-sm"
                    value={filters.insuranceStatus}
                    onChange={(e) => handleFilterChange('insuranceStatus', e.target.value)}
                  >
                    {ltiInsuranceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label()}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {chartType === 'loanToValue' && (
              <>
                {/* Metric filter for Loan-to-Value Ratio */}
                <div className="col-md-4">
                  <label className="form-label small" htmlFor={`metric-filter-${chartType}`}>
                    {t('filter.ltvMetric')}
                  </label>
                  <select
                    id={`metric-filter-${chartType}`}
                    className="form-select form-select-sm"
                    value={filters.metric}
                    onChange={(e) => handleFilterChange('metric', e.target.value)}
                  >
                    {ltvMetricOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buyer Type filter for Loan-to-Value Ratio */}
                <div className="col-md-4">
                  <label className="form-label small" htmlFor={`buyer-type-filter-${chartType}`}>
                    {t('filter.buyerType')}
                  </label>
                  <select
                    id={`buyer-type-filter-${chartType}`}
                    className="form-select form-select-sm"
                    value={filters.buyerType}
                    onChange={(e) => handleFilterChange('buyerType', e.target.value)}
                  >
                    {ltvBuyerTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label()}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Timeframe filter (common to all chart types) */}
            <div className="col-md-4">
              <label className="form-label small" htmlFor={`timeframe-filter-${chartType}`}>
                {t('filter.timeframe')}
              </label>
              <select
                id={`timeframe-filter-${chartType}`}
                className="form-select form-select-sm"
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
          </div>

          {/* Filter actions */}
          <div className="d-flex justify-content-end mt-3">
            <button 
              className="btn btn-sm btn-primary" 
              onClick={handleApplyFilters}
            >
              {t('filter.apply')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartFilter;
