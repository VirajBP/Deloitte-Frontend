class EmailService {
    async fetchEmails() {
      try {
        // API call to fetch emails
        const response = await fetch('/api/emails');
        return await response.json();
      } catch (error) {
        console.error('Error fetching emails:', error);
        return [];
      }
    }
  
    async parseEmailOrder(emailId) {
      try {
        // API call to parse email and extract order details
        const response = await fetch(`/api/emails/${emailId}/parse`);
        return await response.json();
      } catch (error) {
        console.error('Error parsing email:', error);
        return null;
      }
    }
  }
  
  export default new EmailService();