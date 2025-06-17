import axios from 'axios';
import { Rule } from '../types/rule';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Service for interacting with rule-related API endpoints
 */
class RuleService {
  /**
   * Get a specific rule by ID
   * @param id Rule identifier
   * @returns Promise with rule data
   */
  async getRuleById(id: string): Promise<Rule> {
    try {
      const response = await axios.get(`${API_URL}/api/rules/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching rule ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search for rules by query
   * @param query Search query
   * @returns Promise with array of matching rules
   */
  async searchRules(query: string): Promise<Rule[]> {
    try {
      const response = await axios.get(`${API_URL}/api/rules/search`, {
        params: { q: query }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching rules:', error);
      throw error;
    }
  }

  /**
   * Get all categories/sections of rules
   * @returns Promise with array of category names
   */
  async getCategories(): Promise<string[]> {
    try {
      const response = await axios.get(`${API_URL}/api/rules/categories`);
      return response.data.categories;
    } catch (error) {
      console.error('Error fetching rule categories:', error);
      throw error;
    }
  }

  /**
   * Get all rules in a specific category
   * @param category Category name
   * @returns Promise with array of rules in the category
   */
  async getRulesByCategory(category: string): Promise<Rule[]> {
    try {
      const response = await axios.get(`${API_URL}/api/rules/category/${encodeURIComponent(category)}`);
      return response.data.rules;
    } catch (error) {
      console.error(`Error fetching rules for category ${category}:`, error);
      throw error;
    }
  }
}

export default new RuleService();