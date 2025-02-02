import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { mockOrders, mockEmails } from '../../mocks/mockData';

function UserDashboard() {
  const [metrics, setMetrics] = useState({
    pendingOrders: 0,
    totalOrders: 0,
    processingOrders: 0
  });
  const [latestOrders, setLatestOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    setIsLoading(true);
    try {
      const userEmail = mockEmails.find(email => 
        email.sender.toLowerCase() === user.email.toLowerCase()
      );

      const userOrders = userEmail ? mockOrders.filter(order => 
        order.customerName.toLowerCase() === userEmail.sender.split('@')[0].split('.').map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ')
      ) : [];
      
      setMetrics({
        pendingOrders: userOrders.filter(order => order.status === 'pending').length,
        totalOrders: userOrders.length,
        processingOrders: userOrders.filter(order => order.status === 'processing').length
      });

      const latest = [...userOrders]
        .sort((a, b) => new Date(`2025-01-01 ${b.processingTime}`) - new Date(`2025-01-01 ${a.processingTime}`))
        .slice(0, 3);
      
      setLatestOrders(latest);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#e3f2fd' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Pending Orders
            </Typography>
            <Typography component="p" variant="h4">
              {metrics.pendingOrders}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Awaiting confirmation
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#f3e5f5' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Total Orders
            </Typography>
            <Typography component="p" variant="h4">
              {metrics.totalOrders}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Orders till date
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, bgcolor: '#e8f5e9' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Processing Orders
            </Typography>
            <Typography component="p" variant="h4">
              {metrics.processingOrders}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Orders in process
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Latest Orders
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Number</TableCell>
                    <TableCell>Items</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Processing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.items.join(', ')}</TableCell>
                      <TableCell>${order.amount.toFixed(2)}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        <Tooltip title={order.status === 'processing' ? 'Processing' : 'Pending'}>
                          <IconButton size="small" color="primary" disabled>
                            {order.status === 'processing' ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  {latestOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No orders found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserDashboard;