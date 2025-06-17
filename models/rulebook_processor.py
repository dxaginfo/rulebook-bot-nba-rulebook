"""
Rulebook Processor
-----------------
This module handles the processing and indexing of the NBA rulebook.
It prepares the data for use with a language model by:
1. Loading and parsing the rulebook
2. Creating text embeddings for semantic search
3. Formatting data for fine-tuning the language model
"""
import json
import os
import numpy as np
from typing import Dict, List, Any, Tuple
from dataclasses import dataclass

@dataclass
class RuleSection:
    """Represents a section of the rulebook."""
    id: str
    title: str
    content: str
    parent_id: str = None

@dataclass
class Example:
    """Represents an example of a rule application."""
    situation: str
    ruling: str
    rule_id: str

class RulebookProcessor:
    """Processes the NBA rulebook for use with the LLM."""
    
    def __init__(self, data_path: str):
        """
        Initialize the processor with the path to the rulebook data.
        
        Args:
            data_path: Path to the rulebook JSON file
        """
        self.data_path = data_path
        self.sections: List[RuleSection] = []
        self.examples: List[Example] = []
        self.keyword_map: Dict[str, List[str]] = {}
        
    def load_rulebook(self) -> None:
        """Load the rulebook from the JSON file."""
        with open(self.data_path, 'r') as f:
            data = json.load(f)
            
        # Process sections and subsections
        for section in data['sections']:
            section_id = section['id']
            section_title = section['title']
            
            # Add main section as a placeholder
            self.sections.append(RuleSection(
                id=section_id,
                title=section_title,
                content="",  # Main sections often don't have content
            ))
            
            # Process subsections
            for subsection in section.get('subsections', []):
                self.sections.append(RuleSection(
                    id=subsection['id'],
                    title=subsection['title'],
                    content=subsection['content'],
                    parent_id=section_id
                ))
        
        # Process keywords
        self.keyword_map = data.get('keywords', {})
        
        # Process examples
        for rule_id, rule_examples in data.get('examples', {}).items():
            for example in rule_examples:
                self.examples.append(Example(
                    situation=example['situation'],
                    ruling=example['ruling'],
                    rule_id=rule_id
                ))
                
        print(f"Loaded {len(self.sections)} rule sections and {len(self.examples)} examples")
    
    def generate_training_samples(self) -> List[Dict[str, str]]:
        """
        Generate training samples for fine-tuning the language model.
        
        Returns:
            List of dictionaries with 'question' and 'answer' keys
        """
        training_samples = []
        
        # Generate samples from rule sections
        for section in self.sections:
            if not section.content:
                continue
                
            # Create a question about the rule
            question = f"What does the NBA rulebook say about {section.title.lower()}?"
            answer = f"{section.content} (Rule citation: {section.id})"
            training_samples.append({
                "question": question,
                "answer": answer
            })
            
            # Create more specific questions based on content
            keywords = self._extract_keywords_from_content(section.content)
            for keyword in keywords:
                question = f"What are the rules regarding {keyword} in the NBA?"
                answer = f"{section.content} (Rule citation: {section.id})"
                training_samples.append({
                    "question": question,
                    "answer": answer
                })
        
        # Generate samples from examples
        for example in self.examples:
            question = f"Is this legal in the NBA: {example.situation}"
            answer = f"{example.ruling} This is based on {self._get_rule_title(example.rule_id)}. (Rule citation: {example.rule_id})"
            training_samples.append({
                "question": question,
                "answer": answer
            })
            
        return training_samples
    
    def _extract_keywords_from_content(self, content: str) -> List[str]:
        """Extract relevant keywords from content for question generation."""
        # This is a simplified implementation
        # In a real system, you might use NLP techniques to extract key phrases
        words = content.lower().split()
        keywords = [word for word in words if len(word) > 5 and word.isalpha()]
        return list(set(keywords))[:3]  # Take up to 3 unique keywords
    
    def _get_rule_title(self, rule_id: str) -> str:
        """Get the title of a rule by its ID."""
        for section in self.sections:
            if section.id == rule_id:
                return section.title
        return f"Rule {rule_id}"
    
    def save_training_data(self, output_path: str) -> None:
        """
        Save generated training data to a JSON file.
        
        Args:
            output_path: Path to save the training data
        """
        training_samples = self.generate_training_samples()
        with open(output_path, 'w') as f:
            json.dump(training_samples, f, indent=2)
        print(f"Saved {len(training_samples)} training samples to {output_path}")
    
    def find_rule_by_keywords(self, query: str) -> List[RuleSection]:
        """
        Find rule sections that match the given keywords.
        
        Args:
            query: The search query
            
        Returns:
            List of matching rule sections
        """
        matching_sections = []
        query_words = query.lower().split()
        
        # Check direct keyword matches
        for word in query_words:
            if word in self.keyword_map:
                rule_ids = self.keyword_map[word]
                for rule_id in rule_ids:
                    matching_sections.extend([s for s in self.sections if s.id == rule_id])
        
        # If no direct matches, try content search
        if not matching_sections:
            for section in self.sections:
                if any(word in section.content.lower() for word in query_words):
                    matching_sections.append(section)
        
        return matching_sections

if __name__ == "__main__":
    # Example usage
    processor = RulebookProcessor("data/sample-rulebook.json")
    processor.load_rulebook()
    
    # Generate and save training data
    processor.save_training_data("models/training_data.json")
    
    # Example search
    results = processor.find_rule_by_keywords("traveling pivot foot")
    for result in results:
        print(f"Found matching rule: {result.title}")
        print(result.content[:100] + "...")