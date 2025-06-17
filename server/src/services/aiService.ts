import { v4 as uuidv4 } from 'uuid';
import { Message, ChatResponse } from '../types/chat';
import ruleService from './ruleService';

/**
 * Service for AI-related functionality
 */
const aiService = {
  /**
   * Generate a response to a user message
   * @param message User message
   * @param chatHistory Chat history
   * @returns Generated response
   */
  generateResponse: async (message: string, chatHistory: Message[]): Promise<ChatResponse> => {
    try {
      // Mock implementation - in a real app, this would call an AI service like OpenAI
      // and use the rulebook data to generate responses
      
      // Get relevant rules based on the query
      const relevantRules = await ruleService.searchRules(message);
      
      // Generate response text
      let responseText = '';
      let citations: string[] = [];
      
      // Simple pattern matching for demo purposes
      if (message.toLowerCase().includes('travel') || message.toLowerCase().includes('travelling')) {
        responseText = `A traveling violation occurs when a player holding the ball moves one or both feet illegally. The basic rule is that a player may take two steps after gathering the ball if they were dribbling. If they exceed this limit without dribbling, passing, or shooting, it's a traveling violation.\n\nThere are several scenarios that constitute traveling:\n1. Moving the pivot foot once a player has stopped dribbling\n2. Taking more than two steps after gathering the ball\n3. Jumping with the ball and returning to the floor without passing or shooting\n\nWhen a traveling violation is called, the opposing team is awarded the ball out of bounds nearest to where the violation occurred.`;
        citations = ['Rule 10, Section XIII - Traveling'];
      } 
      else if (message.toLowerCase().includes('shot clock')) {
        responseText = `The shot clock in the NBA is 24 seconds. Teams must attempt a field goal before the shot clock expires. The shot clock resets to 24 seconds when:\n\n- The ball touches the rim of the opponent's basket\n- The ball is legally touched by an opponent\n- A team gains a new possession\n\nThe shot clock resets to 14 seconds when:\n- An offensive team retains possession after a loose ball foul is called on the defensive team\n- The offensive team recovers the ball after it touches the rim, if the same team retains possession\n- After certain offensive fouls where the offensive team maintains possession\n\nIf a team fails to attempt a field goal before the shot clock expires, it results in a shot clock violation, and the opposing team is awarded the ball.`;
        citations = ['Rule 7, Section II - Shot Clock'];
      }
      else if (message.toLowerCase().includes('goaltend') || message.toLowerCase().includes('goaltending')) {
        responseText = `Goaltending is called when a defensive player interferes with a shot that has a chance to go in. Specifically, goaltending occurs when a defensive player:\n\n1. Touches the ball on its downward flight to the basket\n2. Touches the ball when it's above the level of the ring and has a chance to enter the basket\n3. Touches the ball while it's in the cylinder above the rim\n4. Touches the backboard while the ball is above the ring level\n\nWhen goaltending is called, the offensive team is awarded the points that would have been scored if the shot had gone in (2 or 3 points).\n\nOffensive goaltending can also occur when an offensive player touches the ball while it's in the cylinder above the rim. In this case, the basket doesn't count, and the defensive team is awarded possession.`;
        citations = ['Rule 11, Section I - Goaltending'];
      }
      else if (message.toLowerCase().includes('court') && message.toLowerCase().includes('length') || message.toLowerCase().includes('dimension')) {
        responseText = `The NBA basketball court has the following dimensions:\n\n- Length: 94 feet (28.65 meters)\n- Width: 50 feet (15.24 meters)\n- Rim height: 10 feet (3.05 meters) from the floor\n- Free throw line: 15 feet (4.57 meters) from the backboard\n- Three-point line: 23 feet 9 inches (7.24 meters) from the center of the basket, except in the corners where it's 22 feet (6.7 meters)\n- Center circle: 12 feet (3.66 meters) in diameter\n- Restricted area (no-charge zone): 4-foot radius from the center of the basket\n\nThese dimensions are standardized across all NBA courts to ensure consistency in gameplay.`;
        citations = ['Rule 1, Section I - Court Dimensions'];
      }
      else {
        // Default response if no specific pattern is matched
        responseText = `I'm RuleBook Bot, your guide to NBA rules. Based on your question, I can provide the following information:\n\nThe NBA rulebook covers various aspects of the game, including court dimensions, equipment, officials, players, scoring, timing, violations, fouls, penalties, and administrative matters.\n\nCould you please ask a more specific question about NBA rules? For example, you can ask about traveling violations, shot clock rules, goaltending, or court dimensions.`;
      }
      
      return {
        id: uuidv4(),
        message: responseText,
        citations
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  }
};

export default aiService;