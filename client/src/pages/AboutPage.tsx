import React from 'react';
import { Typography, Box, Paper, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const AboutPage: React.FC = () => {
  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom
        sx={{ 
          fontWeight: 700,
          color: 'primary.main' 
        }}
      >
        About RuleBook Bot
      </Typography>
      
      <Paper sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SportsBasketballIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            What is RuleBook Bot?
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          RuleBook Bot is an interactive AI assistant designed to help basketball fans, players, coaches, and officials better understand the NBA rulebook. Whether you're wondering about a specific rule, need clarification on a call you saw during a game, or want to deepen your knowledge of basketball regulations, RuleBook Bot provides accurate, cited answers directly from the official NBA rulebook.
        </Typography>
        
        <Typography variant="body1" paragraph>
          This tool was created to make the NBA rulebook more accessible and to help users quickly find the information they need without having to search through the entire rulebook manually.
        </Typography>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Features
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <SearchIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Instant Rule Lookup" 
              secondary="Ask about any NBA rule and get an immediate answer with relevant information."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <MenuBookIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Rule Citations" 
              secondary="All answers include precise citations from the official NBA rulebook so you can verify the information."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <QuestionAnswerIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Conversational Interface" 
              secondary="Ask follow-up questions or request clarification in a natural, conversational way."
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Disclaimer
        </Typography>
        
        <Typography variant="body1" paragraph>
          RuleBook Bot is not affiliated with the National Basketball Association (NBA). While we strive to provide accurate information based on the official NBA rulebook, this tool should not be considered an official NBA product or service.
        </Typography>
        
        <Typography variant="body1" paragraph>
          For official rule interpretations or decisions, please refer to the NBA's official resources or contact the NBA directly.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage;