import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Rule } from '../types/rule';
import ruleService from '../services/ruleService';

interface RuleContextType {
  rules: Rule[];
  loadingRules: boolean;
  loadingRule: boolean;
  searchResults: Rule[];
  loadingSearch: boolean;
  getRuleById: (id: string) => Promise<Rule>;
  searchRules: (query: string) => Promise<void>;
}

const RuleContext = createContext<RuleContextType | undefined>(undefined);

interface RuleProviderProps {
  children: ReactNode;
}

/**
 * Provider component for rule functionality
 */
export const RuleProvider: React.FC<RuleProviderProps> = ({ children }) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loadingRules, setLoadingRules] = useState(false);
  const [loadingRule, setLoadingRule] = useState(false);
  const [searchResults, setSearchResults] = useState<Rule[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  
  /**
   * Get a rule by ID
   */
  const getRuleById = async (id: string): Promise<Rule> => {
    try {
      setLoadingRule(true);
      const rule = await ruleService.getRuleById(id);
      return rule;
    } catch (error) {
      console.error(`Failed to get rule with ID ${id}:`, error);
      throw error;
    } finally {
      setLoadingRule(false);
    }
  };
  
  /**
   * Search for rules by query
   */
  const searchRules = async (query: string) => {
    try {
      setLoadingSearch(true);
      const results = await ruleService.searchRules(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Failed to search rules:', error);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };
  
  return (
    <RuleContext.Provider 
      value={{
        rules,
        loadingRules,
        loadingRule,
        searchResults,
        loadingSearch,
        getRuleById,
        searchRules
      }}
    >
      {children}
    </RuleContext.Provider>
  );
};

/**
 * Hook to use the rule context
 */
export const useRules = (): RuleContextType => {
  const context = useContext(RuleContext);
  
  if (context === undefined) {
    throw new Error('useRules must be used within a RuleProvider');
  }
  
  return context;
};