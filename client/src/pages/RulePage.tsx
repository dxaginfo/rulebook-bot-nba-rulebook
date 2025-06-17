import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Chip,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GavelIcon from '@mui/icons-material/Gavel';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';

const RulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, getRuleById } = useRule();
  
  const [rule, setRule] = useState<Rule | null>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const loadRule = async () => {
      try {
        const ruleData = await getRuleById(id);
        setRule(ruleData);
      } catch (err) {
        console.error('Error loading rule:', err);
      }
    };
    
    loadRule();
  }, [id, getRuleById]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }
  
  if (!rule) {
    return (
      <Container maxWidth="md">
        <Alert severity="info" sx={{ mt: 4 }}>
          Rule not found. The requested rule may have been moved or deleted.
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer' }}
        >
          Rules
        </Link>
        <Typography color="text.primary">{rule.title}</Typography>
      </Breadcrumbs>
      
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back
      </Button>
      
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          border: '1px solid', 
          borderColor: 'divider'
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" component="h1">
              {rule.title}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            <Chip 
              label={rule.section} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={rule.category} 
              size="small" 
              color="secondary" 
              variant="outlined" 
            />
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Rule Content */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" paragraph>
            {rule.content}
          </Typography>
        </Box>
        
        {/* Examples */}
        {rule.examples && rule.examples.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Examples
            </Typography>
            
            <List>
              {rule.examples.map((example, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={example} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        <Divider sx={{ my: 3 }} />
        
        {/* Reference */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuBookIcon sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Reference: Official NBA Rulebook, {rule.section}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RulePage;