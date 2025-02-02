import React from 'react';
import { orderStats } from '../../mocks/mockData';

function OrderMetrics({ metrics }) {
  // Add fallback values if orderStats is undefined
  const stats = {
    totalNew: orderStats?.totalNew || 0,
    totalUrgent: orderStats?.totalUrgent || 0,
    totalPending: orderStats?.totalPending || 0,
    totalProcessing: orderStats?.totalProcessing || 0
  };

  const totalOrders = stats.totalNew + stats.totalProcessing + stats.totalPending;

  return (
    <div className="metrics-container">
      <div className="metrics-grid">
        <div className="metric-card new bg-primary">
          <div className="metric-icon">📥</div>
          <div className="metric-content">
            <h3>New Orders</h3>
            <div className="metric-value">{stats.totalNew}</div>
          </div>
        </div>
        <div className="metric-card urgent bg-urgent">
          <div className="metric-icon">🚨</div>
          <div className="metric-content">
            <h3>Urgent Orders</h3>
            <div className="metric-value">{stats.totalUrgent}</div>
          </div>
        </div>
        <div className="metric-card pending bg-warning">
          <div className="metric-icon">⏳</div>
          <div className="metric-content">
            <h3>Pending Orders</h3>
            <div className="metric-value">{stats.totalPending}</div>
          </div>
        </div>
        <div className="metric-card processing bg-success">
          <div className="metric-icon">⚙️</div>
          <div className="metric-content">
            <h3>Processing</h3>
            <div className="metric-value">{stats.totalProcessing}</div>
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