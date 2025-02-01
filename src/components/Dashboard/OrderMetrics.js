import React from 'react';
import { orderStats } from '../../mocks/mockData';

function OrderMetrics({ metrics }) {
  const totalOrders = orderStats.totalNew + orderStats.totalProcessing + orderStats.totalPending;

  return (
    <div className="metrics-container">
      <div className="metrics-grid">
        <div className="metric-card new bg-primary">
          <div className="metric-icon">📥</div>
          <div className="metric-content">
            <h3>New Orders</h3>
            <div className="metric-value">{orderStats.totalNew}</div>
          </div>
        </div>
        <div className="metric-card urgent bg-urgent">
          <div className="metric-icon">🚨</div>
          <div className="metric-content">
            <h3>Urgent Orders</h3>
            <div className="metric-value">{orderStats.totalUrgent}</div>
          </div>
        </div>
        <div className="metric-card pending bg-warning">
          <div className="metric-icon">⏳</div>
          <div className="metric-content">
            <h3>Pending Orders</h3>
            <div className="metric-value">{orderStats.totalPending}</div>
          </div>
        </div>
        <div className="metric-card processing bg-success">
          <div className="metric-icon">⚙️</div>
          <div className="metric-content">
            <h3>Processing</h3>
            <div className="metric-value">{orderStats.totalProcessing}</div>
          </div>
        </div>
        <div className="metric-card total">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Total Orders Today</h3>
            <div className="metric-value">{totalOrders}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderMetrics;