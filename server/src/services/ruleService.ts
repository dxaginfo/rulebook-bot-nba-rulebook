import fs from 'fs';
import path from 'path';
import { Rule } from '../types/rule';

// Mock rulebook data for development
// In production, this would be stored in a database
const mockRules: Rule[] = [
  {
    id: '1',
    title: 'Traveling',
    category: 'Violations',
    content: 'A player who receives the ball while standing still may pivot, using either foot as the pivot foot. A player who gathers the ball while progressing may take two steps in coming to a stop, passing or shooting the ball. A player who receives the ball while he is progressing must release the ball to start his dribble before his second step. The first step occurs when a foot, or both feet, touch the floor after gaining control of the ball.',
    section: 'Rule 10, Section XIII',
    examples: [
      'A player takes three steps after gathering the ball without dribbling.',
      'A player establishes a pivot foot, then lifts it and returns it to the floor before passing.'
    ]
  },
  {
    id: '2',
    title: 'Shot Clock',
    category: 'Timing',
    content: 'The shot clock shall be 24 seconds in length with a 14-second reset when the ball hits the rim and the offensive team retains possession. Teams must attempt a field goal before the shot clock expires. A field goal attempt is defined as a player throwing or tapping the ball towards the basket with the intent that it enter the basket.',
    section: 'Rule 7, Section II',
    examples: [
      'Team A doesn't attempt a shot before the 24-second clock expires.',
      'Team A's shot hits the rim, and they recover the rebound. The shot clock resets to 14 seconds.'
    ]
  },
  {
    id: '3',
    title: 'Goaltending',
    category: 'Violations',
    content: 'Goaltending occurs when a player touches the ball during a field goal attempt while it's on its downward flight, entirely above the rim level, and has a chance to enter the basket. This results in the offensive team being awarded the points for the attempted shot. Offensive goaltending occurs when an offensive player touches the ball while it's in the cylinder above the rim.',
    section: 'Rule 11, Section I',
    examples: [
      'A defender blocks a shot after it has hit the backboard and is above the rim.',
      'An offensive player touches the ball while it's on the rim.'
    ]
  },
  {
    id: '4',
    title: 'Court Dimensions',
    category: 'Court',
    content: 'The playing court shall be 94 feet in length by 50 feet in width. The court shall be marked with boundary lines (sidelines and baselines), restraining lines, free throw lanes, and a center circle. The three-point field goal line shall be a distance of 23 feet 9 inches from the center of the basket except in the corners where it is 22 feet from the center of the basket.',
    section: 'Rule 1, Section I',
    examples: []
  },
  {
    id: '5',
    title: 'Fouls',
    category: 'Fouls and Penalties',
    content: 'A personal foul is illegal physical contact which occurs with an opponent after the ball has become live. A player shall not hold, push, charge into, or impede the progress of an opponent by extending a hand, arm, leg or knee or by bending the body into a position that is not normal. Contact that results when a player is reaching for a loose ball, or when a player is in an unstable position, is incidental and not a foul.',
    section: 'Rule 12, Section I',
    examples: [
      'A defender extends their arm and makes contact with a driving offensive player.',
      'A player sets a screen but is still moving when contact occurs.'
    ]
  }
];

// Mock categories
const mockCategories = ['Court', 'Timing', 'Violations', 'Fouls and Penalties', 'Scoring'];

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
    // In production, this would query a database
    const rule = mockRules.find(rule => rule.id === id);
    return rule || null;
  },
  
  /**
   * Search for rules by query
   * @param query Search query
   * @returns Array of matching rules
   */
  searchRules: async (query: string): Promise<Rule[]> => {
    // Simple search implementation
    const lowercaseQuery = query.toLowerCase();
    
    return mockRules.filter(rule => 
      rule.title.toLowerCase().includes(lowercaseQuery) ||
      rule.content.toLowerCase().includes(lowercaseQuery) ||
      rule.section.toLowerCase().includes(lowercaseQuery) ||
      rule.category.toLowerCase().includes(lowercaseQuery)
    );
  },
  
  /**
   * Get all rule categories
   * @returns Array of category names
   */
  getCategories: async (): Promise<string[]> => {
    return mockCategories;
  },
  
  /**
   * Get rules by category
   * @param category Category name
   * @returns Array of rules in the category
   */
  getRulesByCategory: async (category: string): Promise<Rule[]> => {
    return mockRules.filter(rule => 
      rule.category.toLowerCase() === category.toLowerCase()
    );
  }
};

export default ruleService;