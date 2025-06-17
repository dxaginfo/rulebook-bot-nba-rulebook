import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Button, Paper } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center',
        py: 8
      }}
    >
      <SportsBasketballIcon 
        sx={{ 
          fontSize: 100, 
          color: 'primary.main', 
          mb: 4,
          opacity: 0.8,
          animation: 'bounce 2s infinite'
        }} 
      />
      
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        404 - Out of Bounds!
      </Typography>
      
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        The page you're looking for has stepped out of bounds and can't be found.
        Let's get back in the game!
      </Typography>
      
      <Button 
        variant="contained" 
        size="large"
        startIcon={<HomeIcon />}
        component={RouterLink}
        to="/"
      >
        Return to Home Court
      </Button>
    </Box>
  );
};

export default NotFoundPage;