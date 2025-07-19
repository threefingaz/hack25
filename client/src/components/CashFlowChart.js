import React, { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import { getCardClasses, getTextClasses } from '../design-system/utils';

// Lazy load Chart.js components
const Chart = React.lazy(() => 
  Promise.all([
    import('chart.js').then(module => {
      const {
        Chart: ChartJS,
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,
      } = module;
      
      ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
      return module;
    }),
    import('react-chartjs-2')
  ]).then(([chartjs, reactChartjs]) => ({
    default: reactChartjs.Bar
  }))
);


const CashFlowChart = ({ monthlyFlows }) => {
  if (!monthlyFlows || monthlyFlows.length === 0) {
    return (
      <div className={getCardClasses('elevated', 'md')}>
        <div className="text-center py-12">
          <p className={getTextClasses('body')}>No cash flow data available</p>
        </div>
      </div>
    );
  }

  // Prepare data
  const labels = monthlyFlows.map(flow => {
    const date = new Date(flow.month + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: monthlyFlows.map(flow => flow.income),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: monthlyFlows.map(flow => flow.expenses),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Your Cash Flow Analysis',
        font: {
          size: window.innerWidth < 768 ? 14 : 18,
          weight: 'bold'
        },
        padding: window.innerWidth < 768 ? 10 : 20
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
            const value = context.parsed.y;
            label += new Intl.NumberFormat('de-DE').format(value);
            
            // Add net cash flow to tooltip for income
            if (context.datasetIndex === 0) {
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
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value) {
            return '€' + new Intl.NumberFormat('de-DE').format(value);
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
  };

  return (
    <div className={getCardClasses('elevated', 'sm') + ' md:p-6'}>
      <div className="relative" style={{ height: window.innerWidth < 768 ? '300px' : '400px' }}>
        <Suspense fallback={<LoadingSkeleton type="chart" />}>
          <Chart data={data} options={options} />
        </Suspense>
      </div>
      <div className={"mt-4 text-center " + getTextClasses('caption')}>
        <span className="inline-flex items-center">
          <span className="w-3 h-3 bg-slate-600 rounded-full mr-2 animate-pulse"></span>
          Latest 3 months of cash flow data
        </span>
      </div>
    </div>
  );
};

export default CashFlowChart;