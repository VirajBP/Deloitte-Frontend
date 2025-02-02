import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { Flag, Schedule } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const EmailCard = ({ email }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'normal':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        border: email.needsReview ? '1px solid #ff9800' : 'none',
        backgroundColor: email.needsReview ? 'rgba(255, 152, 0, 0.05)' : 'inherit'
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" component="div" noWrap sx={{ maxWidth: '70%' }}>
            {email.subject}
          </Typography>
          <Box>
            {email.needsReview && (
              <Chip
                icon={<Flag />}
                label="Review"
                color="warning"
                size="small"
                sx={{ mr: 1 }}
              />
            )}
            <Chip
              label={email.priority}
              color={getPriorityColor(email.priority)}
              size="small"
            />
          </Box>
        </Box>
        
        <Typography color="textSecondary" gutterBottom>
          From: {email.sender}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {email.content}
        </Typography>
        
        <Box display="flex" alignItems="center">
          <Schedule fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="caption" color="textSecondary">
            {formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmailCard;