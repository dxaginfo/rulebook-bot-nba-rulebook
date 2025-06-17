/**
 * Interface for NBA rule data
 */
export interface Rule {
  /**
   * Unique identifier for the rule (e.g., "1-A-1")
   */
  id: string;
  
  /**
   * Rule title or heading
   */
  title: string;
  
  /**
   * Full text content of the rule
   */
  content: string;
  
  /**
   * Optional parent rule ID for subsections
   */
  parentId?: string;
  
  /**
   * Order in the rulebook (for sorting)
   */
  order?: number;
  
  /**
   * Category or section name
   */
  category?: string;
  
  /**
   * References to other related rules
   */
  relatedRules?: string[];
}

/**
 * Interface for rule example data
 */
export interface RuleExample {
  /**
   * Description of the situation
   */
  situation: string;
  
  /**
   * Official ruling for the situation
   */
  ruling: string;
  
  /**
   * ID of the rule this example relates to
   */
  ruleId: string;
}