# RuleBook Bot: NBA Rulebook Assistant

A conversational AI assistant that helps users understand and navigate the NBA rulebook through natural language interactions.

## 🏀 Overview

The RuleBook Bot is an interactive chatbot designed to make the NBA rulebook more accessible and easier to understand. Users can ask questions about specific rules, situations, or interpretations in natural language, and receive accurate, contextual responses with references to the official rulebook.

![RuleBook Bot Screenshot](docs/screenshots/placeholder.png)

## ✨ Features

- **Natural Language Rule Queries**: Ask about any NBA rule in conversational language
- **Rule Citations**: Bot responses include specific rule citations for reference
- **Interactive Rule Browsing**: Explore the rulebook by sections and categories
- **Example Scenarios**: View practical examples of rule applications
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- React.js with TypeScript
- Material-UI component framework
- Context API for state management
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB for data storage
- LLM integration for natural language understanding
- TypeScript for type safety

### AI/ML
- Fine-tuned language model on NBA rulebook content
- Semantic search for relevant rule identification
- Context-aware response generation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/rulebook-bot-nba-rulebook.git
   cd rulebook-bot-nba-rulebook
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both client and server directories based on provided examples

4. Start the development servers:
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In a separate terminal, start the frontend
   cd client
   npm start
   ```

5. Access the application at `http://localhost:3000`

## 📚 Documentation

- [Architecture Overview](docs/architecture.md)
- [API Documentation](server/README.md)
- [Frontend Documentation](client/README.md)
- [Model Training](models/README.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

For questions or feedback, please open an issue in the GitHub repository.

---

*This project is not affiliated with or endorsed by the National Basketball Association (NBA). The NBA rulebook content is used for educational purposes.*