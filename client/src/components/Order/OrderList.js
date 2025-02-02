import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  IconButton,
  TablePagination,
  Box,
  TextField,
  InputAdornment,
  Collapse,
  Grid,
  Card,
  CardContent,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import {
  Search,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ShoppingCart,
  CheckCircle,
  Inventory,
  Payment,
  LocalShipping
} from '@mui/icons-material';
import { mockProcessedOrders, ORDER_STATUS } from '../../mocks/mockData';

const getStatusIcon = (level) => {
  switch (level) {
    case 1:
      return <CheckCircle />;
    case 2:
      return <Inventory />;
    case 3:
      return <Payment />;
    case 4:
      return <LocalShipping />;
    default:
      return <CheckCircle />;
  }
};

const getStatusColor = (level, currentLevel) => {
  if (level < currentLevel) return 'success';
  if (level === currentLevel) return 'primary';
  return 'default';
};

const ProcessingTimeline = ({ history, currentLevel }) => {
  return (
    <Timeline>
      {history.map((step, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.2 }}>
            {new Date(step.timestamp).toLocaleTimeString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={getStatusColor(step.level, currentLevel)}>
              {getStatusIcon(step.level)}
            </TimelineDot>
            {index < history.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="subtitle2" component="span">
              {step.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {step.note}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const OrderProgress = ({ level }) => {
  return (
    <Stepper activeStep={level - 1} alternativeLabel>
      {Object.values(ORDER_STATUS).map((status) => (
        <Step key={status.level}>
          <StepLabel
            StepIconProps={{
              icon: getStatusIcon(status.level)
            }}
          >
            {status.status}
            <Typography variant="caption" display="block" color="text.secondary">
              {status.description}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order.orderNumber || 'N/A'}</TableCell>
        <TableCell>{order.customerName || 'N/A'}</TableCell>
        <TableCell>
          <Chip
            label={order.status || 'Unknown'}
            color={getStatusColor(order.processingLevel, order.processingLevel)}
            size="small"
          />
        </TableCell>
        <TableCell align="right">${(order.amount || 0).toLocaleString()}</TableCell>
        <TableCell>
          <Chip
            label={ORDER_STATUS[`LEVEL_${order.processingLevel}`]?.status || 'Unknown'}
            color={getStatusColor(order.processingLevel, order.processingLevel)}
            size="small"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <OrderProgress level={order.processingLevel} />
                </Grid>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ 
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Processing History
                      </Typography>
                      <ProcessingTimeline 
                        history={order.processingHistory}
                        currentLevel={order.processingLevel}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)'
                  }}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <ShoppingCart sx={{ mr: 1 }} />
                        <Typography variant="h6">
                          Order Details
                        </Typography>
                      </Box>
                      <Box mb={2}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Payment Status: {order.paymentStatus || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                              Payment Method: {order.paymentMethod || 'N/A'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      {order.items ? (
                        <Grid container spacing={2}>
                          {order.items.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="subtitle1" gutterBottom>
                                    {item.name}
                                  </Typography>
                                  {item.specifications && (
                                    <Box mb={1}>
                                      <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Specifications:
                                      </Typography>
                                      {item.specifications.map((spec, idx) => (
                                        <Typography 
                                          key={idx} 
                                          variant="body2" 
                                          color="text.secondary"
                                          sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            '&:before': {
                                              content: '"•"',
                                              marginRight: '8px',
                                              color: 'primary.main'
                                            }
                                          }}
                                        >
                                          {spec}
                                        </Typography>
                                      ))}
                                    </Box>
                                  )}
                                  <Box 
                                    sx={{
                                      mt: 2,
                                      pt: 2,
                                      borderTop: 1,
                                      borderColor: 'divider'
                                    }}
                                  >
                                    <Typography variant="body2" color="text.secondary">
                                      Quantity: {item.quantity}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Price: ${item.price?.toLocaleString() || '0.00'}
                                    </Typography>
                                    <Typography 
                                      variant="body2" 
                                      color="text.secondary"
                                      sx={{ mt: 1 }}
                                    >
                                      Subtotal: ${((item.quantity || 0) * (item.price || 0)).toLocaleString()}
                                    </Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                              <Typography variant="subtitle1">
                                Total Amount: ${order.amount?.toLocaleString() || '0.00'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No order details available
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderList = ({ orders, limitEntries }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // If limitEntries is true, use simplified version
  if (limitEntries) {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.orderNumber || 'N/A'}</TableCell>
                <TableCell>{order.customerName || 'N/A'}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status || 'Unknown'}
                    color={getStatusColor(order.processingLevel, order.processingLevel)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  ${(order.amount || 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={ORDER_STATUS[`LEVEL_${order.processingLevel}`]?.status || 'Unknown'}
                    color={getStatusColor(order.processingLevel, order.processingLevel)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  // For the full page version
  const filteredOrders = mockProcessedOrders.filter(order =>
    (order.orderNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (order.customerName?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Return full version with search and pagination
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1">
            Order Management
          </Typography>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order #</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default OrderList;
