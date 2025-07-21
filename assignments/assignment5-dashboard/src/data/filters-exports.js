/**
 * Re-exports all filter-related functions and variables
 * This file is created to address build issues with the original filters.js
 */

// Re-export everything from filters.js
export * from './filters';

// Explicitly re-export each item for better compatibility
import {
  dsrMetricOptions,
  dsrBuyerTypeOptions,
  ltiMetricOptions,
  ltiInsuranceOptions,
  ltvMetricOptions,
  ltvBuyerTypeOptions,
  timeframeOptions,
  indicatorOptions,
  geographyOptions,
  incomeQuintileOptions,
  getApiEndpoint,
  getIndividualSeriesCode,
  getSeriesCode,
  getDateRange,
  defaultFilters
} from './filters';

export {
  dsrMetricOptions,
  dsrBuyerTypeOptions,
  ltiMetricOptions,
  ltiInsuranceOptions,
  ltvMetricOptions,
  ltvBuyerTypeOptions,
  timeframeOptions,
  indicatorOptions,
  geographyOptions,
  incomeQuintileOptions,
  getApiEndpoint,
  getIndividualSeriesCode,
  getSeriesCode,
  getDateRange,
  defaultFilters
};