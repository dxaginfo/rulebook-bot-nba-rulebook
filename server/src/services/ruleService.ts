import { Rule } from '../types/rule';

/**
 * Mock rule data - In a real application, this would be stored in a database
 */
const mockRules: Rule[] = [
  {
    id: 'rule-001',
    title: 'Traveling',
    category: 'Violations',
    section: 'Rule 10',
    content: 'A traveling violation occurs when a player holding the ball moves one or both feet illegally. Once a player receives the ball or has stopped dribbling, they may not move their pivot foot or take more than two steps without dribbling the ball. The penalty is a turnover, with the opposing team getting the ball at the nearest sideline.',
    examples: [
      'A player catches the ball and takes three steps without dribbling.',
      'After establishing a pivot foot, a player lifts that foot and returns it to the floor without passing or shooting.',
      'A player jumps with the ball and returns to the floor without passing or shooting.'
    ]
  },
  {
    id: 'rule-002',
    title: 'Shot Clock',
    category: 'Timing',
    section: 'Rule 7',
    content: 'The shot clock in the NBA is 24 seconds. Teams must attempt a field goal that hits the rim before the shot clock expires, or possession is awarded to the opposing team. The shot clock resets to 24 seconds on change of possession or when the ball hits the rim on a shot attempt. It resets to 14 seconds in certain situations, such as when the offensive team retains possession after an offensive rebound.',
    examples: [
      'Team A has possession and does not hit the rim with a shot attempt before the 24-second clock expires, resulting in a shot clock violation.',
      'Team A misses a shot, but gets an offensive rebound. The shot clock resets to 14 seconds instead of 24.',
      'After a defensive foul that does not result in free throws, the shot clock resets to 14 seconds if it displayed less than 14 seconds, otherwise it remains the same.'
    ]
  },
  {
    id: 'rule-003',
    title: 'Goaltending',
    category: 'Basket Interference',
    section: 'Rule 11',
    content: 'Goaltending occurs when a player interferes with a shot during its downward flight, with a chance to go in. This includes touching the ball when it\'s above the rim level and has a chance to enter the basket, or touching the ball after it has touched the backboard when it is above the rim. When goaltending is called, the basket counts and points are awarded.',
    examples: [
      'A defender blocks a shot after it has reached its apex and is on its way down.',
      'A defender blocks a shot after it has touched the backboard, while the ball is above the rim level.',
      'A player touches the net or rim while a shot is on or in the basket, causing the basket to vibrate.'
    ]
  },
  {
    id: 'rule-004',
    title: 'Court Dimensions',
    category: 'Court Specifications',
    section: 'Rule 1',
    content: 'An NBA basketball court is 94 feet long and 50 feet wide (28.65 meters by 15.24 meters). The three-point line is 23 feet 9 inches from the center of the basket (22 feet in the corners). The free throw line is 15 feet from the backboard, and the key (free throw lane) is 16 feet wide.',
    examples: []
  },
  {
    id: 'rule-005',
    title: 'Personal Fouls',
    category: 'Fouls and Penalties',
    section: 'Rule 12',
    content: 'NBA players are allowed a maximum of 6 personal fouls per game before "fouling out" and being disqualified from further participation in the game. After a team commits 5 fouls in a quarter, the opposing team enters the "bonus" situation and shoots free throws on all subsequent non-shooting fouls in that quarter.',
    examples: [
      'Player A commits his 6th personal foul and is disqualified from the game.',
      'Team A commits its 5th team foul in the 2nd quarter, putting Team B in the bonus. Team B\'s next non-shooting foul results in free throws.',
      'In the last 2 minutes of a period, a defensive foul away from the ball results in one free throw and possession for the offensive team.'
    ]
  },
  {
    id: 'rule-006',
    title: 'Out of Bounds',
    category: 'Ball Status',
    section: 'Rule 8',
    content: 'The ball is out of bounds when it touches a player who is out of bounds or any other person, the floor, or any object on, above or outside of a boundary line. If the ball goes out of bounds and was last touched by a player, the opposing team gets possession. If the officials are unable to determine who touched the ball last, possession is determined by alternating possession arrow.',
    examples: [
      'Player A dribbles the ball and steps on the sideline, causing a turnover.',
      'Player A passes the ball and it deflects off Player B\'s hand before going out of bounds. Team A gets possession.',
      'The ball goes out of bounds, but officials cannot determine who touched it last. Possession is determined by the alternating possession arrow.'
    ]
  },
  {
    id: 'rule-007',
    title: 'Three-Second Violation',
    category: 'Violations',
    section: 'Rule 10',
    content: 'An offensive player cannot remain in the painted area (the key) for more than three consecutive seconds while their team has control of the ball in the frontcourt. The count resets when the ball enters the basket, the offensive team loses possession, the player steps out of the painted area with both feet, or a shot hits the rim and a new possession begins.',
    examples: [
      'Player A stands in the key for 4 seconds while their team has possession in the frontcourt, resulting in a violation.',
      'Player A has been in the key for 2 seconds when a teammate shoots. The shot hits the rim, resetting the count.',
      'Player A has been in the key for 2 seconds, then steps out with both feet for a moment before stepping back in, resetting the count.'
    ]
  },
  {
    id: 'rule-008',
    title: 'Double Dribble',
    category: 'Violations',
    section: 'Rule 10',
    content: 'A double dribble violation occurs when a player dribbles the ball with two hands simultaneously or when a player picks up their dribble and then dribbles again without passing or shooting. Once a player has ended their dribble by catching the ball with one or both hands, they cannot begin a new dribble. The penalty is a turnover.',
    examples: [
      'Player A dribbles with one hand, stops dribbling by catching the ball, and then starts dribbling again without passing or shooting.',
      'Player A dribbles with both hands simultaneously.',
      'Player A loses control of the ball, recovers it without the ball being touched by another player, and dribbles again.'
    ]
  },
  {
    id: 'rule-009',
    title: 'Flagrant Fouls',
    category: 'Fouls and Penalties',
    section: 'Rule 12',
    content: 'A flagrant foul is unnecessary or excessive contact committed by a player against an opponent. There are two types of flagrant fouls: Flagrant Foul Penalty 1 (unnecessary contact) and Flagrant Foul Penalty 2 (unnecessary and excessive contact). Both result in free throws and possession for the fouled team. Flagrant Foul Penalty 2 also results in ejection of the offending player.',
    examples: [
      'Player A swings their elbow excessively and makes contact with Player B\'s head, resulting in a Flagrant Foul Penalty 2 and ejection.',
      'Player A makes unnecessary contact with Player B during a layup attempt, resulting in a Flagrant Foul Penalty 1.',
      'Player A pushes Player B in mid-air during a dunk attempt, creating a dangerous situation, resulting in a Flagrant Foul Penalty 2.'
    ]
  },
  {
    id: 'rule-010',
    title: 'Backcourt Violation',
    category: 'Violations',
    section: 'Rule 10',
    content: 'Once the offensive team establishes possession in their frontcourt, they cannot return the ball to the backcourt. A violation occurs if an offensive player with the ball in the frontcourt causes the ball to go into the backcourt, or if an offensive player is the first to touch the ball in the backcourt after it was in the frontcourt. The penalty is a turnover.',
    examples: [
      'Team A advances the ball to the frontcourt, then passes it back to a player in the backcourt, causing a violation.',
      'Player A establishes both feet in the frontcourt with the ball, then steps back into the backcourt, causing a violation.',
      'Player A dribbles from backcourt to frontcourt, establishing frontcourt status, then dribbles back to the backcourt, causing a violation.'
    ]
  }
];

/**
 * Rule Service to handle rule data operations
 */
const ruleService = {
  /**
   * Get a rule by its ID
   * @param id Rule ID
   * @returns Rule object or null if not found
   */
  getRuleById: async (id: string): Promise<Rule | null> => {
    try {
      // In a real app, this would query a database
      const rule = mockRules.find(rule => rule.id === id);
      return rule || null;
    } catch (error) {
      console.error('Error getting rule by ID:', error);
      throw error;
    }
  },
  
  /**
   * Search for rules based on a query string
   * @param query Search query
   * @returns Array of matching rules
   */
  searchRules: async (query: string): Promise<Rule[]> => {
    try {
      // In a real app, this would use a more sophisticated search algorithm or database query
      const lowerQuery = query.toLowerCase();
      
      // Simple search implementation
      return mockRules.filter(rule => {
        return (
          rule.title.toLowerCase().includes(lowerQuery) ||
          rule.content.toLowerCase().includes(lowerQuery) ||
          rule.category.toLowerCase().includes(lowerQuery) ||
          rule.section.toLowerCase().includes(lowerQuery) ||
          rule.examples?.some(example => example.toLowerCase().includes(lowerQuery))
        );
      });
    } catch (error) {
      console.error('Error searching rules:', error);
      throw error;
    }
  },
  
  /**
   * Get all rule categories
   * @returns Array of category names
   */
  getCategories: async (): Promise<string[]> => {
    try {
      // In a real app, this would query a database
      const categories = mockRules.map(rule => rule.category);
      return Array.from(new Set(categories)); // Remove duplicates
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  },
  
  /**
   * Get all rules in a specific category
   * @param category Category name
   * @returns Array of rules in the category
   */
  getRulesByCategory: async (category: string): Promise<Rule[]> => {
    try {
      // In a real app, this would query a database
      return mockRules.filter(rule => rule.category === category);
    } catch (error) {
      console.error('Error getting rules by category:', error);
      throw error;
    }
  },
};

export default ruleService;