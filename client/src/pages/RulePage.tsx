import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';

const RulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRuleById, loading } = useRule();
  const [rule, setRule] = useState<Rule | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRule = async () => {
      try {
        if (id) {
          const ruleData = await getRuleById(id);
          if (ruleData) {
            setRule(ruleData);
          } else {
            setError('Rule not found');
          }
        }
      } catch (err) {
        setError('Failed to load rule');
      }
    };
    
    fetchRule();
  }, [id, getRuleById]);
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to="/"
        >
          Return to Home
        </Button>
      </Box>
    );
  }
  
  if (!rule) {
    return null;
  }
  
  return (
    <Box>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBackIcon />}
        component={RouterLink}
        to="/"
        sx={{ mb: 3 }}
      >
        Back to Chat
      </Button>
      
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {rule.title}
          </Typography>
          
          <Chip 
            label={rule.category} 
            color="primary" 
            variant="outlined"
            sx={{ mr: 1 }} 
          />
          
          <Chip 
            label={rule.section} 
            color="secondary" 
            variant="outlined" 
          />
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography variant="body1" paragraph>
          {rule.content}
        </Typography>
        
        {rule.examples && rule.examples.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Examples
            </Typography>
            
            <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
              {rule.examples.map((example, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={example} />
                  </ListItem>
                  {index < rule.examples!.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RulePage;