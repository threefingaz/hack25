import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CashFlowChart = ({ monthlyFlows }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!monthlyFlows || monthlyFlows.length === 0) return;

    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare data
    const labels = monthlyFlows.map(flow => {
      const date = new Date(flow.month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    });

    const incomeData = monthlyFlows.map(flow => flow.income);
    const expenseData = monthlyFlows.map(flow => -flow.expenses); // Negative for visualization

    // Create new chart
    chartInstance.current = new ChartJS(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: 'rgb(34, 197, 94)',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: expenseData,
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 1,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Your Cash Flow Analysis',
            font: {
              size: 18,
              weight: 'bold'
            },
            padding: 20
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': €';
                }
                const value = Math.abs(context.parsed.y);
                label += new Intl.NumberFormat('de-DE').format(value);
                
                // Add net cash flow to tooltip
                if (context.datasetIndex === 0) { // Income dataset
                  const monthData = monthlyFlows[context.dataIndex];
                  const netFlow = monthData.income - monthData.expenses;
                  return [
                    label,
                    `Net Cash Flow: €${new Intl.NumberFormat('de-DE').format(netFlow)}`
                  ];
                }
                return label;
              }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            intersect: false
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              }
            }
          },
          y: {
            stacked: false,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '€' + new Intl.NumberFormat('de-DE').format(Math.abs(value));
              },
              font: {
                size: 12
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        }
      }
    });

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [monthlyFlows]);

  // Highlight current month
  const currentMonthIndex = monthlyFlows.length - 1;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="relative" style={{ height: '400px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
      {currentMonthIndex >= 0 && (
        <div className="mt-4 text-sm text-gray-600 text-center">
          <span className="inline-flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Current month highlighted
          </span>
        </div>
      )}
    </div>
  );
};

export default CashFlowChart;