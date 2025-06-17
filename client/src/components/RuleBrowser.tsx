import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Chip,
  IconButton,
  Collapse
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';

const RuleBrowser: React.FC = () => {
  const { loading, searchRules, getCategories, getRulesByCategory } = useRule();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryRules, setCategoryRules] = useState<{[key: string]: Rule[]}>({});
  const [searchResults, setSearchResults] = useState<Rule[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
      
      // Load rules for first category by default
      if (cats.length > 0) {
        const rules = await getRulesByCategory(cats[0]);
        setCategoryRules({ [cats[0]]: rules });
        setExpandedCategory(cats[0]);
      }
    };
    
    loadCategories();
  }, [getCategories, getRulesByCategory]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    
    // Clear search results when switching to browse
    if (newValue === 0) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };
  
  // Handle search
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    
    const results = await searchRules(searchQuery);
    setSearchResults(results);
    setTabValue(1); // Switch to search results tab
  };
  
  // Handle category expansion
  const toggleCategory = async (category: string) => {
    // If already expanded, collapse it
    if (expandedCategory === category) {
      setExpandedCategory(null);
      return;
    }
    
    // If category rules not loaded yet, load them
    if (!categoryRules[category]) {
      const rules = await getRulesByCategory(category);
      setCategoryRules(prev => ({ ...prev, [category]: rules }));
    }
    
    setExpandedCategory(category);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6">NBA Rules</Typography>
        
        {/* Search form */}
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="rule browser tabs">
          <Tab label="Browse" />
          <Tab label="Search Results" disabled={searchResults.length === 0} />
        </Tabs>
      </Box>
      
      {/* Tab Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        {tabValue === 0 ? (
          // Browse by category
          <List disablePadding>
            {categories.map((category) => (
              <React.Fragment key={category}>
                <ListItem 
                  button 
                  onClick={() => toggleCategory(category)}
                >
                  <ListItemText primary={category} />
                  {expandedCategory === category ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                
                <Collapse in={expandedCategory === category} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {loading && expandedCategory === category && !categoryRules[category] ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <CircularProgress size={24} />
                      </Box>
                    ) : (
                      categoryRules[category]?.map((rule) => (
                        <ListItem 
                          key={rule.id} 
                          button 
                          component={RouterLink}
                          to={`/rule/${rule.id}`}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText 
                            primary={rule.title} 
                            secondary={rule.section}
                          />
                        </ListItem>
                      ))
                    )}
                  </List>
                </Collapse>
                
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          // Search results
          <List disablePadding>
            {searchResults.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No results found for "{searchQuery}"
                </Typography>
              </Box>
            ) : (
              searchResults.map((rule) => (
                <React.Fragment key={rule.id}>
                  <ListItem 
                    button 
                    component={RouterLink}
                    to={`/rule/${rule.id}`}
                  >
                    <ListItemText 
                      primary={rule.title} 
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" component="span">
                            {rule.section}
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            <Chip 
                              label={rule.category} 
                              size="small" 
                              variant="outlined"
                              sx={{ mr: 1, mt: 0.5 }} 
                            />
                          </Box>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default RuleBrowser;