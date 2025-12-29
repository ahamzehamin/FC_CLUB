import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ApexChart = ({ options, series, type, height = 350 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const defaultOptions = {
        chart: {
          type: type || 'line',
          height: height,
        },
        series: series || [],
        ...options,
      };

      chartInstance.current = new ApexCharts(chartRef.current, defaultOptions);
      chartInstance.current.render();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [options, series, type, height]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.updateOptions({
        series: series,
        ...options,
      });
    }
  }, [series, options]);

  return <div ref={chartRef} />;
};

export default ApexChart;
