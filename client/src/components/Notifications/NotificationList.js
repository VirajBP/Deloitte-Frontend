import React from 'react';

function NotificationList({ notifications }) {
  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <div key={notification.id} className={`notification-item ${notification.type}`}>
          <span className="notification-message">{notification.message}</span>
          <span className="notification-time">{notification.time}</span>
        </div>
      ))}
    </div>
  );
}

export default NotificationList;