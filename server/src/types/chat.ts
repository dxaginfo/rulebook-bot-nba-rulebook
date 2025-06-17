export interface Message {
  id: string;
  content: string;
  role: 'user' | 'bot';
  timestamp: string;
  citations?: string[];
}

export interface ChatResponse {
  id: string;
  message: string;
  citations?: string[];
}