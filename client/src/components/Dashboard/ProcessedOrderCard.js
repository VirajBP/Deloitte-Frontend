import React from 'react';
import { Card, CardContent, Typography, Chip, Box, List, ListItem } from '@mui/material';
import { Schedule, ShoppingCart } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const ProcessedOrderCard = ({ order }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div">
            Order {order.id}
          </Typography>
          <Chip
            label={order.status}
            color={order.status === 'Completed' ? 'success' : 'warning'}
            size="small"
          />
        </Box>

        <Typography color="textSecondary" gutterBottom>
          Customer: {order.customerName}
        </Typography>

        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Amount: ${order.amount.toFixed(2)}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            <ShoppingCart fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
            Items:
          </Typography>
          <List dense sx={{ pl: 4 }}>
            {order.items.map((item, index) => (
              <ListItem key={index} sx={{ py: 0 }}>
                <Typography variant="body2">• {item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <Schedule fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="caption" color="textSecondary">
            Processed {formatDistanceToNow(new Date(order.processedDate), { addSuffix: true })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProcessedOrderCard;