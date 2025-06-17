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
  Chip,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';

const RuleBrowser: React.FC = () => {
  const { searchRules, getCategories, getRulesByCategory, loading, error } = useRule();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Load categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    
    fetchCategories();
  }, [getCategories]);
  
  // Handle category change
  useEffect(() => {
    const fetchRulesByCategory = async () => {
      if (selectedCategory) {
        const rulesData = await getRulesByCategory(selectedCategory);
        setRules(rulesData);
      }
    };
    
    fetchRulesByCategory();
  }, [selectedCategory, getRulesByCategory]);
  
  // Handle search query changes with debounce
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    
    // Set new timeout for search
    if (query.trim().length > 2) {
      const timeout = setTimeout(() => {
        performSearch(query);
      }, 500);
      
      setSearchTimeout(timeout);
    } else if (query.trim().length === 0 && selectedCategory) {
      // Revert to category-based rules if search is cleared
      getRulesByCategory(selectedCategory).then(rulesData => setRules(rulesData));
    } else if (query.trim().length === 0) {
      // Clear rules if no search and no category
      setRules([]);
    }
  };
  
  // Perform search
  const performSearch = async (query: string) => {
    if (query.trim().length > 2) {
      const searchResults = await searchRules(query);
      setRules(searchResults);
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
  };
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          NBA Rule Browser
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search rules..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: loading && (
                  <InputAdornment position="end">
                    <CircularProgress size={20} />
                  </InputAdornment>
                )
              }}
              sx={{ mb: { xs: 2, md: 0 } }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Filter by Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Filter by Category"
              >
                <MenuItem value="">
                  <em>All Categories</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
        {error && (
          <Box sx={{ p: 2, color: 'error.main' }}>
            {error}
          </Box>
        )}
        
        {!loading && rules.length === 0 && !error && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <InfoIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 2 }} />
            <Typography color="text.secondary">
              {searchQuery.trim().length > 0 
                ? 'No rules match your search. Try different keywords.'
                : selectedCategory 
                  ? 'No rules found in this category.'
                  : 'Select a category or search for rules to begin.'}
            </Typography>
          </Box>
        )}
        
        <List disablePadding>
          {rules.map((rule) => (
            <React.Fragment key={rule.id}>
              <ListItem 
                alignItems="flex-start" 
                sx={{ 
                  py: 2,
                  px: 3,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
                component={RouterLink}
                to={`/rule/${rule.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 1
                  }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {rule.title}
                    </Typography>
                    
                    {!isMobile && (
                      <IconButton size="small" color="primary">
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Chip 
                      label={rule.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                    <Chip 
                      label={rule.section} 
                      size="small" 
                      color="default" 
                    />
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {rule.content}
                  </Typography>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RuleBrowser;