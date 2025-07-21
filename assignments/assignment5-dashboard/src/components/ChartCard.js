import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import { seriesMetadata, defaultChartSettings, processApiData } from '../data/cpi-series-config';
import { Table } from 'react-bootstrap';
import ChartFilter from './ChartFilter';

const ChartCard = ({ 
  title, 
  seriesCode, 
  data, 
  isLoading,
  onFilterChange,
  initialFilters,
  chartType,
  onMoveToTop,
  position
}) => {
  const { t } = useTranslation();
  const chartRef = useRef(null);
  const chartDivRef = useRef(null);
  const [chartTitle, setChartTitle] = useState(title);
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  // Update chart title when title prop changes
  useEffect(() => {
    setChartTitle(title);
  }, [title]);

  // Initialize and update chart when data changes
  useEffect(() => {
    // Get series metadata
    const metadata = seriesMetadata[seriesCode] || {
      title: title || t('chart.defaultTitle'),
      yAxisTitle: 'Value',
      color: '#4a90e2',
      type: 'mortgage',
      chartType: 'line'
    };

    // Set chart title if not provided
    if (!title) {
      setChartTitle(metadata.title);
    }

    // Skip chart creation if no data or div not ready
    if (!chartDivRef.current || isLoading) return;

    // Dispose of previous chart if it exists
    if (chartRef.current) {
      chartRef.current.root.dispose();
    }

    // Create root element
    const root = am5.Root.new(chartDivRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: defaultChartSettings.paddingRight,
        paddingTop: defaultChartSettings.paddingTop,
        paddingBottom: 20,
        maxTooltipDistance: 0,
        layout: root.verticalLayout // Add vertical layout to properly position the legend
      })
    );

    // Add chart title
    chart.children.unshift(
      am5.Label.new(root, {
        text: chartTitle || metadata.title,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 5,
        fill: am5.color(metadata.color)
      })
    );

    // Add chart subtitle
    chart.children.unshift(
      am5.Label.new(root, {
        text: t(`chart.${chartType}.subtitle`) || metadata.description || "",
        fontSize: 12,
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 10,
        fill: am5.color(0x666666)
      })
    );

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: defaultChartSettings.xAxis.baseInterval,
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(root, {}),
        // Ensure X-axis is visible and properly formatted
        visible: true,
        // Add date formats for better readability
        dateFormats: defaultChartSettings.xAxis.dateFormats,
        periodChangeDateFormats: {
          day: "MMM dd, yyyy",
          month: "MMM yyyy",
          year: "yyyy"
        },
        tooltipDateFormat: "MMM dd, yyyy"
      })
    );

    // Add X-axis title
    xAxis.children.push(
      am5.Label.new(root, {
        text: t('chart.xAxisTitle') || "Date",
        fontSize: 12,
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 15,
        fill: am5.color(0x666666)
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          opposite: false
        }),
        tooltip: am5.Tooltip.new(root, {}),
        // Ensure Y-axis is visible and properly scaled
        visible: true,
        min: 0,
        strictMinMax: false
      })
    );

    // Set y-axis title
    yAxis.children.unshift(
      am5.Label.new(root, {
        rotation: -90,
        text: t(`chart.${chartType}.yAxisTitle`) || metadata.yAxisTitle,
        y: am5.p50,
        centerX: am5.p50,
        fontSize: 12,
        fontWeight: "500",
        fill: am5.color(metadata.color)
      })
    );

    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);

    // Check if we have the new multi-series data format
    const isMultiSeriesData = data && typeof data === 'object' && data.series && data.seriesKeys;

    // Function to create a series based on chart type
    const createSeries = (name, color, chartType = 'line') => {
      let newSeries;

      switch (chartType) {
        case 'column':
          newSeries = chart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: name,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: "value",
              valueXField: "date", // Use valueXField to match the sample
              tooltip: am5.Tooltip.new(root, {
                labelText: "{name}: {valueY}\n[fontSize:11px]{dateX.formatDate('MMM yyyy')}[/]"
              }),
              fill: am5.color(color),
              stroke: am5.color(color)
            })
          );

          // Add column template
          newSeries.columns.template.setAll({
            cornerRadiusTL: 3,
            cornerRadiusTR: 3,
            strokeOpacity: 0,
            tooltipText: "{valueY}",
            width: am5.percent(80) // Make columns wider
          });

          // Add hover state
          newSeries.columns.template.states.create("hover", {
            fillOpacity: 0.8,
            strokeOpacity: 0.3,
            stroke: am5.color(color)
          });
          break;

        case 'area':
          newSeries = chart.series.push(
            am5xy.LineSeries.new(root, {
              name: name,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: "value",
              valueXField: "date", // Use valueXField to match the sample
              connect: true, // Connect points even if there are gaps
              fill: am5.color(color),
              fillOpacity: 0.3,
              stroke: am5.color(color),
              tooltip: am5.Tooltip.new(root, {
                labelText: "{name}: {valueY}\n[fontSize:11px]{dateX.formatDate('MMM yyyy')}[/]"
              })
            })
          );

          // Add bullets
          newSeries.bullets.push(function() {
            return am5.Bullet.new(root, {
              sprite: am5.Circle.new(root, {
                radius: 4,
                fill: am5.color(color),
                stroke: am5.color("#fff"),
                strokeWidth: 2
              })
            });
          });
          break;

        case 'line':
        default:
          newSeries = chart.series.push(
            am5xy.LineSeries.new(root, {
              name: name,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: "value",
              valueXField: "date", // Use valueXField to match the sample
              connect: true, // Connect points even if there are gaps
              tooltip: am5.Tooltip.new(root, {
                labelText: "{name}: {valueY}\n[fontSize:11px]{dateX.formatDate('MMM yyyy')}[/]"
              }),
              stroke: am5.color(color),
              strokeWidth: 2
            })
          );

          // Add bullets
          newSeries.bullets.push(function() {
            return am5.Bullet.new(root, {
              sprite: am5.Circle.new(root, {
                radius: 4,
                fill: am5.color(color),
                stroke: am5.color("#fff"),
                strokeWidth: 2
              })
            });
          });
      }

      return newSeries;
    };

    // Add legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        layout: am5.GridLayout.new(root, {
          maxColumns: 4,
          fixedWidthGrid: true,
          cellWidth: am5.percent(25),
          cellHeight: 35
        }),
        width: am5.percent(100),
        paddingTop: 15,
        paddingBottom: 15,
        // No background for better visibility
        background: am5.Rectangle.new(root, {
          fillOpacity: 0,
          fill: am5.color(0x000000)
        }),
        labels: {
          template: {
            fontSize: 12,
            fontWeight: "500"
          }
        },
        valueLabels: {
          template: {
            fontSize: 12,
            fontWeight: "normal"
          }
        }
      })
    );

    // Add scrollbar
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));

    // Add export menu
    const exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      filePrefix: metadata.title.replace(/\s+/g, '_').toLowerCase()
    });

    // Handle multi-series data
    if (isMultiSeriesData) {
      console.log('Rendering multi-series chart with', data.seriesKeys.length, 'series');

      // Create a series for each key
      const allSeries = [];

      data.seriesKeys.forEach(seriesKey => {
        const seriesName = data.seriesNames[seriesKey];
        const seriesColor = data.seriesColors[seriesKey];
        const seriesData = data.series[seriesKey];

        if (seriesData && seriesData.length > 0) {
          // Create the series
          const newSeries = createSeries(
            seriesName, 
            seriesColor, 
            metadata.chartType || 'line'
          );

          // Process the data for this series
          const processedData = seriesData.map(item => {
            const dateObj = new Date(item.date);
            return {
              date: dateObj.getTime(), // Convert to timestamp for AmCharts
              value: Number(item.value)
            };
          }).filter(item => 
            item.date && 
            !isNaN(item.date) && 
            item.value !== undefined && 
            item.value !== null && 
            !isNaN(item.value)
          ).sort((a, b) => a.date - b.date);

          if (processedData.length > 0) {
            // Set data on the series
            newSeries.data.setAll(processedData);
            allSeries.push(newSeries);
          }
        }
      });

      // Update legend with all series
      legend.data.setAll(allSeries);

      // Make all series appear with animation
      allSeries.forEach(series => {
        series.appear(1000);
      });

    } else {
      // Handle legacy single series data
      console.log('Rendering single-series chart');

      // Create a single series
      const series = createSeries(
        metadata.title, 
        metadata.color, 
        metadata.chartType || 'line'
      );

      // Set data
      if (data && data.length > 0) {
        try {
          // Filter out any invalid data points before setting the data
          const validData = data.filter(item => 
            item && 
            item.date instanceof Date && 
            !isNaN(item.date) && 
            item.value !== undefined && 
            item.value !== null && 
            !isNaN(item.value)
          );

          if (validData.length > 0) {
            console.log(`Setting ${validData.length} valid data points for chart`);

            // Create a deep copy of the data to prevent any reference issues
            const processedData = validData.map(item => {
              const dateObj = new Date(item.date);
              return {
                date: dateObj.getTime(), // Convert to timestamp for AmCharts
                value: Number(item.value)
              };
            });

            // Sort data by date to ensure proper rendering
            processedData.sort((a, b) => a.date - b.date);

            // Set data on series with error handling
            series.data.setAll(processedData);
          } else {
            console.warn('No valid data points found after filtering');

            // Create minimal sample data to prevent rendering issues
            const today = new Date();
            const lastYear = new Date(today.getFullYear() - 1, 0, 1);
            const thisYear = new Date(today.getFullYear(), 0, 1);
            const sampleData = [
              { date: lastYear.getTime(), value: 0 },
              { date: thisYear.getTime(), value: 0 }
            ];
            series.data.setAll(sampleData);
          }
        } catch (err) {
          console.error('Error setting chart data:', err);

          // Create minimal sample data to prevent rendering issues
          const today = new Date();
          const lastYear = new Date(today.getFullYear() - 1, 0, 1);
          const thisYear = new Date(today.getFullYear(), 0, 1);
          const sampleData = [
            { date: lastYear.getTime(), value: 0 },
            { date: thisYear.getTime(), value: 0 }
          ];
          series.data.setAll(sampleData);
        }
      } else {
        console.warn('No data available for chart');

        // Create minimal sample data to prevent rendering issues
        const today = new Date();
        const lastYear = new Date(today.getFullYear() - 1, 0, 1);
        const thisYear = new Date(today.getFullYear(), 0, 1);
        const sampleData = [
          { date: lastYear.getTime(), value: 0 },
          { date: thisYear.getTime(), value: 0 }
        ];
        series.data.setAll(sampleData);
      }

      // Update legend with the single series
      legend.data.setAll([series]);

      // Make series appear with animation
      series.appear(1000);
    }

    // Make chart appear with animation
    chart.appear(1000, 100);

    // Save chart reference
    chartRef.current = chart;

    // Clean up on unmount
    return () => {
      root.dispose();
    };
  }, [data, seriesCode, isLoading, title]);

  // Format date for display in the table
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short'
    });
  };

  // Format value for display in the table
  const formatValue = (value) => {
    if (value === null || value === undefined || isNaN(value)) return t('chart.na');
    return value.toFixed(2);
  };

  // Get the most recent data points (limited to 20 for display, across all series)
  const recentData = data ? (
    // Handle multi-series data format
    data.series && data.seriesKeys ? (
      // Get data from all series
      data.seriesKeys.length > 0 ? 
        data.seriesKeys.flatMap(seriesKey => 
          data.series[seriesKey].map(item => ({
            ...item,
            seriesName: data.seriesNames[seriesKey] || seriesKey
          }))
        ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 20)
        : []
    ) : (
      // Handle legacy array data format
      data.length > 0 ? 
        [...data].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10)
        : []
    )
  ) : [];

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center">
            <h2 className={`chart-card-title ${position === 'top' ? 'fw-bold text-primary' : ''}`} 
                style={{
                  fontSize: position === 'top' ? '1.75rem' : '1.5rem',
                  transition: 'font-size 0.3s ease, color 0.3s ease'
                }}>
              {position === 'top' ? `${chartTitle} (Main Chart)` : chartTitle}
            </h2>
            {onMoveToTop && position !== 'top' && (
              <button 
                className="btn btn-sm btn-outline-primary ms-2"
                onClick={() => onMoveToTop(chartType)}
                title={t('chart.moveToTop')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                </svg>
              </button>
            )}
          </div>
          {onFilterChange && (
            <div className="ms-4">
              <ChartFilter 
                initialFilters={initialFilters}
                onApplyFilters={(filters) => onFilterChange(chartType, filters)}
                chartType={chartType}
              />
            </div>
          )}
        </div>
      </div>
      <div className="chart-card-body">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{t('chart.loading')}</span>
            </div>
          </div>
        ) : data && (
          // Check for multi-series data format
          (data.series && data.seriesKeys && data.seriesKeys.length > 0) || 
          // Check for legacy array data format
          (Array.isArray(data) && data.length > 0)
        ) ? (
          <>
            <div 
              ref={chartDivRef} 
              className="chart-container" 
              style={{ width: '100%', height: '500px' }}
            ></div>

            {/* Data Table Toggle Button */}
            <div className="data-table-toggle mt-3">
              <button 
                className="btn btn-sm btn-outline-primary d-flex align-items-center"
                onClick={() => setIsTableExpanded(!isTableExpanded)}
                aria-expanded={isTableExpanded}
                aria-controls="data-table"
              >
                {isTableExpanded ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up me-2" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                    </svg>
                    {t('chart.hideTable')}
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down me-2" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    {t('chart.showTable')}
                  </>
                )}
              </button>
            </div>

            {/* Data Table - Expandable */}
            <div 
              id="data-table"
              className={`data-table-container mt-2 ${isTableExpanded ? 'show' : 'collapse'}`}
              style={{ 
                maxHeight: isTableExpanded ? '400px' : '0',
                overflow: isTableExpanded ? 'auto' : 'hidden',
                transition: 'max-height 0.3s ease-in-out'
              }}
            >
              <h5>{t('chart.recentData')}</h5>
              {recentData.length > 0 ? (
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>{t('chart.date')}</th>
                      <th>{t('chart.value')}</th>
                      {/* Add series column for multi-series data */}
                      {data.series && data.seriesKeys && data.seriesKeys.length > 1 && (
                        <th>{t('chart.seriesName')}</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recentData.map((item, index) => (
                      <tr key={index}>
                        <td>{formatDate(item.date)}</td>
                        <td>{formatValue(item.value)}</td>
                        {/* Display series name for multi-series data */}
                        {data.series && data.seriesKeys && data.seriesKeys.length > 1 && (
                          <td>{item.seriesName}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-info">
                  {t('chart.noRecentData')}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="no-data-message">
            {t('chart.noData')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
