import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ChartCard from '../components/ChartCard';
import { 
  getApiEndpoint, 
  getDateRange
} from '../data/filters-exports';
import { 
  buildApiUrl, 
  processApiData, 
  seriesMetadata 
} from '../data/cpi-series-config';

const Dashboard = () => {
  const { t } = useTranslation();

  // Define the chart types based on charts.md
  const chartTypes = {
    debtServiceRatio: 'debtServiceRatio',
    loanToIncome: 'loanToIncome',
    loanToValue: 'loanToValue'
  };

  // Initial filters for each chart type
  const [chartFilters, setChartFilters] = useState({
    [chartTypes.debtServiceRatio]: {
      metric: 'share_above_25',
      buyerType: 'all',
      timeframe: '5y'
    },
    [chartTypes.loanToIncome]: {
      metric: 'share_above_450',
      insuranceStatus: 'all',
      timeframe: '5y'
    },
    [chartTypes.loanToValue]: {
      metric: 'average',
      buyerType: 'all',
      timeframe: '5y'
    }
  });

  // Chart data state
  const [chartData, setChartData] = useState({
    [chartTypes.debtServiceRatio]: [],
    [chartTypes.loanToIncome]: [],
    [chartTypes.loanToValue]: []
  });

  // Loading state for each chart
  const [isLoading, setIsLoading] = useState({
    [chartTypes.debtServiceRatio]: false,
    [chartTypes.loanToIncome]: false,
    [chartTypes.loanToValue]: false
  });

  // Error state
  const [error, setError] = useState(null);

  // API endpoints for each chart
  const [apiEndpoints, setApiEndpoints] = useState({
    [chartTypes.debtServiceRatio]: null,
    [chartTypes.loanToIncome]: null,
    [chartTypes.loanToValue]: null
  });

  // State to track chart positions
  const [chartPositions, setChartPositions] = useState({
    top: chartTypes.debtServiceRatio,
    bottomLeft: chartTypes.loanToIncome,
    bottomRight: chartTypes.loanToValue
  });

  // Function to handle swapping charts
  const handleMoveToTop = (chartType) => {
    // If the chart is already at the top, do nothing
    if (chartPositions.top === chartType) return;

    // If the chart is in the bottom left position
    if (chartPositions.bottomLeft === chartType) {
      setChartPositions({
        top: chartType,
        bottomLeft: chartPositions.top,
        bottomRight: chartPositions.bottomRight
      });
    } 
    // If the chart is in the bottom right position
    else if (chartPositions.bottomRight === chartType) {
      setChartPositions({
        top: chartType,
        bottomLeft: chartPositions.bottomLeft,
        bottomRight: chartPositions.top
      });
    }
  };

  // Handle filter changes for individual charts
  const handleChartFilterChange = (chartType, newFilters) => {
    console.log(`Handling filter change for ${chartType}:`, newFilters);

    // Update filters for the specific chart
    setChartFilters(prev => ({
      ...prev,
      [chartType]: newFilters
    }));

    // Get API endpoint for the chart
    const endpoint = getApiEndpoint(newFilters, chartType);
    console.log(`Got API endpoint for ${chartType}:`, endpoint);

    // Update API endpoint for the chart
    setApiEndpoints(prev => ({
      ...prev,
      [chartType]: endpoint
    }));

    // Fetch data for the chart
    fetchData(endpoint, chartType, newFilters);
  };

  // Initialize data for all charts
  const initializeAllCharts = () => {
    // Get API endpoints for each chart type
    const initialEndpoints = {
      [chartTypes.debtServiceRatio]: getApiEndpoint(chartFilters[chartTypes.debtServiceRatio], chartTypes.debtServiceRatio),
      [chartTypes.loanToIncome]: getApiEndpoint(chartFilters[chartTypes.loanToIncome], chartTypes.loanToIncome),
      [chartTypes.loanToValue]: getApiEndpoint(chartFilters[chartTypes.loanToValue], chartTypes.loanToValue)
    };

    console.log('Initial API endpoints:', initialEndpoints);
    setApiEndpoints(initialEndpoints);

    // Fetch data for all charts
    fetchData(initialEndpoints[chartTypes.debtServiceRatio], chartTypes.debtServiceRatio, chartFilters[chartTypes.debtServiceRatio]);
    fetchData(initialEndpoints[chartTypes.loanToIncome], chartTypes.loanToIncome, chartFilters[chartTypes.loanToIncome]);
    fetchData(initialEndpoints[chartTypes.loanToValue], chartTypes.loanToValue, chartFilters[chartTypes.loanToValue]);
  };

  // Fetch data from Bank of Canada Valet API
  const fetchData = async (apiEndpoint, chartType, filters) => {
    if (!apiEndpoint) {
      console.warn(`No API endpoint provided for ${chartType}`);
      return;
    }

    console.log(`Fetching data for ${chartType} with endpoint:`, apiEndpoint);

    // Update loading state for specific chart
    setIsLoading(prev => ({
      ...prev,
      [chartType]: true
    }));

    setError(null);

    try {
      // Get date range based on timeframe filter for the specific chart
      const dateRange = getDateRange(filters.timeframe);
      console.log(`Date range for ${chartType}:`, dateRange);

      // Build API URL
      const apiUrl = buildApiUrl(apiEndpoint, dateRange);
      console.log(`API URL for ${chartType}:`, apiUrl);

      // Fetch data
      console.log(`Fetching data from ${apiUrl}`);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API request failed with status ${response.status}:`, errorText);
        throw new Error(`API request failed with status ${response.status}: ${errorText}`);
      }

      console.log(`Received response for ${chartType}`);
      const data = await response.json();
      console.log(`Parsed JSON data for ${chartType}`);

      // Process data for chart
      console.log(`Processing data for ${chartType}`);
      const processedData = processApiData(data, apiEndpoint, filters);

      // Check if we have the new multi-series data format
      const isMultiSeriesData = processedData && typeof processedData === 'object' && processedData.series && processedData.seriesKeys;

      if (isMultiSeriesData) {
        console.log(`Processed data for ${chartType}:`, processedData.seriesKeys.length, 'series');

        // Check if we have any valid data
        if (!processedData.hasValidData) {
          console.warn(`No valid data points found for ${chartType}`);
          setChartData(prev => ({
            ...prev,
            [chartType]: []
          }));
          return;
        }
      } else {
        // Legacy array format
        console.log(`Processed data for ${chartType}:`, processedData.length, 'data points');

        if (processedData.length === 0) {
          console.warn(`No data points found for ${chartType}`);
          setChartData(prev => ({
            ...prev,
            [chartType]: []
          }));
          return;
        }
      }

      // Update state based on chart type
      setChartData(prev => ({
        ...prev,
        [chartType]: processedData
      }));
      console.log(`Updated chart data for ${chartType}`);
    } catch (err) {
      console.error(`Error fetching data for ${chartType}:`, err);
      setError(`Error fetching data for ${chartType}: ${err.message}`);

      // Set empty data for this chart to prevent rendering issues
      setChartData(prev => ({
        ...prev,
        [chartType]: []
      }));
    } finally {
      // Update loading state for specific chart
      setIsLoading(prev => ({
        ...prev,
        [chartType]: false
      }));
      console.log(`Finished loading data for ${chartType}`);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    initializeAllCharts();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Main Dashboard Content */}
      <div className="dashboard-main w-100">

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Dashboard Header */}
        <div className="dashboard-header mb-4">
          <h1 className="text-center">{t('app.title')}</h1>
          <p className="text-center text-muted">{t('dashboard.subtitle')}</p>
        </div>

        {/* Charts Grid Layout */}
        <div className="container-fluid px-0">
          {/* First Row - Full width chart */}
          <div className="row mb-4">
            <div className="col-12">
              {/* Top Chart (dynamically determined) */}
              <ChartCard 
                key={`top-${chartPositions.top}`}
                title={t(`chart.${chartPositions.top}`)}
                data={chartData[chartPositions.top]}
                isLoading={isLoading[chartPositions.top]}
                onFilterChange={handleChartFilterChange}
                initialFilters={chartFilters[chartPositions.top]}
                chartType={chartPositions.top}
                onMoveToTop={handleMoveToTop}
                position="top"
              />
            </div>
          </div>

          {/* Second Row - 2 charts side by side */}
          <div className="row">
            <div className="col-md-6 mb-4">
              {/* Bottom Left Chart (dynamically determined) */}
              <ChartCard 
                key={`bottomLeft-${chartPositions.bottomLeft}`}
                title={t(`chart.${chartPositions.bottomLeft}`)}
                data={chartData[chartPositions.bottomLeft]}
                isLoading={isLoading[chartPositions.bottomLeft]}
                onFilterChange={handleChartFilterChange}
                initialFilters={chartFilters[chartPositions.bottomLeft]}
                chartType={chartPositions.bottomLeft}
                onMoveToTop={handleMoveToTop}
                position="bottomLeft"
              />
            </div>
            <div className="col-md-6 mb-4">
              {/* Bottom Right Chart (dynamically determined) */}
              <ChartCard 
                key={`bottomRight-${chartPositions.bottomRight}`}
                title={t(`chart.${chartPositions.bottomRight}`)}
                data={chartData[chartPositions.bottomRight]}
                isLoading={isLoading[chartPositions.bottomRight]}
                onFilterChange={handleChartFilterChange}
                initialFilters={chartFilters[chartPositions.bottomRight]}
                chartType={chartPositions.bottomRight}
                onMoveToTop={handleMoveToTop}
                position="bottomRight"
              />
            </div>
          </div>

          {/* Dashboard Summary */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">{t('dashboard.about')}</h3>
                  <p className="card-text">
                    {t('dashboard.description')}
                  </p>
                  <p className="card-text">
                    <strong>{t('dashboard.dataSource')}:</strong> {t('disclaimer.source')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
