import React from 'react';

function EmailList({ emails, onProcess }) {
  // Get only the top 3 newest emails
  const topEmails = emails;

  return (
    <div className="email-list">
      {topEmails.map((email) => (
        <div key={email.id} className={`email-card ${email.priority}`}>
          <div className="email-header">
            <div className="customer-info">
              <span className="customer-name">{email.customerName}</span>
              <span className="email-from">{email.from}</span>
            </div>
            <div className="order-time">
              <span className="email-time">{email.timestamp}</span>
            </div>
          </div>
          
          <div className="order-details">
            <div className="order-number">
              <span className="label">Order #:</span>
              <span className="value">{email.orderNumber}</span>
            </div>
            <div className="order-amount">
              <span className="label">Amount:</span>
              <span className="value">${email.amount.toFixed(2)}</span>
            </div>
            <div className={`order-priority ${email.priority}`}>
              {email.priority.toUpperCase()}
            </div>
          </div>

          <div className="order-actions">
            <button 
              className={`process-btn ${email.priority}`}
              onClick={() => onProcess(email.id)}
            >
              Process Order
            </button>
          </div>
        </div>
      ))}
      
      {emails.length > 3 && (
        <div className="view-more">
          <button className="view-more-btn">
            View All Orders
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailList;