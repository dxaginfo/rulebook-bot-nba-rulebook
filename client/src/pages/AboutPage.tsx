import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SchoolIcon from '@mui/icons-material/School';

const AboutPage: React.FC = () => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          About RuleBook Bot
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Your AI assistant for NBA basketball rules and regulations
        </Typography>
      </Box>
      
      <Paper elevation={1} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Our Mission
        </Typography>
        <Typography paragraph>
          RuleBook Bot was created to make the complex NBA rulebook more accessible to basketball fans, players, coaches, and officials. Our AI-powered assistant breaks down the rules into easy-to-understand explanations and provides quick answers to your basketball rule questions.
        </Typography>
        <Typography paragraph>
          Whether you're a casual fan wondering about a call you saw during a game, a player looking to understand the nuances of the rules, or a referee studying the regulations, RuleBook Bot is designed to help you navigate the official NBA rulebook with ease.
        </Typography>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Key Features
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', p: 2, bgcolor: 'primary.main' }}>
                <Avatar sx={{ bgcolor: '#fff', color: 'primary.main' }}>
                  <SportsBasketballIcon />
                </Avatar>
                <Box sx={{ ml: 2, color: '#fff' }}>
                  <Typography variant="h6">
                    Comprehensive Rule Coverage
                  </Typography>
                </Box>
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  RuleBook Bot covers all aspects of the NBA rulebook including violations, fouls, timing, scoring, and court dimensions. Our database includes official rule definitions, examples, and interpretations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', p: 2, bgcolor: 'secondary.main' }}>
                <Avatar sx={{ bgcolor: '#fff', color: 'secondary.main' }}>
                  <AutoGraphIcon />
                </Avatar>
                <Box sx={{ ml: 2, color: '#fff' }}>
                  <Typography variant="h6">
                    Natural Language Interface
                  </Typography>
                </Box>
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Ask questions in plain English and get clear, relevant answers. Our AI understands basketball terminology and can interpret your questions to provide the most helpful responses about NBA rules.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', p: 2, bgcolor: 'success.main' }}>
                <Avatar sx={{ bgcolor: '#fff', color: 'success.main' }}>
                  <SchoolIcon />
                </Avatar>
                <Box sx={{ ml: 2, color: '#fff' }}>
                  <Typography variant="h6">
                    Educational Resources
                  </Typography>
                </Box>
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Beyond just answering questions, RuleBook Bot provides explanations and examples to help you understand the reasoning behind the rules and how they're applied in game situations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', p: 2, bgcolor: 'info.main' }}>
                <Avatar sx={{ bgcolor: '#fff', color: 'info.main' }}>
                  <CodeIcon />
                </Avatar>
                <Box sx={{ ml: 2, color: '#fff' }}>
                  <Typography variant="h6">
                    Rule Browser
                  </Typography>
                </Box>
              </Box>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  In addition to the chat interface, you can browse the rulebook by category, search for specific terms, and explore related rules to deepen your understanding of basketball regulations.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Disclaimer
        </Typography>
        <Typography paragraph color="text.secondary">
          RuleBook Bot is an unofficial educational tool and is not affiliated with or endorsed by the National Basketball Association (NBA). While we strive for accuracy, the official NBA rulebook should be considered the definitive source for official rules and interpretations.
        </Typography>
        <Typography paragraph color="text.secondary">
          For official rule information, please visit the <a href="https://official.nba.com/rulebook/" target="_blank" rel="noopener noreferrer">NBA Official Rulebook website</a>.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage;