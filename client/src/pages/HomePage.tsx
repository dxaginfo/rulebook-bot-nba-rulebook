import React, { useState } from 'react';
import { Grid, Box, Typography, Paper, Tab, Tabs, Divider } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChatInterface from '../components/ChatInterface';
import RuleBrowser from '../components/RuleBrowser';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          NBA RuleBook Assistant
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Ask questions about NBA rules or browse the official rulebook for basketball regulations, violations, and procedures.
        </Typography>
      </Box>
      
      <Paper elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          aria-label="Navigation Tabs"
        >
          <Tab 
            icon={<ChatIcon />} 
            label="Chat Assistant" 
            id="tab-0" 
            aria-controls="tabpanel-0" 
          />
          <Tab 
            icon={<MenuBookIcon />} 
            label="Rule Browser" 
            id="tab-1" 
            aria-controls="tabpanel-1" 
          />
        </Tabs>
        
        <Divider />
        
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ height: { xs: '70vh', sm: '75vh' } }}>
              <ChatInterface />
            </Box>
          </TabPanel>
          
          <TabPanel value={activeTab} index={1}>
            <Box sx={{ height: { xs: '70vh', sm: '75vh' } }}>
              <RuleBrowser />
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

export default HomePage;