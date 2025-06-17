import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRule } from '../contexts/RuleContext';
import { Rule } from '../types/rule';

const RuleBrowser: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, getCategories, getRulesByCategory, searchRules } = useRule();
  
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Rule[]>([]);
  const [tabValue, setTabValue] = useState(0);
  
  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);
        
        // Select the first category by default
        if (categoryList.length > 0) {
          setSelectedCategory(categoryList[0]);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    
    loadCategories();
  }, [getCategories]);
  
  // Load rules when a category is selected
  useEffect(() => {
    if (!selectedCategory) return;
    
    const loadRules = async () => {
      try {
        const rulesList = await getRulesByCategory(selectedCategory);
        setRules(rulesList);
      } catch (err) {
        console.error('Error loading rules for category:', err);
      }
    };
    
    loadRules();
  }, [selectedCategory, getRulesByCategory]);
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Handle rule selection
  const handleRuleSelect = (rule: Rule) => {
    navigate(`/rule/${rule.id}`);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle search submit
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const results = await searchRules(searchQuery);
      setSearchResults(results);
      setTabValue(1); // Switch to search results tab
    } catch (err) {
      console.error('Error searching rules:', err);
    }
  };
  
  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setTabValue(0); // Switch back to categories tab
  };
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>
          NBA Rulebook
        </Typography>
        
        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search rules..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery ? (
                  <IconButton 
                    edge="end" 
                    onClick={handleClearSearch}
                    aria-label="clear search"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <IconButton 
                    edge="end" 
                    onClick={handleSearch}
                    aria-label="search"
                    size="small"
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          aria-label="rulebook tabs"
          variant="fullWidth"
        >
          <Tab label="Categories" />
          <Tab 
            label="Search Results" 
            disabled={searchResults.length === 0}
          />
        </Tabs>
      </Box>
      
      {/* Content Area */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {/* Loading State */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}
        
        {/* Error State */}
        {error && (
          <Box sx={{ p: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        
        {/* Categories Tab Panel */}
        {tabValue === 0 && !loading && !error && (
          <Box sx={{ display: 'flex', height: '100%' }}>
            {/* Categories List */}
            <Box 
              sx={{ 
                width: '40%', 
                borderRight: '1px solid', 
                borderColor: 'divider',
                overflow: 'auto'
              }}
            >
              <List disablePadding>
                {categories.map((category) => (
                  <ListItem 
                    key={category} 
                    disablePadding 
                    divider
                  >
                    <ListItemButton 
                      selected={selectedCategory === category}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <ListItemText primary={category} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
            
            {/* Rules List */}
            <Box sx={{ width: '60%', overflow: 'auto' }}>
              <List disablePadding>
                {rules.map((rule) => (
                  <ListItem 
                    key={rule.id} 
                    disablePadding 
                    divider
                  >
                    <ListItemButton onClick={() => handleRuleSelect(rule)}>
                      <ListItemText 
                        primary={rule.title} 
                        secondary={rule.section}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
        
        {/* Search Results Tab Panel */}
        {tabValue === 1 && !loading && !error && (
          <List disablePadding>
            {searchResults.length === 0 ? (
              <ListItem>
                <ListItemText 
                  primary="No results found" 
                  secondary="Try a different search term"
                />
              </ListItem>
            ) : (
              searchResults.map((rule) => (
                <ListItem 
                  key={rule.id} 
                  disablePadding 
                  divider
                >
                  <ListItemButton onClick={() => handleRuleSelect(rule)}>
                    <ListItemText 
                      primary={rule.title} 
                      secondary={`${rule.category} - ${rule.section}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default RuleBrowser;