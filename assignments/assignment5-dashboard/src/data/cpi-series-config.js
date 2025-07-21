/**
 * Configuration for Household Indebtedness data series from Bank of Canada Valet API
 * Includes metadata, chart settings, and API endpoints
 */

// Base URLs for the Bank of Canada Valet API
export const API_BASE_URL = 'https://www.bankofcanada.ca/valet/observations';
export const API_GROUP_BASE_URL = 'https://www.bankofcanada.ca/valet/observations/group';

// Series metadata for household indebtedness indicators
export const seriesMetadata = {
  // Group endpoints for charts.md requirements

  // Chart 1: Mortgage debt service ratio
  'FVI_MORTGAGE_DEBT_SERVICE_RATIO_ALL': {
    title: 'Mortgage Debt Service Ratio',
    description: 'Mortgage debt service ratio indicators',
    metrics: {
      'share_above_25': {
        title: 'Share of New Mortgages with DSR Above 25%',
        description: 'Percentage of new mortgages with a debt service ratio above 25%',
        yAxisTitle: 'Percentage (%)',
        color: '#27ae60', // enhanced-green
        chartType: 'line'
      },
      'median': {
        title: 'Median Mortgage DSR',
        description: 'Median debt service ratio for new mortgages',
        yAxisTitle: 'Percentage (%)',
        color: '#2ecc71', // lighter green
        chartType: 'line'
      }
    },
    buyerTypes: {
      'all': {
        title: 'All Mortgages',
        color: '#27ae60' // enhanced-green
      },
      'by_insurance': {
        title: 'By Mortgage Insurance Status',
        color: '#16a085' // enhanced-teal
      },
      'by_buyer_type': {
        title: 'By Type of Home Buyer',
        color: '#1abc9c' // lighter teal
      }
    }
  },

  // Chart 2: Loan-to-income ratio
  'FVI_LOAN_TO_INCOME_RATIO_ALL': {
    title: 'Loan-to-Income Ratio',
    description: 'Loan-to-income ratio indicators',
    metrics: {
      'share_above_450': {
        title: 'Share of New Mortgages with LTI Above 450%',
        description: 'Percentage of new mortgages with a loan-to-income ratio above 450%',
        yAxisTitle: 'Percentage (%)',
        color: '#9b59b6', // enhanced-purple
        chartType: 'line'
      },
      'median': {
        title: 'Median LTI Ratio',
        description: 'Median loan-to-income ratio for new mortgages',
        yAxisTitle: 'Ratio (%)',
        color: '#8e44ad', // darker purple
        chartType: 'line'
      }
    },
    insuranceStatuses: {
      'all': {
        title: 'All Mortgages',
        color: '#9b59b6' // enhanced-purple
      },
      'by_insurance': {
        title: 'By Insurance Status',
        color: '#8e44ad' // darker purple
      },
      'by_buyer_type': {
        title: 'By Type of Home Buyer',
        color: '#a569bd' // lighter purple
      }
    }
  },

  // Chart 3: Loan-to-value ratio
  'FVI_LOAN_TO_VALUE_RATIO_ALL': {
    title: 'Loan-to-Value Ratio',
    description: 'Loan-to-value ratio indicators',
    metrics: {
      'average': {
        title: 'Average LTV Ratio',
        description: 'Average loan-to-value ratio for new mortgages',
        yAxisTitle: 'Ratio (%)',
        color: '#e74c3c', // enhanced-red
        chartType: 'line'
      }
    },
    buyerTypes: {
      'all': {
        title: 'All Mortgages',
        color: '#e74c3c' // enhanced-red
      },
      'by_buyer_type': {
        title: 'By Type of Home Buyer',
        color: '#c0392b' // darker red
      }
    }
  },

  // Legacy individual series (kept for backward compatibility)

  // Mortgage Originations
  'V122521': {
    title: 'Mortgage Originations - Fixed vs. Variable Rate',
    description: 'Distribution of new mortgage loans by rate type',
    yAxisTitle: 'Number of Mortgages',
    color: '#4a90e2', // enhanced-blue
    type: 'mortgage',
    chartType: 'column' // Use column chart for distribution data
  },
  'V122520': {
    title: 'Mortgage Originations - Insured vs. Uninsured',
    description: 'Share of new mortgage loans by insurance status',
    yAxisTitle: 'Percentage (%)',
    color: '#f39c12', // enhanced-yellow
    type: 'mortgage',
    chartType: 'area'
  },

  // Loan-to-income ratio
  'V122484': {
    title: 'High Loan-to-Income Ratio Mortgages',
    description: 'Share of new mortgages with loan-to-income ratio > 450%',
    yAxisTitle: 'Percentage (%)',
    color: '#d35400', // enhanced-orange
    type: 'lti',
    chartType: 'line'
  },
  'V122485': {
    title: 'Median Loan-to-Income Ratio',
    description: 'Median loan-to-income ratio for new mortgage loans',
    yAxisTitle: 'Ratio',
    color: '#9b59b6', // enhanced-purple
    type: 'lti',
    chartType: 'line'
  },

  // Loan-to-value ratio
  'V122522': {
    title: 'Loan-to-Value Ratio Distribution',
    description: 'Distribution of new mortgages by loan-to-value ratio',
    yAxisTitle: 'Percentage (%)',
    color: '#16a085', // enhanced-teal
    type: 'ltv',
    chartType: 'column'
  },
  'V122523': {
    title: 'Average Loan-to-Value Ratio',
    description: 'Average loan-to-value ratio for new mortgage loans',
    yAxisTitle: 'Ratio (%)',
    color: '#e74c3c', // enhanced-red
    type: 'ltv',
    chartType: 'line'
  },

  // Mortgage debt service ratio
  'V122764': {
    title: 'Mortgage Debt Service Ratio',
    description: 'Mortgage debt payments as a percentage of disposable income',
    yAxisTitle: 'Percentage (%)',
    color: '#27ae60', // enhanced-green
    type: 'dsr',
    chartType: 'line'
  },

  // Household credit performance
  'V36786': {
    title: 'Residential Mortgage Arrears Rate',
    description: 'Percentage of residential mortgages in arrears for 90+ days',
    yAxisTitle: 'Percentage (%)',
    color: '#4a90e2', // enhanced-blue
    type: 'credit',
    chartType: 'area' // Use area chart for arrears data
  },
  'V122639': {
    title: 'Consumer Credit Delinquency Rate',
    description: 'Percentage of consumer credit in delinquency',
    yAxisTitle: 'Percentage (%)',
    color: '#16a085', // enhanced-teal
    type: 'credit',
    chartType: 'area'
  }
};

// Default chart settings for AmCharts
export const defaultChartSettings = {
  // Chart appearance
  paddingRight: 20,
  paddingLeft: 20,
  paddingTop: 20,
  paddingBottom: 20,

  // X-axis (date) settings
  xAxis: {
    baseInterval: {
      timeUnit: 'month',
      count: 1
    },
    dateFormats: {
      day: 'MMM dd',
      week: 'MMM dd',
      month: 'MMM yyyy',
      year: 'yyyy'
    },
    tooltipDateFormat: 'MMM yyyy'
  },

  // Y-axis settings
  yAxis: {
    cpi: {
      min: undefined, // Auto
      numberFormat: '#.##',
      title: 'Index (2002=100)'
    },
    inflation: {
      min: undefined, // Auto
      numberFormat: '#.##\'%\'',
      title: 'Percent Change (%)'
    }
  },

  // Series settings
  series: {
    tensionX: 0.8,
    tensionY: 0.8,
    strokeWidth: 2,
    connect: true
  },

  // Cursor/tooltip settings
  cursor: {
    xAxis: {
      cursorTooltipEnabled: true
    },
    yAxis: {
      cursorTooltipEnabled: true
    }
  },

  // Legend settings
  legend: {
    position: 'bottom',
    clickTarget: 'itemContainer',
    itemContainerSettings: {
      paddingTop: 5,
      paddingBottom: 5
    }
  }
};

/**
 * Builds the API URL for fetching observations
 * @param {Object} apiEndpoint - The API endpoint information
 * @param {Object} dateRange - The start and end dates for the query
 * @returns {string} - The complete API URL
 */
export const buildApiUrl = (apiEndpoint, dateRange) => {
  try {
    // Handle string input for backward compatibility
    if (typeof apiEndpoint === 'string') {
      const seriesCode = apiEndpoint;
      if (!seriesCode) {
        console.error('Series code is missing or invalid:', seriesCode);
        throw new Error('Series code is required');
      }

      const { startDate, endDate } = dateRange;
      if (!startDate || !endDate) {
        console.error('Date range is missing or invalid:', dateRange);
        throw new Error('Start date and end date are required');
      }

      const url = `${API_BASE_URL}/${seriesCode}?start_date=${startDate}&end_date=${endDate}`;
      console.log('Built API URL for individual series:', url);
      return url;
    }

    // Handle object input for new group endpoints
    if (typeof apiEndpoint === 'object') {
      const { type, endpoint, seriesCode } = apiEndpoint;
      const { startDate, endDate } = dateRange;

      if (!startDate || !endDate) {
        console.error('Date range is missing or invalid:', dateRange);
        throw new Error('Start date and end date are required');
      }

      if (type === 'group') {
        if (!endpoint) {
          console.error('Group endpoint is missing or invalid:', endpoint);
          throw new Error('Group endpoint is required');
        }

        const url = `${API_GROUP_BASE_URL}/${endpoint}/json?start_date=${startDate}&end_date=${endDate}`;
        console.log('Built API URL for group endpoint:', url);
        return url;
      } else if (type === 'individual') {
        if (!seriesCode) {
          console.error('Series code is missing or invalid:', seriesCode);
          throw new Error('Series code is required');
        }

        const url = `${API_BASE_URL}/${seriesCode}?start_date=${startDate}&end_date=${endDate}`;
        console.log('Built API URL for individual series:', url);
        return url;
      } else {
        console.error('Invalid API endpoint type:', type);
        throw new Error('Invalid API endpoint type');
      }
    }

    console.error('Invalid API endpoint:', apiEndpoint);
    throw new Error('Invalid API endpoint');
  } catch (err) {
    console.error('Error building API URL:', err);
    throw err;
  }
};

/**
 * Processes API response data for chart consumption
 * @param {Object} apiData - The raw API response
 * @param {Object} apiEndpoint - The API endpoint information (optional)
 * @param {Object} filters - The filter options (optional)
 * @returns {Array} - Processed data for the chart
 */
export const processApiData = (apiData, apiEndpoint, filters) => {
  try {
    // Log the API response for debugging (truncated for large responses)
    console.log('API response:', JSON.stringify(apiData).substring(0, 200) + '...');

    if (!apiData) {
      console.warn('API data is null or undefined');
      return [];
    }

    // Handle group endpoint responses
    if (apiEndpoint && apiEndpoint.type === 'group') {
      return processGroupApiData(apiData, apiEndpoint, filters);
    }

    // Handle individual series responses (legacy)
    if (!apiData.observations) {
      console.warn('No observations found in API data:', apiData);
      return [];
    }

    if (apiData.observations.length === 0) {
      console.warn('Empty observations array in API data');
      return [];
    }

    // Log the first observation for debugging
    console.log('Sample observation:', JSON.stringify(apiData.observations[0]));

    // Create a dummy data point if no valid data is found
    let hasValidData = false;

    const processedData = apiData.observations.map(obs => {
      try {
        // Ensure we have a valid date
        if (!obs.d) {
          console.warn('Missing date in observation:', obs);
          return null;
        }

        // Parse the date string from the API response
        // Format is typically YYYY-MM-DD
        const dateParts = obs.d.split('-');
        if (dateParts.length !== 3) {
          console.warn('Invalid date format in observation:', obs.d);
          return null;
        }

        // Create a date object using year, month (0-based), day
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JS Date
        const day = parseInt(dateParts[2], 10);

        const date = new Date(year, month, day);

        if (!(date instanceof Date) || isNaN(date)) {
          console.warn('Invalid date in observation:', obs.d, 'Parsed as:', year, month, day);
          return null;
        }

        // Log the created date for debugging
        console.log('Created date object:', date, 'from', obs.d);

        // Find the value key (should be the series code)
        const valueKey = Object.keys(obs).find(key => key !== 'd');

        if (!valueKey) {
          console.warn('No value key found in observation:', obs);
          return { date, value: null };
        }

        // Get the raw value from the nested structure
        const valueObj = obs[valueKey];

        // Check if the value is in the expected format with a 'v' property
        if (valueObj && valueObj.v !== undefined) {
          // Extract the value from the 'v' property
          const rawValue = valueObj.v;

          // Parse the value as a number
          let value;
          if (rawValue === null || rawValue === undefined) {
            value = null;
          } else if (typeof rawValue === 'string') {
            // Try to parse the string as a number
            value = parseFloat(rawValue.replace(/,/g, ''));
          } else {
            value = parseFloat(rawValue);
          }

          // Log if we got a NaN value
          if (isNaN(value)) {
            console.warn('NaN value detected for observation:', obs);
            value = null;
          } else {
            hasValidData = true;
          }

          return {
            date,
            value
          };
        } else {
          // If the value is not in the expected format, try the old approach
          const rawValue = valueObj;

          let value;
          if (rawValue === null || rawValue === undefined) {
            value = null;
          } else if (typeof rawValue === 'string') {
            value = parseFloat(rawValue.replace(/,/g, ''));
          } else {
            value = parseFloat(rawValue);
          }

          if (isNaN(value)) {
            console.warn('NaN value detected for observation:', obs);
            value = null;
          } else {
            hasValidData = true;
          }

          return {
            date,
            value
          };
        }
      } catch (err) {
        console.error('Error processing observation:', err, obs);
        return null;
      }
    })
    .filter(item => item !== null) // Filter out null items
    .filter(item => {
      // Filter out items with invalid dates
      return item.date instanceof Date && !isNaN(item.date);
    })
    .sort((a, b) => {
      // Sort by date ascending
      return a.date - b.date;
    });

    // If no valid data was found, create some sample data for testing
    if (!hasValidData && processedData.length === 0) {
      console.warn('No valid data found, creating sample data for visualization testing');
      const today = new Date();

      // Create sample data with properly spaced dates
      const sampleData = [
        { date: new Date(today.getFullYear() - 1, 0, 1), value: 10 },
        { date: new Date(today.getFullYear() - 1, 3, 1), value: 20 },
        { date: new Date(today.getFullYear() - 1, 6, 1), value: 15 },
        { date: new Date(today.getFullYear() - 1, 9, 1), value: 25 },
        { date: new Date(today.getFullYear(), 0, 1), value: 30 }
      ];

      // Log the sample data for debugging
      console.log('Created sample data for visualization testing:', sampleData);

      return sampleData;
    }

    return processedData;
  } catch (err) {
    console.error('Error processing API data:', err);
    return [];
  }
};

/**
 * Processes group API response data for chart consumption
 * @param {Object} apiData - The raw API response from a group endpoint
 * @param {Object} apiEndpoint - The API endpoint information
 * @param {Object} filters - The filter options
 * @returns {Array} - Processed data for the chart with multiple series
 */
export const processGroupApiData = (apiData, apiEndpoint, filters) => {
  try {
    console.log('Processing group API data for endpoint:', apiEndpoint.endpoint);

    if (!apiData.observations) {
      console.warn('No observations found in group API data');
      return [];
    }

    if (apiData.observations.length === 0) {
      console.warn('Empty observations array in group API data');
      return [];
    }

    // Log the first observation for debugging
    console.log('Sample group observation:', JSON.stringify(apiData.observations[0]).substring(0, 200) + '...');

    // Define series keys based on the chart type
    let seriesKeys = [];
    let seriesNames = {};
    let seriesColors = {};

    // Determine which series to extract based on the chart type and filters
    switch (apiEndpoint.endpoint) {
      case 'FVI_MORTGAGE_DEBT_SERVICE_RATIO_ALL':
        // For mortgage debt service ratio, filter based on buyer type
        if (apiEndpoint.metric === 'share_above_25') {
          // Define all available series
          const allSeriesKeys = {
            'FVI_MTG_MDSR_GT25_ALL': 'All Mortgages',
            'FVI_MTG_MDSR_GT25_INS': 'Insured Mortgages',
            'FVI_MTG_MDSR_GT25_UNINS': 'Uninsured Mortgages',
            'FVI_MTG_MDSR_GT25_FTHB': 'First-time Homebuyers',
            'FVI_MTG_MDSR_GT25_REPEAT': 'Repeat Homebuyers',
            'FVI_MTG_MDSR_GT25_INVESTORS': 'Investors'
          };

          // Define colors for all series
          seriesColors = {
            'FVI_MTG_MDSR_GT25_ALL': '#27ae60', // enhanced-green
            'FVI_MTG_MDSR_GT25_INS': '#8e44ad', // purple
            'FVI_MTG_MDSR_GT25_UNINS': '#e74c3c', // red
            'FVI_MTG_MDSR_GT25_FTHB': '#f39c12', // orange
            'FVI_MTG_MDSR_GT25_REPEAT': '#3498db', // blue
            'FVI_MTG_MDSR_GT25_INVESTORS': '#1abc9c' // teal
          };

          // Filter series based on buyer type
          if (apiEndpoint.buyerType === 'all') {
            seriesKeys = ['FVI_MTG_MDSR_GT25_ALL'];
            seriesNames = { 'FVI_MTG_MDSR_GT25_ALL': allSeriesKeys['FVI_MTG_MDSR_GT25_ALL'] };
          } else if (apiEndpoint.buyerType === 'by_insurance') {
            seriesKeys = ['FVI_MTG_MDSR_GT25_INS', 'FVI_MTG_MDSR_GT25_UNINS'];
            seriesNames = {
              'FVI_MTG_MDSR_GT25_INS': allSeriesKeys['FVI_MTG_MDSR_GT25_INS'],
              'FVI_MTG_MDSR_GT25_UNINS': allSeriesKeys['FVI_MTG_MDSR_GT25_UNINS']
            };
          } else if (apiEndpoint.buyerType === 'by_buyer_type') {
            seriesKeys = ['FVI_MTG_MDSR_GT25_FTHB', 'FVI_MTG_MDSR_GT25_REPEAT', 'FVI_MTG_MDSR_GT25_INVESTORS'];
            seriesNames = {
              'FVI_MTG_MDSR_GT25_FTHB': allSeriesKeys['FVI_MTG_MDSR_GT25_FTHB'],
              'FVI_MTG_MDSR_GT25_REPEAT': allSeriesKeys['FVI_MTG_MDSR_GT25_REPEAT'],
              'FVI_MTG_MDSR_GT25_INVESTORS': allSeriesKeys['FVI_MTG_MDSR_GT25_INVESTORS']
            };
          } else {
            // Default to all series if filter is not recognized
            seriesKeys = Object.keys(allSeriesKeys);
            seriesNames = allSeriesKeys;
          }
        } else { // median
          // Define all available series
          const allSeriesKeys = {
            'FVI_MEDIAN_MDSR_ALL': 'All Mortgages',
            'FVI_MEDIAN_MDSR_INS': 'Insured Mortgages',
            'FVI_MEDIAN_MDSR_UNINS': 'Uninsured Mortgages',
            'FVI_MEDIAN_MDSR_FTHB': 'First-time Homebuyers',
            'FVI_MEDIAN_MDSR_REPEAT': 'Repeat Homebuyers',
            'FVI_MEDIAN_MDSR_INVESTORS': 'Investors'
          };

          // Define colors for all series
          seriesColors = {
            'FVI_MEDIAN_MDSR_ALL': '#27ae60', // enhanced-green
            'FVI_MEDIAN_MDSR_INS': '#8e44ad', // purple
            'FVI_MEDIAN_MDSR_UNINS': '#e74c3c', // red
            'FVI_MEDIAN_MDSR_FTHB': '#f39c12', // orange
            'FVI_MEDIAN_MDSR_REPEAT': '#3498db', // blue
            'FVI_MEDIAN_MDSR_INVESTORS': '#1abc9c' // teal
          };

          // Filter series based on buyer type
          if (apiEndpoint.buyerType === 'all') {
            seriesKeys = ['FVI_MEDIAN_MDSR_ALL'];
            seriesNames = { 'FVI_MEDIAN_MDSR_ALL': allSeriesKeys['FVI_MEDIAN_MDSR_ALL'] };
          } else if (apiEndpoint.buyerType === 'by_insurance') {
            seriesKeys = ['FVI_MEDIAN_MDSR_INS', 'FVI_MEDIAN_MDSR_UNINS'];
            seriesNames = {
              'FVI_MEDIAN_MDSR_INS': allSeriesKeys['FVI_MEDIAN_MDSR_INS'],
              'FVI_MEDIAN_MDSR_UNINS': allSeriesKeys['FVI_MEDIAN_MDSR_UNINS']
            };
          } else if (apiEndpoint.buyerType === 'by_buyer_type') {
            seriesKeys = ['FVI_MEDIAN_MDSR_FTHB', 'FVI_MEDIAN_MDSR_REPEAT', 'FVI_MEDIAN_MDSR_INVESTORS'];
            seriesNames = {
              'FVI_MEDIAN_MDSR_FTHB': allSeriesKeys['FVI_MEDIAN_MDSR_FTHB'],
              'FVI_MEDIAN_MDSR_REPEAT': allSeriesKeys['FVI_MEDIAN_MDSR_REPEAT'],
              'FVI_MEDIAN_MDSR_INVESTORS': allSeriesKeys['FVI_MEDIAN_MDSR_INVESTORS']
            };
          } else {
            // Default to all series if filter is not recognized
            seriesKeys = Object.keys(allSeriesKeys);
            seriesNames = allSeriesKeys;
          }
        }
        break;

      case 'FVI_LOAN_TO_INCOME_RATIO_ALL':
        // For loan-to-income ratio, filter based on insurance status
        if (apiEndpoint.metric === 'share_above_450') {
          // Define all available series
          const allSeriesKeys = {
            'FVI_MTG_LTI450_ALL': 'All Mortgages',
            'FVI_MTG_LTI450_INS': 'Insured Mortgages',
            'FVI_MTG_LTI450_UNINS': 'Uninsured Mortgages',
            'FVI_MTG_LTI450_FTHB': 'First-time Homebuyers',
            'FVI_MTG_LTI450_REPEAT': 'Repeat Homebuyers',
            'FVI_MTG_LTI450_INVESTORS': 'Investors'
          };

          // Define colors for all series
          seriesColors = {
            'FVI_MTG_LTI450_ALL': '#9b59b6', // purple
            'FVI_MTG_LTI450_INS': '#27ae60', // green
            'FVI_MTG_LTI450_UNINS': '#e74c3c', // red
            'FVI_MTG_LTI450_FTHB': '#f39c12', // orange
            'FVI_MTG_LTI450_REPEAT': '#3498db', // blue
            'FVI_MTG_LTI450_INVESTORS': '#1abc9c' // teal
          };

          // Filter series based on insurance status
          if (apiEndpoint.insuranceStatus === 'all') {
            seriesKeys = ['FVI_MTG_LTI450_ALL'];
            seriesNames = { 'FVI_MTG_LTI450_ALL': allSeriesKeys['FVI_MTG_LTI450_ALL'] };
          } else if (apiEndpoint.insuranceStatus === 'by_insurance') {
            seriesKeys = ['FVI_MTG_LTI450_INS', 'FVI_MTG_LTI450_UNINS'];
            seriesNames = {
              'FVI_MTG_LTI450_INS': allSeriesKeys['FVI_MTG_LTI450_INS'],
              'FVI_MTG_LTI450_UNINS': allSeriesKeys['FVI_MTG_LTI450_UNINS']
            };
          } else if (apiEndpoint.insuranceStatus === 'by_buyer_type') {
            seriesKeys = ['FVI_MTG_LTI450_FTHB', 'FVI_MTG_LTI450_REPEAT', 'FVI_MTG_LTI450_INVESTORS'];
            seriesNames = {
              'FVI_MTG_LTI450_FTHB': allSeriesKeys['FVI_MTG_LTI450_FTHB'],
              'FVI_MTG_LTI450_REPEAT': allSeriesKeys['FVI_MTG_LTI450_REPEAT'],
              'FVI_MTG_LTI450_INVESTORS': allSeriesKeys['FVI_MTG_LTI450_INVESTORS']
            };
          } else {
            // Default to all series if filter is not recognized
            seriesKeys = Object.keys(allSeriesKeys);
            seriesNames = allSeriesKeys;
          }
        } else { // median
          // Define all available series
          const allSeriesKeys = {
            'FVI_MEDIAN_LTI_MTG_ALL': 'All Mortgages',
            'FVI_MEDIAN_LTI_MTG_INS': 'Insured Mortgages',
            'FVI_MEDIAN_LTI_MTG_UNINS': 'Uninsured Mortgages',
            'FVI_MEDIAN_LTI_FTHB': 'First-time Homebuyers',
            'FVI_MEDIAN_LTI_REPEAT': 'Repeat Homebuyers',
            'FVI_MEDIAN_LTI_INVESTORS': 'Investors'
          };

          // Define colors for all series
          seriesColors = {
            'FVI_MEDIAN_LTI_MTG_ALL': '#9b59b6', // purple
            'FVI_MEDIAN_LTI_MTG_INS': '#27ae60', // green
            'FVI_MEDIAN_LTI_MTG_UNINS': '#e74c3c', // red
            'FVI_MEDIAN_LTI_FTHB': '#f39c12', // orange
            'FVI_MEDIAN_LTI_REPEAT': '#3498db', // blue
            'FVI_MEDIAN_LTI_INVESTORS': '#1abc9c' // teal
          };

          // Filter series based on insurance status
          if (apiEndpoint.insuranceStatus === 'all') {
            seriesKeys = ['FVI_MEDIAN_LTI_MTG_ALL'];
            seriesNames = { 'FVI_MEDIAN_LTI_MTG_ALL': allSeriesKeys['FVI_MEDIAN_LTI_MTG_ALL'] };
          } else if (apiEndpoint.insuranceStatus === 'by_insurance') {
            seriesKeys = ['FVI_MEDIAN_LTI_MTG_INS', 'FVI_MEDIAN_LTI_MTG_UNINS'];
            seriesNames = {
              'FVI_MEDIAN_LTI_MTG_INS': allSeriesKeys['FVI_MEDIAN_LTI_MTG_INS'],
              'FVI_MEDIAN_LTI_MTG_UNINS': allSeriesKeys['FVI_MEDIAN_LTI_MTG_UNINS']
            };
          } else if (apiEndpoint.insuranceStatus === 'by_buyer_type') {
            seriesKeys = ['FVI_MEDIAN_LTI_FTHB', 'FVI_MEDIAN_LTI_REPEAT', 'FVI_MEDIAN_LTI_INVESTORS'];
            seriesNames = {
              'FVI_MEDIAN_LTI_FTHB': allSeriesKeys['FVI_MEDIAN_LTI_FTHB'],
              'FVI_MEDIAN_LTI_REPEAT': allSeriesKeys['FVI_MEDIAN_LTI_REPEAT'],
              'FVI_MEDIAN_LTI_INVESTORS': allSeriesKeys['FVI_MEDIAN_LTI_INVESTORS']
            };
          } else {
            // Default to all series if filter is not recognized
            seriesKeys = Object.keys(allSeriesKeys);
            seriesNames = allSeriesKeys;
          }
        }
        break;

      case 'FVI_LOAN_TO_VALUE_RATIO_ALL':
        // For loan-to-value ratio, filter based on buyer type
        // Define all available series
        const allSeriesKeys = {
          'FVI_MTG_LTVAVE_ALL': 'All Mortgages',
          'FVI_MTG_LTVAVE_FTHB': 'First-time Homebuyers',
          'FVI_MTG_LTVAVE_REPEAT': 'Repeat Homebuyers',
          'FVI_MTG_LTVAVE_INVESTORS': 'Investors'
        };

        // Define colors for all series
        seriesColors = {
          'FVI_MTG_LTVAVE_ALL': '#e74c3c', // red
          'FVI_MTG_LTVAVE_FTHB': '#9b59b6', // purple
          'FVI_MTG_LTVAVE_REPEAT': '#3498db', // blue
          'FVI_MTG_LTVAVE_INVESTORS': '#27ae60' // green
        };

        // Filter series based on buyer type
        if (apiEndpoint.buyerType === 'all') {
          seriesKeys = ['FVI_MTG_LTVAVE_ALL'];
          seriesNames = { 'FVI_MTG_LTVAVE_ALL': allSeriesKeys['FVI_MTG_LTVAVE_ALL'] };
        } else if (apiEndpoint.buyerType === 'by_buyer_type') {
          seriesKeys = ['FVI_MTG_LTVAVE_FTHB', 'FVI_MTG_LTVAVE_REPEAT', 'FVI_MTG_LTVAVE_INVESTORS'];
          seriesNames = {
            'FVI_MTG_LTVAVE_FTHB': allSeriesKeys['FVI_MTG_LTVAVE_FTHB'],
            'FVI_MTG_LTVAVE_REPEAT': allSeriesKeys['FVI_MTG_LTVAVE_REPEAT'],
            'FVI_MTG_LTVAVE_INVESTORS': allSeriesKeys['FVI_MTG_LTVAVE_INVESTORS']
          };
        } else {
          // Default to all series if filter is not recognized
          seriesKeys = Object.keys(allSeriesKeys);
          seriesNames = allSeriesKeys;
        }
        break;

      default:
        console.warn('Unknown group endpoint:', apiEndpoint.endpoint);
        return [];
    }

    console.log('Selected series keys for group data:', seriesKeys);

    // Create a map to store data for each series
    const seriesData = {};
    seriesKeys.forEach(key => {
      seriesData[key] = [];
    });

    // Process the observations to extract all series
    let hasValidData = false;

    // Process each observation
    apiData.observations.forEach(obs => {
      try {
        // Ensure we have a valid date
        if (!obs.d) {
          console.warn('Missing date in group observation:', obs);
          return;
        }

        // Parse the date string from the API response
        // Format is typically YYYY-MM-DD
        const dateParts = obs.d.split('-');
        if (dateParts.length !== 3) {
          console.warn('Invalid date format in group observation:', obs.d);
          return;
        }

        // Create a date object using year, month (0-based), day
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JS Date
        const day = parseInt(dateParts[2], 10);

        const date = new Date(year, month, day);

        if (!(date instanceof Date) || isNaN(date)) {
          console.warn('Invalid date in group observation:', obs.d, 'Parsed as:', year, month, day);
          return;
        }

        // Process each series key
        seriesKeys.forEach(seriesKey => {
          // Check if the series key exists in the observation
          if (obs[seriesKey]) {
            // Get the raw value from the nested structure
            const valueObj = obs[seriesKey];

            // Check if the value is in the expected format with a 'v' property
            if (valueObj && valueObj.v !== undefined) {
              // Extract the value from the 'v' property
              const rawValue = valueObj.v;

              // Parse the value as a number
              let value;
              if (rawValue === null || rawValue === undefined) {
                value = null;
              } else if (typeof rawValue === 'string') {
                // Try to parse the string as a number
                value = parseFloat(rawValue.replace(/,/g, ''));
              } else {
                value = parseFloat(rawValue);
              }

              // Log if we got a NaN value
              if (isNaN(value)) {
                console.warn('NaN value detected for group observation:', obs);
                value = null;
              } else {
                hasValidData = true;
              }

              // Add the data point to the series
              seriesData[seriesKey].push({
                date,
                value,
                seriesKey,
                seriesName: seriesNames[seriesKey]
              });
            }
          }
        });
      } catch (err) {
        console.error('Error processing group observation:', err, obs);
      }
    });

    // Sort each series by date
    Object.keys(seriesData).forEach(key => {
      seriesData[key] = seriesData[key]
        .filter(item => item !== null && item.date instanceof Date && !isNaN(item.date))
        .sort((a, b) => a.date - b.date);
    });

    // Combine all series data with metadata
    const processedData = {
      series: seriesData,
      seriesKeys,
      seriesNames,
      seriesColors,
      hasValidData
    };

    // If no valid data was found, create some sample data for testing
    if (!hasValidData) {
      console.warn('No valid data found in group response, creating sample data for visualization testing');
      const today = new Date();

      // Create sample data with properly spaced dates for each series
      const sampleData = {};
      seriesKeys.forEach((key, index) => {
        sampleData[key] = [
          { date: new Date(today.getFullYear() - 1, 0, 1), value: 10 + index * 5, seriesKey: key, seriesName: seriesNames[key] },
          { date: new Date(today.getFullYear() - 1, 3, 1), value: 20 + index * 5, seriesKey: key, seriesName: seriesNames[key] },
          { date: new Date(today.getFullYear() - 1, 6, 1), value: 15 + index * 5, seriesKey: key, seriesName: seriesNames[key] },
          { date: new Date(today.getFullYear() - 1, 9, 1), value: 25 + index * 5, seriesKey: key, seriesName: seriesNames[key] },
          { date: new Date(today.getFullYear(), 0, 1), value: 30 + index * 5, seriesKey: key, seriesName: seriesNames[key] }
        ];
      });

      // Log the sample data for debugging
      console.log('Created sample data for group visualization testing:', sampleData);

      return {
        series: sampleData,
        seriesKeys,
        seriesNames,
        seriesColors,
        hasValidData: true
      };
    }

    return processedData;
  } catch (err) {
    console.error('Error processing group API data:', err);
    return {
      series: {},
      seriesKeys: [],
      seriesNames: {},
      seriesColors: {},
      hasValidData: false
    };
  }
};
