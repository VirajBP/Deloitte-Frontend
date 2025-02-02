import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import EmailList from '../Email/EmailList';
import OrderList from '../Order/OrderList';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';
import { mockEmails, mockOrders } from '../../mocks/mockData';

function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalEmails: 0,
    flaggedEmails: 0,
    totalOrders: 0,
    processingOrders: 0
  });

  const [emails, setEmails] = useState(mockEmails);
  const [orders, setOrders] = useState(mockOrders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedEmails = mockEmails;
      const fetchedOrders = mockOrders;
      
      setEmails(fetchedEmails);
      setOrders(fetchedOrders);
      
      updateMetrics(fetchedEmails, fetchedOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMetrics = (currentEmails, currentOrders) => {
    setMetrics({
      totalEmails: currentEmails.length,
      flaggedEmails: currentEmails.filter(email => email.needsReview).length,
      totalOrders: currentOrders.length,
      processingOrders: currentOrders.filter(order => order.status === 'processing').length
    });
  };

  return (
    <Container maxWidth="lg" className="dashboard">
      {/* Metrics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Overview
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              bgcolor: 'primary.light' 
            }}
          >
            <Typography variant="h6">Total Emails</Typography>
            <Typography variant="h3">{metrics.totalEmails}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              bgcolor: 'warning.light'
            }}
          >
            <Typography variant="h6">Flagged Emails</Typography>
            <Typography variant="h3">{metrics.flaggedEmails}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              bgcolor: 'success.light'
            }}
          >
            <Typography variant="h6">Total Orders</Typography>
            <Typography variant="h3">{metrics.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              bgcolor: 'info.light'
            }}
          >
            <Typography variant="h6">Processing Orders</Typography>
            <Typography variant="h3">{metrics.processingOrders}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Email List Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Recent Emails</Typography>
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ cursor: 'pointer' }}
            onClick={() => window.location.href = '/email_list'}
          >
            View All
          </Typography>
        </Box>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <EmailList limitEntries={5} />
        )}
      </Paper>

      {/* Order List Section */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Recent Orders</Typography>
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ cursor: 'pointer' }}
            onClick={() => window.location.href = '/order_list'}
          >
            View All
          </Typography>
        </Box>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <OrderList limitEntries={5} orders={orders.slice(0, 5)} />
        )}
      </Paper>
    </Container>
  );
}

export default Dashboard;