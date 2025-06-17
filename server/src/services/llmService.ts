import { OpenAI } from 'openai';
import logger from '../utils/logger';

/**
 * Service for handling LLM interactions
 */
class LLMService {
  private openai: OpenAI;
  
  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-development',
    });
  }
  
  /**
   * Generate a response based on user input and rule context
   * @param userQuery User's question
   * @param rulesContext NBA rules relevant to the query
   * @param availableRuleIds IDs of rules available for citation
   * @returns Generated response and cited rule IDs
   */
  async generateResponse(
    userQuery: string,
    rulesContext: string,
    availableRuleIds: string[]
  ): Promise<{ response: string; citedRuleIds: string[] }> {
    try {
      const systemPrompt = this.buildSystemPrompt(rulesContext, availableRuleIds);
      
      // Call the LLM to generate a response
      const completion = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userQuery }
        ],
        temperature: 0.3, // Lower temperature for more factual responses
        max_tokens: 800,
        function_call: { name: 'answer_with_citations' },
        functions: [
          {
            name: 'answer_with_citations',
            description: 'Answer the question with relevant NBA rule citations',
            parameters: {
              type: 'object',
              properties: {
                answer: {
                  type: 'string',
                  description: 'The answer to the user\'s question about NBA rules'
                },
                citations: {
                  type: 'array',
                  description: 'The rule IDs (e.g., "1-A-1") that support this answer',
                  items: {
                    type: 'string'
                  }
                }
              },
              required: ['answer', 'citations']
            }
          }
        ]
      });
      
      // Extract the function call result
      const functionCall = completion.choices[0]?.message?.function_call;
      
      if (!functionCall || !functionCall.arguments) {
        throw new Error('Failed to generate response from LLM');
      }
      
      // Parse the function arguments
      const parsedArguments = JSON.parse(functionCall.arguments);
      
      return {
        response: parsedArguments.answer,
        citedRuleIds: parsedArguments.citations
      };
    } catch (error) {
      logger.error('Error generating LLM response:', error);
      
      // Fallback response if the API call fails
      return {
        response: "I'm sorry, I couldn't process your question about NBA rules at the moment. Please try again later.",
        citedRuleIds: []
      };
    }
  }
  
  /**
   * Build the system prompt for the LLM
   * @param rulesContext Formatted rules for context
   * @param availableRuleIds IDs of available rules
   * @returns System prompt string
   */
  private buildSystemPrompt(rulesContext: string, availableRuleIds: string[]): string {
    return `You are RuleBook Bot, an expert on the NBA rulebook. Your role is to help users understand NBA rules by providing clear, accurate explanations with specific rule citations.

CONTEXT INFORMATION (NBA RULES):
${rulesContext}

AVAILABLE RULE IDs FOR CITATION:
${availableRuleIds.join(', ')}

INSTRUCTIONS:
1. Answer questions about NBA rules based on the context provided.
2. Provide accurate explanations in a conversational, helpful tone.
3. When citing rules, use the exact rule ID format (e.g., "1-A-1").
4. If a question cannot be answered from the provided rules, acknowledge this and suggest related rules if possible.
5. Keep explanations concise but complete, focusing on the user's specific question.
6. Do not invent rules or make up citations.
7. Use the 'answer_with_citations' function to format your response.

Respond with clear, helpful answers that demonstrate your expertise on NBA rules.`;
  }
}

export default new LLMService();