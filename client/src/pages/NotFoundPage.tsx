import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          py: 8
        }}
      >
        <SportsBasketballIcon sx={{ fontSize: 100, color: 'primary.main', mb: 3 }} />
        
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          404
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Out of Bounds!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
          Looks like you've stepped out of bounds. The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/"
          size="large"
          sx={{ mt: 3 }}
        >
          Back to Home Court
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;