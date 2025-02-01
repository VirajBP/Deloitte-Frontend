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
  IconButton,
  TablePagination,
  Box,
  TextField,
  InputAdornment,
  Collapse,
  Grid,
  Card,
  CardContent,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Visibility,
  Search,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ShoppingCart,
  CheckCircle,
  Flag,
  ErrorOutline
} from '@mui/icons-material';
import { mockEmails } from '../../mocks/mockData';

const EmailRow = ({ email }) => {
  const [open, setOpen] = useState(false);

  const getStatusIcon = () => {
    if (email.canBeProcessed) {
      return (
        <Tooltip title="Can be processed as order">
          <CheckCircle color="success" />
        </Tooltip>
      );
    }
    return (
      <Tooltip title={email.issueDescription || "Needs manual attention"}>
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          <Flag color="error" />
          {email.issueDescription && (
            <ErrorOutline 
              fontSize="small" 
              color="warning" 
              sx={{ ml: 1 }}
            />
          )}
        </Box>
      </Tooltip>
    );
  };

  return (
    <>
      <TableRow 
        hover 
        onClick={() => setOpen(!open)}
        sx={{ 
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <TableCell>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{email.subject}</TableCell>
        <TableCell>{email.sender}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getStatusIcon()}
            {email.issueDescription && (
              <Typography 
                variant="caption" 
                color="text.secondary" 
                sx={{ ml: 1 }}
              >
                {email.issueDescription}
              </Typography>
            )}
          </Box>
        </TableCell>
        <TableCell align="right">
          <IconButton size="small" color="primary">
            <Visibility />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ 
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(0, 0, 0, 0.02)'
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Email Content
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                        {email.body}
                      </Typography>
                      {email.issueDescription && (
                        <Box 
                          sx={{ 
                            mt: 2, 
                            p: 2, 
                            backgroundColor: 'error.main', 
                            color: 'error.contrastText',
                            borderRadius: 1
                          }}
                        >
                          <Typography variant="subtitle2">
                            Processing Issues:
                          </Typography>
                          <Typography variant="body2">
                            {email.issueDescription}
                          </Typography>
                        </Box>
                      )}
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
                      {email.orderDetails?.items ? (
                        <Grid container spacing={2}>
                          {email.orderDetails.items.map((item, index) => (
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
                                    <Typography 
                                      variant="body2" 
                                      color={item.quantity ? 'text.secondary' : 'error.main'}
                                    >
                                      Quantity: {item.quantity || 'Not specified'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Price: ${item.price?.toLocaleString() || '0.00'}
                                    </Typography>
                                    {item.quantity && (
                                      <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{ mt: 1 }}
                                      >
                                        Subtotal: ${((item.quantity || 0) * (item.price || 0)).toLocaleString()}
                                      </Typography>
                                    )}
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                          <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end" mt={2}>
                              <Typography variant="subtitle1">
                                Total Amount: ${email.orderDetails.totalAmount?.toLocaleString() || '0.00'}
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

const EmailList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = mockEmails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1">
            Email Management
          </Typography>
          <TextField
            size="small"
            placeholder="Search emails..."
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
                <TableCell width="50px" />
                <TableCell>Subject</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((email) => (
                  <EmailRow key={email.id} email={email} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredEmails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default EmailList;
