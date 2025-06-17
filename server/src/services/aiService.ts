import { v4 as uuidv4 } from 'uuid';
import { Message, ChatResponse } from '../types/chat';
import ruleService from './ruleService';

const aiService = {
  /**
   * Generate a response to a user message
   * @param message User message
   * @param chatHistory Chat history
   * @returns Generated response
   */
  generateResponse: async (message: string, chatHistory: Message[]): Promise<ChatResponse> => {
    try {
      // In a real app, this would call an AI service like OpenAI's GPT
      // For demo purposes, we'll simulate responses based on keywords
      
      const responseId = uuidv4();
      let responseMessage = '';
      let citations: string[] = [];
      
      // Simple keyword matching for demo purposes
      const lowercaseMessage = message.toLowerCase();
      
      if (lowercaseMessage.includes('travel') || lowercaseMessage.includes('steps')) {
        responseMessage = 'A traveling violation occurs when a player holding the ball moves one or both feet illegally. Once a player receives the ball or has stopped dribbling, they may not move their pivot foot or take more than two steps without dribbling the ball. The penalty is a turnover, with the opposing team getting the ball at the nearest sideline.';
        citations = ['Rule 10 - Violations and Penalties - Traveling'];
      } 
      else if (lowercaseMessage.includes('shot clock')) {
        responseMessage = 'The shot clock in the NBA is 24 seconds. Teams must attempt a field goal that hits the rim before the shot clock expires, or possession is awarded to the opposing team. The shot clock resets to 24 seconds on change of possession or when the ball hits the rim on a shot attempt. It resets to 14 seconds in certain situations, such as when the offensive team retains possession after an offensive rebound.';
        citations = ['Rule 7 - Timing - Shot Clock'];
      }
      else if (lowercaseMessage.includes('goaltend')) {
        responseMessage = 'Goaltending occurs when a player interferes with a shot during its downward flight, with a chance to go in. This includes touching the ball when it\'s above the rim level and has a chance to enter the basket, or touching the ball after it has touched the backboard when it is above the rim. When goaltending is called, the basket counts and points are awarded.';
        citations = ['Rule 11 - Basket Interference and Goaltending - Goaltending'];
      }
      else if (lowercaseMessage.includes('dimensions') || lowercaseMessage.includes('court size')) {
        responseMessage = 'An NBA basketball court is 94 feet long and 50 feet wide (28.65 meters by 15.24 meters). The three-point line is 23 feet 9 inches from the center of the basket (22 feet in the corners). The free throw line is 15 feet from the backboard, and the key (free throw lane) is 16 feet wide.';
        citations = ['Rule 1 - Court Dimensions - Court Dimensions'];
      }
      else if (lowercaseMessage.includes('personal foul') || lowercaseMessage.includes('foul out')) {
        responseMessage = 'NBA players are allowed a maximum of 6 personal fouls per game before "fouling out" and being disqualified from further participation in the game. After a team commits 5 fouls in a quarter, the opposing team enters the "bonus" situation and shoots free throws on all subsequent non-shooting fouls in that quarter.';
        citations = ['Rule 12 - Fouls and Penalties - Personal Fouls'];
      }
      else {
        // Default response
        responseMessage = "I'm your NBA rules assistant. You can ask me about specific rules, violations, or procedures in professional basketball. For example, try asking about traveling violations, shot clock rules, or court dimensions.";
      }
      
      // Simulate a slight delay to make it feel more natural
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        id: responseId,
        message: responseMessage,
        citations
      };
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
};

export default aiService;