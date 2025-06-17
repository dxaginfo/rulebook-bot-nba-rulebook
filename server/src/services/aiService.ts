import { v4 as uuidv4 } from 'uuid';
import { Message, ChatResponse } from '../types/chat';
import ruleService from './ruleService';

/**
 * Service for AI-related functionality
 */
const aiService = {
  /**
   * Generate a response based on the user's message
   * @param message User message
   * @param chatHistory Chat history
   * @returns AI response
   */
  generateResponse: async (message: string, chatHistory: Message[]): Promise<ChatResponse> => {
    try {
      // Simple keyword-based search to find relevant rules
      // In a real application, this would use a more sophisticated NLP approach
      const searchTerms = [
        'travel', 'traveling', 'steps',
        'shot clock', 'time', 'seconds',
        'goaltend', 'goaltending', 'interference',
        'court', 'dimensions', 'size',
        'foul', 'penalty', 'violation'
      ];
      
      // Find matching terms
      const matchingTerms = searchTerms.filter(term => 
        message.toLowerCase().includes(term.toLowerCase())
      );
      
      let responseMessage = '';
      const citations: string[] = [];
      
      if (matchingTerms.length > 0) {
        // Search for rules based on the matching terms
        const searchResults = await ruleService.searchRules(matchingTerms.join(' '));
        
        if (searchResults.length > 0) {
          // Get the most relevant rule
          const rule = searchResults[0];
          
          // Build response
          responseMessage = `${rule.title}: ${rule.content}`;
          
          // Add examples if available
          if (rule.examples && rule.examples.length > 0) {
            responseMessage += '\n\nExamples:\n';
            rule.examples.forEach(example => {
              responseMessage += `- ${example}\n`;
            });
          }
          
          // Add citation
          citations.push(`${rule.section} - ${rule.title}`);
        } else {
          responseMessage = "I couldn't find specific information about that in the NBA rulebook. Could you please rephrase your question or ask about a different rule?";
        }
      } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        // Simple greeting response
        responseMessage = "Hello! I'm RuleBook Bot, your NBA rulebook assistant. How can I help you understand NBA rules today?";
      } else if (message.toLowerCase().includes('thank')) {
        // Thank you response
        responseMessage = "You're welcome! If you have any more questions about NBA rules, feel free to ask.";
      } else if (message.toLowerCase().includes('help')) {
        // Help response
        responseMessage = "I can help you understand NBA rules and regulations. Try asking questions like:\n\n- What is a traveling violation?\n- How does the shot clock work?\n- What are the dimensions of an NBA court?\n- What is goaltending?\n- How many personal fouls are players allowed?";
      } else {
        // Generic response when no matches found
        responseMessage = "I'm not sure about that specific rule. You can ask me about common NBA rules like traveling, shot clock, goaltending, court dimensions, or fouls.";
      }
      
      return {
        id: uuidv4(),
        message: responseMessage,
        citations
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
};

export default aiService;