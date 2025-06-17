# RuleBook Bot Architecture

This document outlines the architecture of the RuleBook Bot application, explaining how different components interact to deliver the NBA rulebook chatbot functionality.

## System Architecture Overview

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│                  │      │                  │      │                  │
│  React Frontend  │◄────►│  Express Backend │◄────►│   LLM Service    │
│                  │      │                  │      │                  │
└──────────────────┘      └────────┬─────────┘      └──────────────────┘
                                   │                          ▲
                                   ▼                          │
                          ┌──────────────────┐                │
                          │                  │                │
                          │    MongoDB       │                │
                          │                  │                │
                          └──────────────────┘                │
                                                              │
                                                    ┌─────────┴──────────┐
                                                    │                    │
                                                    │   NBA Rulebook     │
                                                    │    (Training)      │
                                                    │                    │
                                                    └────────────────────┘
```

## Component Details

### 1. React Frontend

- **Framework**: React.js with TypeScript
- **State Management**: React Context API
- **UI Components**: Material-UI
- **Key Features**:
  - Chat interface for rule questions
  - Rule browsing interface
  - Search functionality
  - Responsive design

### 2. Express Backend

- **Framework**: Node.js with Express
- **API**: RESTful endpoints
- **Authentication**: JWT for future user features
- **Key Services**:
  - Query processing
  - LLM service integration
  - Conversation history management
  - Rule indexing

### 3. LLM Service

- **Model**: Fine-tuned language model trained on NBA rulebook
- **Processing**: Text embedding and semantic search
- **Integration**: API wrapper for model inference
- **Features**:
  - Context-aware responses
  - Rule citation extraction
  - Explanation generation

### 4. MongoDB Database

- **Collections**:
  - Rulebook sections (indexed)
  - User conversations (if authentication implemented)
  - Usage analytics

### 5. Training Data

- **Source**: Official NBA rulebook
- **Processing**:
  - Text extraction and cleaning
  - Chunking into semantic units
  - Embedding generation
  - Fine-tuning examples

## Data Flow

1. **User Query**:
   - User enters a question about NBA rules in the chat interface
   - Frontend sends the query to the backend API

2. **Query Processing**:
   - Backend preprocesses the query
   - Query is sent to the LLM service
   - Context from previous conversation may be included

3. **Response Generation**:
   - LLM service interprets the question
   - Relevant rule sections are retrieved
   - A natural language response is generated
   - Citations to specific rule sections are included

4. **Response Delivery**:
   - Backend formats the response
   - Response is sent to the frontend
   - Conversation history is updated in the database

5. **User Interaction**:
   - Frontend displays the response
   - User can ask follow-up questions
   - User can click on rule citations for more details

## Future Extensions

- **User Accounts**: Save conversation history and preferences
- **Rule Updates**: Automated system to update the model when NBA rules change
- **Multimedia**: Integration of video examples for rule explanations
- **Analytics**: Usage patterns to improve response quality