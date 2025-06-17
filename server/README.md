# RuleBook Bot Backend

This directory contains the Node.js backend application for the RuleBook Bot NBA Rulebook project.

## Technology Stack

- Node.js with Express
- TypeScript for type safety
- MongoDB for data storage
- LLM integration for rulebook question answering
- JWT for authentication (future feature)

## Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── models/           # Database models
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic
│   │   ├── llm/          # LLM integration
│   │   ├── rule/         # Rule processing
│   │   └── user/         # User management
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── app.ts            # Express application setup
├── data/                 # NBA rulebook data
├── tests/                # Unit and integration tests
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### Chat Endpoints

- `POST /api/chat` - Send a message and get a response
- `GET /api/chat/history` - Get conversation history

### Rule Endpoints

- `GET /api/rules` - Get all rule sections
- `GET /api/rules/:id` - Get a specific rule section
- `GET /api/rules/search` - Search rules by keywords

### User Endpoints (Future)

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile

## Key Components

### LLM Service

- **Model Integration**: Connection to fine-tuned language model
- **Context Management**: Maintains conversation context
- **Response Generation**: Processes queries and generates responses

### Rule Processing Service

- **Rule Indexing**: Parses and indexes rulebook sections
- **Semantic Search**: Finds relevant rules based on queries
- **Citation Extraction**: Identifies specific rule references

### Data Storage

- **MongoDB Collections**:
  - `rules`: NBA rulebook sections and subsections
  - `conversations`: User chat history
  - `users`: User accounts (future)

## Implementation Plan

1. **Phase 1: Setup and Structure**
   - Project configuration
   - Express server setup
   - Database connection

2. **Phase 2: Data Processing**
   - Rulebook parsing and storage
   - Rule indexing and search functionality

3. **Phase 3: LLM Integration**
   - Model integration
   - Query processing
   - Response generation

4. **Phase 4: API Development**
   - Endpoint implementation
   - Request validation
   - Response formatting

5. **Phase 5: Testing and Optimization**
   - Unit and integration testing
   - Performance optimization
   - Error handling improvement

## Getting Started

Instructions for setting up the development environment will be added soon.