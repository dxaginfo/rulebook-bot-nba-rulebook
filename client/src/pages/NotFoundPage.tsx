import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid
} from '@mui/material';
import SportsTwoToneIcon from '@mui/icons-material/SportsTwoTone';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Grid 
        container 
        spacing={3} 
        justifyContent="center" 
        alignItems="center"
        sx={{ minHeight: '60vh' }}
      >
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider',
              textAlign: 'center'
            }}
          >
            <SportsTwoToneIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            
            <Typography variant="h3" gutterBottom>
              404
            </Typography>
            
            <Typography variant="h5" gutterBottom>
              Page Not Found
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 2 }}>
              Oops! Looks like you're out of bounds. The page you're looking for doesn't exist or has been moved.
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<HomeIcon />}
                component={RouterLink}
                to="/"
              >
                Return to Home Court
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;