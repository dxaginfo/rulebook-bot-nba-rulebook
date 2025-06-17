import { Request, Response } from 'express';
import ruleService from '../services/ruleService';

const ruleController = {
  /**
   * Get a rule by ID
   */
  getRuleById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ message: 'Rule ID is required' });
      }
      
      const rule = await ruleService.getRuleById(id);
      
      if (!rule) {
        return res.status(404).json({ message: 'Rule not found' });
      }
      
      return res.status(200).json(rule);
    } catch (error) {
      console.error('Error getting rule:', error);
      return res.status(500).json({ message: 'Failed to get rule' });
    }
  },
  
  /**
   * Search for rules by query
   */
  searchRules: async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }
      
      const rules = await ruleService.searchRules(query);
      
      return res.status(200).json({ results: rules });
    } catch (error) {
      console.error('Error searching rules:', error);
      return res.status(500).json({ message: 'Failed to search rules' });
    }
  },
  
  /**
   * Get all rule categories
   */
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await ruleService.getCategories();
      
      return res.status(200).json({ categories });
    } catch (error) {
      console.error('Error getting categories:', error);
      return res.status(500).json({ message: 'Failed to get categories' });
    }
  },
  
  /**
   * Get rules by category
   */
  getRulesByCategory: async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      
      if (!category) {
        return res.status(400).json({ message: 'Category is required' });
      }
      
      const rules = await ruleService.getRulesByCategory(category);
      
      return res.status(200).json({ rules });
    } catch (error) {
      console.error('Error getting rules by category:', error);
      return res.status(500).json({ message: 'Failed to get rules by category' });
    }
  }
};

export default ruleController;