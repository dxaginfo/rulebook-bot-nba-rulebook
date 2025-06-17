# RuleBook Bot - NBA Rulebook Assistant

RuleBook Bot is an interactive web application that helps users understand and navigate the complex rules of professional basketball. Using a conversational AI interface and structured rule browser, it makes the NBA rulebook more accessible and understandable for fans, players, and coaches.

## Features

- **AI-Powered Rule Assistant**: Ask questions about NBA rules in natural language and get clear, concise answers
- **Comprehensive Rule Search**: Search through the entire NBA rulebook for specific terms, violations, or procedures
- **Structured Rule Browser**: Browse rules by category for easy navigation
- **Practical Examples**: Learn through real-world examples of rule applications
- **Rule Citations**: Click on rule citations to view detailed explanations

## Architecture

The application is built with a modern tech stack:

### Frontend

- React with TypeScript
- Material UI for component styling
- React Router for navigation
- Context API for state management

### Backend

- Node.js with Express
- TypeScript for type safety
- RESTful API architecture

## Screenshots

[Coming soon]

## Development

### Prerequisites

- Node.js 14+ and npm
- TypeScript

### Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/dxaginfo/rulebook-bot-nba-rulebook.git
cd rulebook-bot-nba-rulebook
```

2. Install dependencies for both client and server

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Run the development environment

```bash
# Start the server (from the server directory)
npm run dev

# In a separate terminal, start the client (from the client directory)
npm start
```

4. Access the application at `http://localhost:3000`

## Deployment

The application is set up for easy deployment:

1. Build the client

```bash
cd client
npm run build
```

2. Build the server

```bash
cd server
npm run build
```

3. Start the production server

```bash
cd server
npm start
```

## Disclaimer

RuleBook Bot is an unofficial educational tool and is not affiliated with or endorsed by the National Basketball Association (NBA). The information provided is intended for educational purposes only.

For official rules and interpretations, please refer to the official NBA rulebook and other NBA publications. This application should not be used for making official rule determinations in professional basketball games.

## License

MIT