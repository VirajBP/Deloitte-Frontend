import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function DashboardMetrics({ totalEmails, flaggedEmails, processedOrders }) {
  return (
    <div className="metrics-container">
      <div className="metrics-grid">
        <div className="metric-card bg-primary">
          <div className="metric-icon">
            <EmailIcon />
          </div>
          <div className="metric-content">
            <h3>New Emails</h3>
            <div className="metric-value">{totalEmails}</div>
          </div>
        </div>

        <div className="metric-card bg-warning">
          <div className="metric-icon">
            <WarningIcon />
          </div>
          <div className="metric-content">
            <h3>Needs Review</h3>
            <div className="metric-value">{flaggedEmails}</div>
          </div>
        </div>

        <div className="metric-card bg-success">
          <div className="metric-icon">
            <CheckCircleIcon />
          </div>
          <div className="metric-content">
            <h3>Processed Today</h3>
            <div className="metric-value">{processedOrders}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMetrics; 