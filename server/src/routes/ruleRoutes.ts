import express from 'express';
import ruleService from '../services/ruleService';

const router = express.Router();

// GET - Get rule by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rule = await ruleService.getRuleById(id);
    
    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }
    
    res.json(rule);
  } catch (error) {
    console.error('Error getting rule by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Search rules
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const results = await ruleService.searchRules(q);
    res.json({ results });
  } catch (error) {
    console.error('Error searching rules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get all rule categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await ruleService.getCategories();
    res.json({ categories });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET - Get rules by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const rules = await ruleService.getRulesByCategory(category);
    res.json({ rules });
  } catch (error) {
    console.error('Error getting rules by category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;