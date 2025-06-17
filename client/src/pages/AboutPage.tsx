import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About RuleBook Bot
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Making the NBA rulebook more accessible and understandable
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 2, 
              border: '1px solid', 
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            
            <Typography variant="body1" paragraph>
              RuleBook Bot was created to help basketball fans, players, coaches, and officials better understand the complex rules of professional basketball. We recognize that the official NBA rulebook, while comprehensive, can be challenging to navigate and interpret.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Our AI-powered platform makes it easier to search, browse, and understand NBA rules through natural language conversation and a structured rule browser.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              Key Features
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <ChatIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="AI-Powered Rule Assistant" 
                  secondary="Ask questions about NBA rules in natural language and get clear, concise answers"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <SearchIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Comprehensive Rule Search" 
                  secondary="Search through the entire NBA rulebook for specific terms, violations, or procedures"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Structured Rule Browser" 
                  secondary="Browse rules by category for easy navigation"
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Practical Examples" 
                  secondary="Learn through real-world examples of rule applications"
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              How It Works
            </Typography>
            
            <Typography variant="body1" paragraph>
              RuleBook Bot combines a comprehensive database of NBA rules with natural language processing to understand and respond to your questions. Our system is designed to provide accurate information with relevant citations to the official rulebook.
            </Typography>
            
            <Typography variant="body1" paragraph>
              When you ask a question, our AI analyzes it to identify the most relevant rules and presents them in an easy-to-understand format, complete with examples and rule citations.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" gutterBottom>
                Disclaimer
              </Typography>
              
              <Typography variant="body1" paragraph>
                RuleBook Bot is an unofficial educational tool and is not affiliated with or endorsed by the National Basketball Association (NBA). The information provided is intended for educational purposes only.
              </Typography>
              
              <Typography variant="body1" paragraph>
                For official rules and interpretations, please refer to the official NBA rulebook and other NBA publications. This application should not be used for making official rule determinations in professional basketball games.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              mb: 4,
              border: '1px solid', 
              borderColor: 'divider'
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              alt="Basketball court"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              
              <List dense>
                <ListItem component="a" href="https://official.nba.com/rulebook/" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemIcon>
                    <MenuBookIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Official NBA Rulebook" />
                </ListItem>
                
                <ListItem component="a" href="https://videorulebook.nba.com/" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemIcon>
                    <MenuBookIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="NBA Video Rulebook" />
                </ListItem>
                
                <ListItem component="a" href="https://official.nba.com/" target="_blank" rel="noopener" sx={{ color: 'inherit', textDecoration: 'none' }}>
                  <ListItemIcon>
                    <InfoIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="NBA Official" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          
          <Card 
            elevation={0} 
            sx={{ 
              border: '1px solid', 
              borderColor: 'divider'
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              
              <Typography variant="body2" paragraph>
                Have suggestions or feedback? We'd love to hear from you.
              </Typography>
              
              <Typography variant="body2">
                Email: <a href="mailto:support@rulebookbot.example.com" style={{ color: 'inherit' }}>support@rulebookbot.example.com</a>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;