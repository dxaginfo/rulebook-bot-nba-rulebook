import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, ChatMessageModel } from '../models/chat';
import ruleService from './ruleService';
import llmService from './llmService';
import logger from '../utils/logger';

/**
 * Service for handling chat functionality
 */
class ChatService {
  /**
   * Process a user message and generate a response
   * @param content User's message content
   * @returns Generated response with citations
   */
  async processMessage(content: string, userId: string = 'anonymous'): Promise<{
    id: string;
    message: string;
    citations: string[];
  }> {
    try {
      // Save the user message
      const userMessageId = await this.saveMessage({
        content,
        role: 'user',
        userId
      });

      // Find relevant rules for the query
      const relevantRuleIds = await ruleService.findRelevantRules(content);
      
      // Get the full rule details
      const relevantRules = await Promise.all(
        relevantRuleIds.map(id => ruleService.getRuleById(id))
      );
      
      // Format rules for the LLM context
      const rulesContext = relevantRules.map(rule => 
        `Rule ${rule.id}: ${rule.title}\n${rule.content}`
      ).join('\n\n');
      
      // Generate a response using the LLM
      const { response, citedRuleIds } = await llmService.generateResponse(
        content, 
        rulesContext,
        relevantRuleIds
      );
      
      // Save the bot's response
      const botMessageId = await this.saveMessage({
        content: response,
        role: 'bot',
        userId,
        citations: citedRuleIds
      });
      
      return {
        id: botMessageId,
        message: response,
        citations: citedRuleIds
      };
    } catch (error) {
      logger.error('Error processing message:', error);
      throw new Error('Failed to process message');
    }
  }

  /**
   * Save a message to the database
   * @param messageData Message data to save
   * @returns ID of the saved message
   */
  async saveMessage(messageData: {
    content: string;
    role: 'user' | 'bot';
    userId: string;
    citations?: string[];
  }): Promise<string> {
    try {
      const messageId = uuidv4();
      
      const message = new ChatMessageModel({
        id: messageId,
        content: messageData.content,
        role: messageData.role,
        userId: messageData.userId,
        citations: messageData.citations || [],
        timestamp: new Date()
      });
      
      await message.save();
      return messageId;
    } catch (error) {
      logger.error('Error saving message:', error);
      throw new Error('Failed to save message');
    }
  }

  /**
   * Fetch chat history for a user
   * @param userId User identifier
   * @param limit Maximum number of messages to retrieve
   * @returns Array of chat messages
   */
  async getChatHistory(userId: string, limit: number = 20): Promise<ChatMessage[]> {
    try {
      const messages = await ChatMessageModel
        .find({ userId })
        .sort({ timestamp: -1 })
        .limit(limit);
      
      return messages.reverse();
    } catch (error) {
      logger.error('Error fetching chat history:', error);
      throw new Error('Failed to fetch chat history');
    }
  }

  /**
   * Clear chat history for a user
   * @param userId User identifier
   * @returns Success status
   */
  async clearChatHistory(userId: string): Promise<boolean> {
    try {
      await ChatMessageModel.deleteMany({ userId });
      return true;
    } catch (error) {
      logger.error('Error clearing chat history:', error);
      throw new Error('Failed to clear chat history');
    }
  }
}

export default new ChatService();