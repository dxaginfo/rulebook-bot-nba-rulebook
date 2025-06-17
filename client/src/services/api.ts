import axios from 'axios';
import { Message } from '../types/chat';
import { Rule } from '../types/rule';

// Configure axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

/**
 * Chat API methods
 */

/**
 * Send a message to the chat API
 * @param content The message content to send
 * @returns The bot's response
 */
export const sendMessage = async (content: string): Promise<{
  id: string;
  message: string;
  citations: string[];
}> => {
  const response = await api.post('/chat', { content });
  return response.data;
};

/**
 * Fetch chat history
 * @param limit Maximum number of messages to fetch
 * @returns Array of messages
 */
export const fetchChatHistory = async (limit: number = 20): Promise<Message[]> => {
  const response = await api.get('/chat/history', { params: { limit } });
  return response.data;
};

/**
 * Clear conversation history
 * @returns Success status
 */
export const clearConversation = async (): Promise<{ success: boolean }> => {
  const response = await api.delete('/chat/history');
  return response.data;
};

/**
 * Rule API methods
 */

/**
 * Fetch all rule sections
 * @returns Array of rules
 */
export const fetchRules = async (): Promise<Rule[]> => {
  const response = await api.get('/rules');
  return response.data;
};

/**
 * Fetch a specific rule by ID
 * @param id Rule ID
 * @returns Rule data
 */
export const fetchRuleById = async (id: string): Promise<Rule> => {
  const response = await api.get(`/rules/${id}`);
  return response.data;
};

/**
 * Search rules by query
 * @param query Search query
 * @returns Array of matching rules
 */
export const searchRules = async (query: string): Promise<Rule[]> => {
  const response = await api.get('/rules/search', { params: { q: query } });
  return response.data;
};

/**
 * Fetch rule examples
 * @param ruleId Rule ID
 * @returns Array of examples for the rule
 */
export const fetchRuleExamples = async (ruleId: string): Promise<{
  situation: string;
  ruling: string;
}[]> => {
  const response = await api.get(`/rules/${ruleId}/examples`);
  return response.data;
};

export default api;