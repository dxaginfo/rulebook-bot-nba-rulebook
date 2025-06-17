# RuleBook Bot Frontend

This directory contains the React frontend application for the RuleBook Bot NBA Rulebook project.

## Technology Stack

- React.js with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API communication
- Context API for state management

## Project Structure

```
client/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Chat/        # Chat interface components
│   │   ├── Layout/      # Layout components
│   │   └── Rule/        # Rule display components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── index.tsx        # Entry point
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Key Features

1. **Chat Interface**
   - Message thread display
   - Message input with send button
   - Chat history preservation
   - Rule citation links

2. **Rule Browser**
   - Categorized rule sections
   - Search functionality
   - Rule detail view

3. **Mobile Responsiveness**
   - Adaptive layout for different screen sizes
   - Touch-friendly interface

## Component Architecture

### Chat Components

- `ChatContainer`: Main container for the chat interface
- `MessageList`: Displays the conversation history
- `MessageItem`: Individual message display (user or bot)
- `MessageInput`: Text input with send button
- `RuleCitation`: Highlighted rule reference with popup detail

### Layout Components

- `Header`: App header with navigation
- `Sidebar`: Navigation sidebar (for desktop)
- `Footer`: App footer with links
- `MobileNav`: Mobile navigation menu

### Rule Components

- `RuleSection`: Displays a section of the rulebook
- `RuleList`: List of rule sections
- `RuleDetail`: Detailed view of a specific rule
- `RuleSearch`: Search interface for rules

## Implementation Plan

1. **Phase 1: Setup and Basic UI**
   - Project structure and dependencies
   - Basic layout components
   - Routing setup

2. **Phase 2: Chat Interface**
   - Message display components
   - Input functionality
   - Basic styling

3. **Phase 3: Rule Display**
   - Rule section components
   - Rule navigation
   - Rule detail view

4. **Phase 4: API Integration**
   - Service layer for backend communication
   - Message sending/receiving
   - Rule data fetching

5. **Phase 5: Polish and Optimization**
   - Responsive design refinement
   - Performance optimization
   - Accessibility improvements

## Getting Started

Instructions for setting up the development environment will be added soon.