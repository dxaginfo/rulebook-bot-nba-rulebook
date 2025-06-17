import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Button
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LensIcon from '@mui/icons-material/Lens';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';
import NotFoundPage from './NotFoundPage';

const RulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, getRuleById } = useRule();
  
  const [rule, setRule] = useState<Rule | null>(null);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    const fetchRule = async () => {
      if (!id) {
        setNotFound(true);
        return;
      }
      
      const ruleData = await getRuleById(id);
      
      if (!ruleData) {
        setNotFound(true);
      } else {
        setRule(ruleData);
        setNotFound(false);
      }
    };
    
    fetchRule();
  }, [id, getRuleById]);
  
  if (notFound) {
    return <NotFoundPage />;
  }
  
  if (loading || !rule) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Link component={RouterLink} to="/" color="inherit">
          Rules
        </Link>
        <Typography color="text.primary">{rule.title}</Typography>
      </Breadcrumbs>
      
      {/* Back button */}
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Rules
      </Button>
      
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {rule.title}
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Chip label={rule.category} color="primary" variant="outlined" />
            <Chip label={rule.section} variant="outlined" />
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Content */}
        <Typography variant="body1" paragraph>
          {rule.content}
        </Typography>
        
        {/* Examples */}
        {rule.examples && rule.examples.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Examples
            </Typography>
            
            <List disablePadding>
              {rule.examples.map((example, index) => (
                <ListItem key={index} alignItems="flex-start" sx={{ pl: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <LensIcon sx={{ fontSize: 10, color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText primary={example} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        
        {/* Info box */}
        <Box 
          sx={{ 
            mt: 4, 
            p: 2, 
            bgcolor: 'info.light', 
            color: 'info.contrastText',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'flex-start'
          }}
        >
          <InfoOutlinedIcon sx={{ mr: 1 }} />
          <Typography variant="body2">
            This is an educational interpretation of the rule. For the official NBA rulebook, please visit the 
            <Link 
              href="https://official.nba.com/rulebook/" 
              target="_blank" 
              rel="noopener"
              sx={{ ml: 0.5 }}
            >
              NBA Official Rulebook
            </Link>.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RulePage;