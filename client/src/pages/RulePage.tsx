import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Paper, Breadcrumbs, Link, Chip, Divider, List, ListItem, ListItemText, Alert } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';

const RulePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getRuleById, loading, error } = useRule();
  const [rule, setRule] = useState<Rule | null>(null);
  const [relatedRules, setRelatedRules] = useState<Rule[]>([]);
  
  useEffect(() => {
    const fetchRule = async () => {
      if (id) {
        const ruleData = await getRuleById(id);
        setRule(ruleData);
      }
    };
    
    fetchRule();
  }, [id, getRuleById]);
  
  return (
    <Box sx={{ mb: 4 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
        sx={{ mb: 3 }}
      >
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Link component={RouterLink} to="/#rules" color="inherit">
          Rules
        </Link>
        {rule && (
          <Typography color="text.primary">{rule.title}</Typography>
        )}
      </Breadcrumbs>
      
      {loading && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography>Loading rule information...</Typography>
        </Box>
      )}
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {!loading && rule && (
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
              {rule.title}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip label={rule.category} color="primary" variant="outlined" />
              <Chip label={rule.section} size="small" />
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body1" paragraph>
              {rule.content}
            </Typography>
            
            {rule.examples && rule.examples.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Examples
                </Typography>
                <List disablePadding>
                  {rule.examples.map((example, index) => (
                    <ListItem key={index} disablePadding sx={{ py: 1 }}>
                      <ListItemText 
                        primary={example} 
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { fontStyle: 'italic' }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
          
          {relatedRules.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Related Rules
              </Typography>
              <List disablePadding>
                {relatedRules.map((relatedRule) => (
                  <ListItem 
                    key={relatedRule.id} 
                    disablePadding 
                    sx={{ py: 1 }}
                    component={RouterLink}
                    to={`/rule/${relatedRule.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListItemText 
                      primary={relatedRule.title} 
                      secondary={relatedRule.category}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      )}
      
      {!loading && !rule && !error && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Rule not found. <Link component={RouterLink} to="/">Return to home page</Link>
        </Alert>
      )}
    </Box>
  );
};

export default RulePage;