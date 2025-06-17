import { Rule, RuleExample } from '../models/rule';
import { RuleModel, RuleExampleModel } from '../models/rule';
import logger from '../utils/logger';

/**
 * Service for handling NBA rule data and retrieval
 */
export class RuleService {
  /**
   * Fetch all rules
   * @returns Array of all rules
   */
  async getAllRules(): Promise<Rule[]> {
    try {
      return await RuleModel.find().sort({ id: 1 });
    } catch (error) {
      logger.error('Failed to get all rules:', error);
      throw new Error('Failed to retrieve rules');
    }
  }

  /**
   * Get a specific rule by ID
   * @param id Rule ID
   * @returns Rule if found
   */
  async getRuleById(id: string): Promise<Rule> {
    try {
      const rule = await RuleModel.findOne({ id });
      if (!rule) {
        throw new Error(`Rule with ID ${id} not found`);
      }
      return rule;
    } catch (error) {
      logger.error(`Failed to get rule with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Search for rules by query
   * @param query Search query
   * @returns Array of matching rules
   */
  async searchRules(query: string): Promise<Rule[]> {
    try {
      // Perform a simple text search across title and content
      // This could be enhanced with more sophisticated search techniques
      const rules = await RuleModel.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { content: { $regex: query, $options: 'i' } }
        ]
      }).limit(10);
      
      return rules;
    } catch (error) {
      logger.error(`Failed to search rules with query ${query}:`, error);
      throw new Error('Failed to search rules');
    }
  }

  /**
   * Get examples for a specific rule
   * @param ruleId Rule ID
   * @returns Array of examples
   */
  async getRuleExamples(ruleId: string): Promise<RuleExample[]> {
    try {
      return await RuleExampleModel.find({ ruleId });
    } catch (error) {
      logger.error(`Failed to get examples for rule ${ruleId}:`, error);
      throw new Error('Failed to retrieve rule examples');
    }
  }

  /**
   * Find relevant rules for a given query using semantic search
   * @param query The user's question
   * @returns Array of relevant rule IDs
   */
  async findRelevantRules(query: string): Promise<string[]> {
    try {
      // This is a placeholder for semantic search
      // In a production implementation, this would use embeddings and vector search
      
      // For now, we'll use a keyword-based approach
      const keywords = this.extractKeywords(query.toLowerCase());
      
      // Find rules that contain these keywords
      const rules = await RuleModel.find({
        $or: [
          { title: { $regex: keywords.join('|'), $options: 'i' } },
          { content: { $regex: keywords.join('|'), $options: 'i' } }
        ]
      }).limit(5);
      
      return rules.map(rule => rule.id);
    } catch (error) {
      logger.error(`Failed to find relevant rules for query ${query}:`, error);
      throw new Error('Failed to find relevant rules');
    }
  }

  /**
   * Simple keyword extraction from query
   * @param query User's question
   * @returns Array of extracted keywords
   */
  private extractKeywords(query: string): string[] {
    // Remove common words and punctuation
    const stopWords = [
      'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
      'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'of',
      'what', 'when', 'where', 'why', 'how', 'who', 'which', 'do', 'does',
      'did', 'has', 'have', 'had', 'can', 'could', 'should', 'would', 'will'
    ];
    
    // Clean the query and extract words
    const cleanedQuery = query
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    
    const words = cleanedQuery.split(' ');
    
    // Filter out stop words and get unique keywords
    return [...new Set(
      words.filter(word => !stopWords.includes(word) && word.length > 2)
    )];
  }
}

export default new RuleService();