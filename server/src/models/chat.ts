import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface for ChatMessage document
 */
export interface ChatMessage extends Document {
  /**
   * Unique identifier for the message
   */
  id: string;
  
  /**
   * Message content
   */
  content: string;
  
  /**
   * Message role (user or bot)
   */
  role: 'user' | 'bot';
  
  /**
   * User identifier
   */
  userId: string;
  
  /**
   * Timestamp when the message was created
   */
  timestamp: Date;
  
  /**
   * Rule citations referenced in the message (for bot responses)
   */
  citations?: string[];
}

/**
 * Mongoose schema for the ChatMessage model
 */
const ChatMessageSchema = new Schema<ChatMessage>({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'bot']
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  citations: [{
    type: String
  }]
});

// Create indexes for efficient queries
ChatMessageSchema.index({ userId: 1, timestamp: -1 });

// Create the model
export const ChatMessageModel = mongoose.model<ChatMessage>('ChatMessage', ChatMessageSchema);