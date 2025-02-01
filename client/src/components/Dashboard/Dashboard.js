import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import EmailList from './EmailList';
import OrderMetrics from './OrderMetrics';
import ProcessingQueue from './ProcessingQueue';
import NotificationBar from '../Notifications/NotificationBar';
import EmailService from '../../services/emailService';
import OrderService from '../../services/orderService';
import NotificationService from '../../services/notificationService';
import SearchFilters from './SearchFilters';
import DateRangePicker from './DateRangePicker';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import PieChart from './PieChart'; // Import PieChart component
import { mockEmails, mockOrders } from '../../mocks/mockData';

function Dashboard() {
  const [metrics, setMetrics] = useState({
    newEmails: 0,
    processingOrders: 0,
    urgentOrders: 0,
    completedToday: 0
  });

  const [emails, setEmails] = useState(mockEmails);
  const [processingQueue, setProcessingQueue] = useState(mockOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [orderStats, setOrderStats] = useState({}); // Initialize orderStats state

  useEffect(() => {
    // Fetch initial data
    fetchEmails();
    fetchProcessingQueue();
    
    // Set up polling intervals
    const emailInterval = setInterval(fetchEmails, 30000);
    const queueInterval = setInterval(fetchProcessingQueue, 10000);

    return () => {
      clearInterval(emailInterval);
      clearInterval(queueInterval);
    };
  }, []);

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      // For development, use mock data instead of API call
      // const fetchedEmails = await emailService.fetchEmails();
      const fetchedEmails = mockEmails;
      setEmails(fetchedEmails);
      updateMetrics(fetchedEmails, processingQueue);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProcessingQueue = async () => {
    try {
      // For development, use mock data instead of API call
      // const queue = await orderService.getProcessingQueue();
      const queue = mockOrders;
      setProcessingQueue(queue);
      updateMetrics(emails, queue);
    } catch (error) {
      console.error('Error fetching processing queue:', error);
    }
  };

  const updateMetrics = (currentEmails, currentQueue) => {
    setMetrics({
      newEmails: currentEmails.length,
      processingOrders: currentQueue.length,
      urgentOrders: currentEmails.filter(email => email.priority === 'urgent').length,
      completedToday: currentQueue.filter(order => order.status === 'completed').length
    });
    // Update orderStats
    const stats = {
      labels: ['New Orders', 'Processing Orders', 'Urgent Orders', 'Completed Today'],
      datasets: [{
        data: [currentEmails.length, currentQueue.length, currentEmails.filter(email => email.priority === 'urgent').length, currentQueue.filter(order => order.status === 'completed').length],
        backgroundColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(243, 156, 18, 1)',
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(243, 156, 18, 1)',
        ],
        borderWidth: 1
      }]
    };
    setOrderStats(stats);
  };

  const handleProcessOrder = async (emailId) => {
    const orderDetails = await EmailService.parseEmailOrder(emailId);
    if (orderDetails) {
      const processedOrder = await OrderService.processOrder(orderDetails);
      if (processedOrder) {
        await NotificationService.sendNotification(
          orderDetails.userId,
          `Order #${orderDetails.orderNumber} is being processed`
        );
        fetchEmails();
        fetchProcessingQueue();
      }
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Filter emails based on search term
    const filteredEmails = emails.filter(email => 
      email.orderNumber.includes(term) || 
      email.customerName.toLowerCase().includes(term.toLowerCase())
    );
    setEmails(filteredEmails);
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    // Apply filters
  };

  const handleDateChange = (type, date) => {
    setDateRange(prev => ({ ...prev, [type]: date }));
    // Filter by date range
  };

  return (
    <div className="dashboard">
      <NotificationBar />
      
      <div className="dashboard-header">
        <h1>Order Processing Dashboard</h1>
        <OrderMetrics metrics={metrics} />
      </div>

        <SearchFilters 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

      <div className="dashboard-content">
        {/* <div className="content-main"> */}
            <div className="orders-column">
              <h2>New Orders</h2>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <EmailList 
                  emails={emails} 
                  onProcess={handleProcessOrder}
                />
              )}
            </div>
          <div className="orders-section">
            
          <div className="chart-section">
            <PieChart data={orderStats} />
          </div>
            <div className="orders-column preprocess">
              <h2>Processing Queue</h2>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ProcessingQueue orders={processingQueue} />
              )}
            </div>
          </div>
          
        {/* </div> */}
      </div>
    </div>
  );
}

export default Dashboard;