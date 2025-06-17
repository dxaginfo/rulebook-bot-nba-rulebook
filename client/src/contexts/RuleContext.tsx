import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Rule } from '../types/rule';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface RuleContextProps {
  loading: boolean;
  error: string | null;
  getRuleById: (id: string) => Promise<Rule | null>;
  searchRules: (query: string) => Promise<Rule[]>;
  getCategories: () => Promise<string[]>;
  getRulesByCategory: (category: string) => Promise<Rule[]>;
}

const RuleContext = createContext<RuleContextProps>({
  loading: false,
  error: null,
  getRuleById: async () => null,
  searchRules: async () => [],
  getCategories: async () => [],
  getRulesByCategory: async () => []
});

interface RuleProviderProps {
  children: ReactNode;
}

export const RuleProvider: React.FC<RuleProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const getRuleById = async (id: string): Promise<Rule | null> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/api/rules/${id}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch rule');
      console.error('Error fetching rule:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const searchRules = async (query: string): Promise<Rule[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/api/rules/search`, {
        params: { q: query }
      });
      return response.data.results;
    } catch (err) {
      setError('Failed to search rules');
      console.error('Error searching rules:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  const getCategories = async (): Promise<string[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/api/rules/categories`);
      return response.data.categories;
    } catch (err) {
      setError('Failed to fetch categories');
      console.error('Error fetching categories:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  const getRulesByCategory = async (category: string): Promise<Rule[]> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_URL}/api/rules/category/${category}`);
      return response.data.rules;
    } catch (err) {
      setError('Failed to fetch rules by category');
      console.error('Error fetching rules by category:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <RuleContext.Provider
      value={{
        loading,
        error,
        getRuleById,
        searchRules,
        getCategories,
        getRulesByCategory
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

export const useRule = () => useContext(RuleContext);