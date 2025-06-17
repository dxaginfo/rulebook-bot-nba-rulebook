import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Rule } from '../types/rule';
import axios from 'axios';

interface RuleContextProps {
  rules: Rule[];
  categories: string[];
  loading: boolean;
  searchRules: (query: string) => Promise<Rule[]>;
  getRuleById: (id: string) => Promise<Rule | null>;
  getRulesByCategory: (category: string) => Promise<Rule[]>;
}

const RuleContext = createContext<RuleContextProps>({
  rules: [],
  categories: [],
  loading: false,
  searchRules: async () => [],
  getRuleById: async () => null,
  getRulesByCategory: async () => []
});

interface RuleProviderProps {
  children: ReactNode;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const RuleProvider: React.FC<RuleProviderProps> = ({ children }) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  // Load categories when component mounts
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/rules/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    
    loadCategories();
  }, []);
  
  const searchRules = async (query: string): Promise<Rule[]> => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/rules/search`, {
        params: { q: query }
      });
      const foundRules = response.data.results;
      setRules(foundRules);
      return foundRules;
    } catch (error) {
      console.error('Error searching rules:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  const getRuleById = async (id: string): Promise<Rule | null> => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/rules/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting rule:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  
  const getRulesByCategory = async (category: string): Promise<Rule[]> => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/rules/category/${category}`);
      const categoryRules = response.data.rules;
      setRules(categoryRules);
      return categoryRules;
    } catch (error) {
      console.error('Error getting rules by category:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <RuleContext.Provider 
      value={{
        rules,
        categories,
        loading,
        searchRules,
        getRuleById,
        getRulesByCategory
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

export const useRule = () => useContext(RuleContext);