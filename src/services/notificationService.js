class NotificationService {
    async sendNotification(userId, message) {
      try {
        // API call to send notification
        const response = await fetch('/api/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, message }),
        });
        return await response.json();
      } catch (error) {
        console.error('Error sending notification:', error);
        return null;
      }
    }
  
    async getNotifications() {
      try {
        // API call to get notifications
        const response = await fetch('/api/notifications');
        return await response.json();
      } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
      }
    }
  }
  
  export default new NotificationService();