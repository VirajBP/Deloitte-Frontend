import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  const chartData = {
    labels: ['New Orders', 'Urgent Orders', 'Pending Orders', 'Processing'],
    datasets: [
      {
        data: [
          data.totalNew,
          data.totalUrgent,
          data.totalPending,
          data.totalProcessing
        ],
        backgroundColor: [
          'rgba(52, 152, 219, 0.8)',  // New - Blue
          'rgba(231, 76, 60, 0.8)',   // Urgent - Red
          'rgba(243, 156, 18, 0.8)',  // Pending - Orange
          'rgba(46, 204, 113, 0.8)'   // Processing - Green
        ],
        borderColor: [
          '#3498db',
          '#e74c3c',
          '#f39c12',
          '#2ecc71'
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'Inter'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#2c3e50',
        bodyColor: '#2c3e50',
        bodyFont: {
          family: 'Inter'
        },
        titleFont: {
          family: 'Inter',
          weight: '600'
        },
        padding: 12,
        boxPadding: 8,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            return ` ${label}: ${value}`;
          }
        }
      }
    },
    layout: {
      padding: 20
    },
    elements: {
      arc: {
        borderWidth: 2
      }
    }
  };

  return (
    <div className="pie-chart-container">
      <h2>Orders Distribution</h2>
      <div className="chart-wrapper">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}

export default PieChart;
