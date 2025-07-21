/**
 * Filter configuration for the Household Indebtedness Dashboard
 * Defines the available filter options for indicator type, geography, and timeframe
 */
import i18next from 'i18next';

// Helper function to get translation
const t = (key) => i18next.t(key);

// Chart-specific filter options based on charts.md requirements

// Chart 1: Mortgage debt service ratio
export const dsrMetricOptions = [
  { value: 'share_above_25', label: () => t('dsr.shareAbove25') },
  { value: 'median', label: () => t('dsr.median') }
];

export const dsrBuyerTypeOptions = [
  { value: 'all', label: () => t('buyerType.all') },
  { value: 'by_insurance', label: () => t('buyerType.byInsurance') },
  { value: 'by_buyer_type', label: () => t('buyerType.byBuyerType') }
];

// Chart 2: Loan-to-income ratio
export const ltiMetricOptions = [
  { value: 'share_above_450', label: () => t('lti.shareAbove450') },
  { value: 'median', label: () => t('lti.median') }
];

export const ltiInsuranceOptions = [
  { value: 'all', label: () => t('insurance.all') },
  { value: 'by_insurance', label: () => t('insurance.byInsurance') },
  { value: 'by_buyer_type', label: () => t('insurance.byBuyerType') }
];

// Chart 3: Loan-to-value ratio
export const ltvMetricOptions = [
  { value: 'average', label: () => t('ltv.average') }
];

export const ltvBuyerTypeOptions = [
  { value: 'all', label: () => t('buyerType.all') },
  { value: 'by_buyer_type', label: () => t('buyerType.byBuyerType') }
];

// Legacy filter options (kept for backward compatibility)
export const indicatorOptions = [
  { value: 'dsr', label: () => t('chart.debtServiceRatio') },
  { value: 'lti', label: () => t('chart.loanToIncome') },
  { value: 'ltv', label: () => t('chart.loanToValue') },
  { value: 'mortgage', label: () => t('chart.mortgageOriginations') },
  { value: 'credit', label: () => t('chart.creditPerformance') }
];

export const geographyOptions = [
  { value: 'canada', label: () => t('geography.canada') }
];

export const incomeQuintileOptions = [
  { value: 'all', label: () => t('income.all') }
];

export const timeframeOptions = [
  { value: '1y', label: () => t('timeframe.1y') },
  { value: '5y', label: () => t('timeframe.5y') },
  { value: '10y', label: () => t('timeframe.10y') },
  { value: 'max', label: () => t('timeframe.max') }
];

/**
 * Maps filter values to Bank of Canada Valet API series codes or group endpoints
 * @param {Object} filters - The selected filters
 * @param {string} chartType - The type of chart (debtServiceRatio, loanToIncome, loanToValue)
 * @returns {Object} - The corresponding API endpoint information
 */
export const getApiEndpoint = (filters, chartType) => {
  // Default to individual series if no specific chart type is provided
  if (!chartType) {
    return getIndividualSeriesCode(filters);
  }

  // Use group endpoints based on chart type
  switch (chartType) {
    case 'debtServiceRatio':
      return {
        type: 'group',
        endpoint: 'FVI_MORTGAGE_DEBT_SERVICE_RATIO_ALL',
        metric: filters.metric || 'share_above_25',
        buyerType: filters.buyerType || 'all'
      };

    case 'loanToIncome':
      return {
        type: 'group',
        endpoint: 'FVI_LOAN_TO_INCOME_RATIO_ALL',
        metric: filters.metric || 'share_above_450',
        insuranceStatus: filters.insuranceStatus || 'all'
      };

    case 'loanToValue':
      return {
        type: 'group',
        endpoint: 'FVI_LOAN_TO_VALUE_RATIO_ALL',
        metric: filters.metric || 'average',
        buyerType: filters.buyerType || 'all'
      };

    default:
      // Fall back to individual series for unknown chart types
      return getIndividualSeriesCode(filters);
  }
};

/**
 * Legacy function to get individual series codes (kept for backward compatibility)
 * @param {Object} filters - The selected filters
 * @returns {Object} - The corresponding series code information
 */
export const getIndividualSeriesCode = (filters) => {
  const { geography, indicator, incomeQuintile, timeframe } = filters;
  let seriesCode;

  // Map indicator type to series codes
  switch (indicator) {
    case 'mortgage':
      // Mortgage originations
      seriesCode = incomeQuintile === 'all' ? 'V122521' : 'V122520';
      break;

    case 'lti':
      // Loan-to-income ratio
      seriesCode = 'V122485'; // Use median LTI ratio for all cases
      break;

    case 'ltv':
      // Loan-to-value ratio
      seriesCode = incomeQuintile === 'all' ? 'V122522' : 'V122523';
      break;

    case 'dsr':
      // Mortgage debt service ratio
      seriesCode = 'V122764';
      break;

    case 'credit':
      // Household credit performance
      seriesCode = incomeQuintile === 'all' ? 'V36786' : 'V122639';
      break;

    default:
      // Default to mortgage originations if indicator not specified
      seriesCode = 'V122521';
  }

  return {
    type: 'individual',
    seriesCode
  };
};

/**
 * Legacy function to get series code (kept for backward compatibility)
 * @param {Object} filters - The selected filters
 * @returns {string} - The corresponding series code
 */
export const getSeriesCode = (filters) => {
  const result = getIndividualSeriesCode(filters);
  return result.seriesCode;
};

/**
 * Get the date range based on the selected timeframe
 * @param {string} timeframe - The selected timeframe value
 * @returns {Object} - The start and end dates for the API query
 */
export const getDateRange = (timeframe) => {
  // Set end date to yesterday to avoid potential issues with today's data not being available yet
  const endDate = new Date();
  endDate.setDate(endDate.getDate() - 1);

  // Create a new date object for start date
  let startDate = new Date(endDate);

  switch (timeframe) {
    case '1y':
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case '5y':
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
    case '10y':
      startDate.setFullYear(endDate.getFullYear() - 10);
      break;
    case 'max':
      // Default to 20 years for "Maximum Available"
      startDate.setFullYear(endDate.getFullYear() - 20);
      break;
    default:
      startDate.setFullYear(endDate.getFullYear() - 1);
  }

  // Ensure start date is at least one day before end date
  if (startDate.getTime() >= endDate.getTime()) {
    startDate.setDate(startDate.getDate() - 1);
  }

  // Format dates as YYYY-MM-DD for the API
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  };
};

export const defaultFilters = {
  geography: 'canada',
  indicator: 'mortgage',
  incomeQuintile: 'all',
  timeframe: '5y'
};
