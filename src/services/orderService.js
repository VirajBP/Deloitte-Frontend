class OrderService {
    async processOrder(orderDetails) {
      try {
        // API call to process the order
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });
        return await response.json();
      } catch (error) {
        console.error('Error processing order:', error);
        return null;
      }
    }
  
    async getProcessingQueue() {
      try {
        // API call to get current processing queue
        const response = await fetch('/api/orders/queue');
        return await response.json();
      } catch (error) {
        console.error('Error fetching processing queue:', error);
        return [];
      }
    }
  }
  
  export default new OrderService();