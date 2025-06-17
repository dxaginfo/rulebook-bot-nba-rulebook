import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { Rule } from '../types/rule';

interface RuleContextProps {
  loading: boolean;
  error: string | null;
  getRuleById: (id: string) => Promise<Rule | null>;
  searchRules: (query: string) => Promise<Rule[]>;
  getCategories: () => Promise<string[]>;
  getRulesByCategory: (category: string) => Promise<Rule[]>;
}

const RuleContext = createContext<RuleContextProps | undefined>(undefined);

export const useRule = (): RuleContextProps => {
  const context = useContext(RuleContext);
  if (!context) {
    throw new Error('useRule must be used within a RuleProvider');
  }
  return context;
};

interface RuleProviderProps {
  children: ReactNode;
}

export const RuleProvider: React.FC<RuleProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get a rule by ID
  const getRuleById = useCallback(async (id: string): Promise<Rule | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/rules/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error getting rule:', err);
      setError('Failed to retrieve rule. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Search for rules
  const searchRules = useCallback(async (query: string): Promise<Rule[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/rules/search', {
        params: { q: query }
      });
      
      return response.data.results;
    } catch (err) {
      console.error('Error searching rules:', err);
      setError('Failed to search rules. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Get all rule categories
  const getCategories = useCallback(async (): Promise<string[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/rules/categories');
      return response.data.categories;
    } catch (err) {
      console.error('Error getting categories:', err);
      setError('Failed to retrieve categories. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Get rules by category
  const getRulesByCategory = useCallback(async (category: string): Promise<Rule[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/rules/category/${category}`);
      return response.data.rules;
    } catch (err) {
      console.error('Error getting rules by category:', err);
      setError('Failed to retrieve rules. Please try again.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  const value = {
    loading,
    error,
    getRuleById,
    searchRules,
    getCategories,
    getRulesByCategory
  };
  
  return (
    <RuleContext.Provider value={value}>
      {children}
    </RuleContext.Provider>
  );
};