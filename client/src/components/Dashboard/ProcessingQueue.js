import React from 'react';

function ProcessingQueue({ orders }) {
  return (
    <div className="processing-queue">
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <span className="order-number">Order #{order.orderNumber}</span>
            <span className={`order-status ${order.status}`}>{order.status}</span>
          </div>
          <div className="order-details">
            <div>Customer: {order.customerName}</div>
            <div>Amount: ${order.amount}</div>
            <div>Processing since: {order.processingTime}</div>
          </div>
          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ width: `${order.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProcessingQueue;