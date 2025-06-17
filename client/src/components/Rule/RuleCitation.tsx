import React, { useState } from 'react';
import { 
  Chip, 
  Popover, 
  Card, 
  CardContent, 
  Typography,
  Box,
  Link,
  CircularProgress
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { fetchRuleById } from '../../services/api';

interface RuleCitationProps {
  ruleId: string;
}

interface Rule {
  id: string;
  title: string;
  content: string;
  parentId?: string;
}

/**
 * Component to display a clickable rule citation that shows rule details in a popover
 */
const RuleCitation: React.FC<RuleCitationProps> = ({ ruleId }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [rule, setRule] = useState<Rule | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle clicking on the citation chip
   */
  const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);

    if (!rule && !loading) {
      try {
        setLoading(true);
        setError(null);
        
        const ruleData = await fetchRuleById(ruleId);
        setRule(ruleData);
      } catch (err) {
        console.error('Failed to fetch rule:', err);
        setError('Failed to load rule details');
      } finally {
        setLoading(false);
      }
    }
  };

  /**
   * Handle closing the popover
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? `rule-popover-${ruleId}` : undefined;

  return (
    <>
      <Chip
        icon={<LibraryBooksIcon />}
        label={ruleId}
        onClick={handleClick}
        color="primary"
        variant="outlined"
        size="small"
        sx={{ cursor: 'pointer' }}
      />
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card sx={{ maxWidth: 400, maxHeight: 300, overflow: 'auto' }}>
          <CardContent>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : rule ? (
              <>
                <Typography variant="h6" gutterBottom>
                  {rule.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {rule.content}
                </Typography>
                <Link
                  component={RouterLink}
                  to={`/rules/${rule.id}`}
                  onClick={handleClose}
                  underline="hover"
                >
                  View full rule
                </Link>
              </>
            ) : (
              <Typography>No rule data available</Typography>
            )}
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default RuleCitation;