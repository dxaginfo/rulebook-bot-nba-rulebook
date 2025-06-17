import { RuleService } from '../rule/rule.service';
import { ChatMessageModel, IChatMessage } from '../../models/chat.model';

interface ChatResponse {
  message: string;
  citations: string[];
}

export class ChatService {
  private ruleService: RuleService;

  constructor() {
    this.ruleService = new RuleService();
  }

  /**
   * Process a user message and generate a response
   * @param userId User identifier
   * @param message User's message text
   * @returns Response with message text and rule citations
   */
  async processMessage(userId: string, message: string): Promise<ChatResponse> {
    try {
      console.log(`Processing message from user ${userId}: ${message}`);
      
      // Save user message to database
      await this.saveMessage(userId, 'user', message);
      
      // Generate response using LLM
      const response = await this.generateResponse(message);
      
      // Save bot response to database
      await this.saveMessage(userId, 'bot', response.message);
      
      return response;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  }

  /**
   * Generate a response to the user's message using the LLM
   * @param message User's message
   * @returns Generated response with message text and rule citations
   */
  private async generateResponse(message: string): Promise<ChatResponse> {
    // Find relevant rules
    const relevantRules = await this.ruleService.findRulesByQuery(message);
    
    // In a real implementation, this would call the LLM API
    // For now, we'll simulate the response
    
    if (relevantRules.length === 0) {
      return {
        message: "I don't have specific information about that in the NBA rulebook. Could you rephrase your question or ask about a different rule?",
        citations: []
      };
    }
    
    // Use the most relevant rule to generate a response
    const primaryRule = relevantRules[0];
    let responseText = `According to the NBA rulebook, ${primaryRule.content}`;
    
    // Add citations for all relevant rules
    const citations = relevantRules.map(rule => rule.id);
    
    // Add examples if available
    const examples = await this.ruleService.findExamplesByRuleId(primaryRule.id);
    if (examples.length > 0) {
      const example = examples[0];
      responseText += `\n\nHere's an example: ${example.situation} ${example.ruling}`;
    }
    
    return {
      message: responseText,
      citations
    };
  }

  /**
   * Save a message to the database
   * @param userId User identifier
   * @param role Message role (user or bot)
   * @param content Message content
   * @returns Saved message document
   */
  private async saveMessage(userId: string, role: 'user' | 'bot', content: string): Promise<IChatMessage> {
    const message = new ChatMessageModel({
      userId,
      role,
      content,
      timestamp: new Date()
    });
    
    return await message.save();
  }

  /**
   * Retrieve conversation history for a user
   * @param userId User identifier
   * @param limit Maximum number of messages to retrieve
   * @returns Array of chat messages
   */
  async getConversationHistory(userId: string, limit: number = 20): Promise<IChatMessage[]> {
    return await ChatMessageModel.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .sort({ timestamp: 1 }); // Re-sort to chronological order
  }

  /**
   * Clear conversation history for a user
   * @param userId User identifier
   * @returns Operation result
   */
  async clearConversation(userId: string): Promise<{ success: boolean }> {
    await ChatMessageModel.deleteMany({ userId });
    return { success: true };
  }
}