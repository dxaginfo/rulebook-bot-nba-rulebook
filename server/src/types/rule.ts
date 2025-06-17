/**
 * Represents an NBA rule
 */
export interface Rule {
  id: string;
  title: string;
  category: string;
  content: string;
  section: string;
  examples?: string[];
}