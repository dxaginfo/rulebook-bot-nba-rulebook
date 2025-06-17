import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const NotFoundPage: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Paper elevation={1} sx={{ p: 4, maxWidth: 600, mx: 'auto', borderRadius: 2 }}>
        <SportsBasketballIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
        
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          404 - Page Out of Bounds
        </Typography>
        
        <Typography variant="body1" paragraph color="text.secondary">
          The page you're looking for has stepped out of bounds and is not available.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          component={RouterLink} 
          to="/"
          sx={{ mt: 2 }}
        >
          Return to Home Court
        </Button>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;