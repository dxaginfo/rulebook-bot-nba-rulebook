import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for Rule document
 */
export interface Rule extends Document {
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
 * Mongoose schema for the Rule model
 */
const RuleSchema = new Schema<Rule>({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true,
    index: true
  },
  parentId: {
    type: String,
    index: true
  },
  order: {
    type: Number
  },
  category: {
    type: String,
    index: true
  },
  relatedRules: [{
    type: String
  }]
}, {
  timestamps: true
});

// Create text index for search
RuleSchema.index({ 
  title: 'text', 
  content: 'text' 
}, {
  weights: {
    title: 10,
    content: 5
  },
  name: 'rule_text_index'
});

/**
 * Interface for RuleExample document
 */
export interface RuleExample extends Document {
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

/**
 * Mongoose schema for the RuleExample model
 */
const RuleExampleSchema = new Schema<RuleExample>({
  situation: {
    type: String,
    required: true
  },
  ruling: {
    type: String,
    required: true
  },
  ruleId: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true
});

// Create models
export const RuleModel = mongoose.model<Rule>('Rule', RuleSchema);
export const RuleExampleModel = mongoose.model<RuleExample>('RuleExample', RuleExampleSchema);