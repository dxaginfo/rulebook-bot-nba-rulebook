import { Rule } from '../types/rule';
import rulesData from '../data/rules';

/**
 * Service for rule-related functionality
 */
const ruleService = {
  /**
   * Get a rule by ID
   * @param id Rule ID
   * @returns Rule object or null if not found
   */
  getRuleById: async (id: string): Promise<Rule | null> => {
    try {
      const rule = rulesData.find(rule => rule.id === id);
      return rule || null;
    } catch (error) {
      console.error('Error getting rule by ID:', error);
      throw error;
    }
  },
  
  /**
   * Search for rules by query
   * @param query Search query
   * @returns Array of matching rules
   */
  searchRules: async (query: string): Promise<Rule[]> => {
    try {
      // Simple search implementation
      // In a real application, this would use a more sophisticated search algorithm
      const searchTerms = query.toLowerCase().split(' ');
      
      const results = rulesData.filter(rule => {
        const ruleText = `${rule.title} ${rule.content} ${rule.category} ${rule.section}`.toLowerCase();
        return searchTerms.some(term => ruleText.includes(term));
      });
      
      return results;
    } catch (error) {
      console.error('Error searching rules:', error);
      throw error;
    }
  },
  
  /**
   * Get all rule categories
   * @returns Array of category names
   */
  getCategories: async (): Promise<string[]> => {
    try {
      // Extract unique categories
      const categories = [...new Set(rulesData.map(rule => rule.category))];
      return categories;
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },
  
  /**
   * Get rules by category
   * @param category Category name
   * @returns Array of rules in the category
   */
  getRulesByCategory: async (category: string): Promise<Rule[]> => {
    try {
      const results = rulesData.filter(rule => 
        rule.category.toLowerCase() === category.toLowerCase()
      );
      return results;
    } catch (error) {
      console.error('Error getting rules by category:', error);
      throw error;
    }
  }
};

export default ruleService;