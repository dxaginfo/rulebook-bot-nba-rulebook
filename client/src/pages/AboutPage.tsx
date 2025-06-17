import React from 'react';
import { Container, Typography, Box, Paper, Grid, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          About RuleBook Bot
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Your AI assistant for NBA rules and regulations
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom>
              About This Project
            </Typography>
            
            <Typography variant="body1" paragraph>
              RuleBook Bot is an educational tool designed to help basketball fans, players, and coaches better understand the official NBA rules. 
              Using conversational AI, it provides easy access to rule explanations, interpretations, and examples from the NBA rulebook.
            </Typography>
            
            <Typography variant="body1" paragraph>
              Whether you're watching a game and need clarification on a call, studying the rulebook as a player or coach, or just curious about
              specific regulations, RuleBook Bot aims to make the complex NBA rulebook more accessible and understandable.
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              Features
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
                  <LocalLibraryIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Practical Examples" 
                  secondary="Learn through real-world examples of rule applications"
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>
              Disclaimer
            </Typography>
            
            <Typography variant="body1" paragraph>
              RuleBook Bot is an unofficial educational tool and is not affiliated with or endorsed by the National Basketball Association (NBA). 
              The information provided is intended for educational purposes only.
            </Typography>
            
            <Typography variant="body1" paragraph>
              For official rules and interpretations, please refer to the official NBA rulebook and other NBA publications. This application 
              should not be used for making official rule determinations in professional basketball games.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              How to Use
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Ask questions in the chat interface" />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Browse rules by category" />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Search for specific terms" />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <CheckCircleOutlineIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="Click on citations to view detailed rules" />
              </ListItem>
            </List>
          </Paper>
          
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Official NBA Rulebook" 
                  secondary={<a href="https://official.nba.com/rulebook/" target="_blank" rel="noopener noreferrer">official.nba.com/rulebook</a>}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="NBA Video Rulebook" 
                  secondary={<a href="https://videorulebook.nba.com/" target="_blank" rel="noopener noreferrer">videorulebook.nba.com</a>}
                />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Official Rules Interpretations" 
                  secondary={<a href="https://official.nba.com/rule-interpretations/" target="_blank" rel="noopener noreferrer">official.nba.com/rule-interpretations</a>}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;