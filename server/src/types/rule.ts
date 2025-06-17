/**
 * Rule interface
 */
export interface Rule {
  id: string;
  title: string;
  category: string;
  section: string;
  content: string;
  examples?: string[];
}