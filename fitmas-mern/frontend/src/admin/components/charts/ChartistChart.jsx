import React, { useEffect, useRef } from 'react';
import { LineChart, BarChart, PieChart } from 'chartist';

const ChartistChart = ({ type, data, options = {}, responsiveOptions = [], className = '' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      let ChartClass;
      switch (type) {
        case 'line':
          ChartClass = LineChart;
          break;
        case 'bar':
          ChartClass = BarChart;
          break;
        case 'pie':
          ChartClass = PieChart;
          break;
        default:
          ChartClass = LineChart;
      }

      chartInstance.current = new ChartClass(
        chartRef.current,
        data,
        options,
        responsiveOptions
      );
    }

    return () => {
      if (chartInstance.current) {
        // Chartist doesn't have a destroy method, but we can clear the element
        if (chartRef.current) {
          chartRef.current.innerHTML = '';
        }
        chartInstance.current = null;
      }
    };
  }, [type]);

  useEffect(() => {
    if (chartInstance.current && chartRef.current) {
      chartRef.current.innerHTML = '';
      let ChartClass;
      switch (type) {
        case 'line':
          ChartClass = LineChart;
          break;
        case 'bar':
          ChartClass = BarChart;
          break;
        case 'pie':
          ChartClass = PieChart;
          break;
        default:
          ChartClass = LineChart;
      }

      chartInstance.current = new ChartClass(
        chartRef.current,
        data,
        options,
        responsiveOptions
      );
    }
  }, [data, options, responsiveOptions, type]);

  return <div ref={chartRef} className={`ct-chart ${className}`} />;
};

export default ChartistChart;
