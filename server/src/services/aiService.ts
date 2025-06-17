import { v4 as uuidv4 } from 'uuid';
import { Message, ChatResponse } from '../types/chat';
import ruleService from './ruleService';

/**
 * AI Service to handle chat interactions and responses
 * In a real application, this would integrate with an actual AI service like OpenAI
 */
const aiService = {
  /**
   * Generate a response based on user input
   * @param userInput User's message content
   * @param chatHistory Previous messages in the conversation
   * @returns AI-generated response
   */
  generateResponse: async (userInput: string, chatHistory: Message[]): Promise<ChatResponse> => {
    try {
      // Simplified rule-matching logic
      // In a real app, this would use more sophisticated NLP and may call an external AI API
      const lowercaseInput = userInput.toLowerCase();
      
      // Search for rules that might match the query
      const relatedRules = await ruleService.searchRules(lowercaseInput);
      
      let response: string;
      let citations: string[] = [];
      
      if (relatedRules.length > 0) {
        // Use the most relevant rule as the response
        const mainRule = relatedRules[0];
        response = mainRule.content;
        citations = [`${mainRule.section} - ${mainRule.category} - ${mainRule.title}`];
        
        // If there are more relevant rules, add their citations
        if (relatedRules.length > 1) {
          for (let i = 1; i < Math.min(relatedRules.length, 3); i++) {
            const rule = relatedRules[i];
            citations.push(`${rule.section} - ${rule.category} - ${rule.title}`);
          }
        }
      } else {
        // If no relevant rules found
        response = "I'm sorry, I couldn't find specific information about that in the NBA rulebook. Please try rephrasing your question or ask about a different aspect of the rules.";
      }
      
      return {
        id: uuidv4(),
        message: response,
        citations
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
};

export default aiService;