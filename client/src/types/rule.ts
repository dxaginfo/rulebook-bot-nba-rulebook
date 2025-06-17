/**
 * Type definitions for NBA rulebook rules
 */

/**
 * Represents a rule section or subsection
 */
export interface Rule {
  /**
   * Unique identifier for the rule
   */
  id: string;
  
  /**
   * Rule title
   */
  title: string;
  
  /**
   * Rule content text
   */
  content: string;
  
  /**
   * Optional parent rule ID for subsections
   */
  parentId?: string;
}

/**
 * Represents an example of a rule application
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