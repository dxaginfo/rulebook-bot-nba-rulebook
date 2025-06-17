import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Container, Link, Grid, Divider } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              RuleBook Bot
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your AI assistant for NBA rules and regulations
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Navigation
            </Typography>
            <Typography variant="body2" paragraph>
              <Link component={RouterLink} to="/" color="inherit">
                Home
              </Link>
            </Typography>
            <Typography variant="body2" paragraph>
              <Link component={RouterLink} to="/about" color="inherit">
                About
              </Link>
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Typography variant="body2" paragraph>
              <Link href="https://official.nba.com/rulebook/" target="_blank" rel="noopener" color="inherit">
                Official NBA Rulebook
              </Link>
            </Typography>
            <Typography variant="body2" paragraph>
              <Link href="https://videorulebook.nba.com/" target="_blank" rel="noopener" color="inherit">
                NBA Video Rulebook
              </Link>
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Disclaimer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is an unofficial educational tool and is not affiliated with or endorsed by the NBA.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} RuleBook Bot. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;