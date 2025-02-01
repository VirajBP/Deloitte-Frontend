import React, { useState, useEffect } from 'react';
import NotificationList from './NotificationList';

function NotificationBar() {
  const [notifications, setNotifications] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="notification-bar">
      <div className="notification-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span>Notifications</span>
        <span className="notification-count">{notifications.length}</span>
      </div>
      {isExpanded && <NotificationList notifications={notifications} />}
    </div>
  );
}

export default NotificationBar;