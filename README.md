# AI Translator App

## Overview

AI Translator is a modern web application that leverages OpenAI's GPT-4 model for accurate text translations. Built with React and TypeScript, it currently supports French, Spanish, and Japanese languages with real-time translation capabilities.

## Core Features

- Seamless real-time translation
- Support for multiple languages (French, Spanish, Japanese)
- Modern, responsive interface
- Context-aware translations powered by GPT-4
- Error handling and loading states
- Character count and input validation

## Technical Stack

- React 19 + TypeScript
- Vite for fast development and building
- SASS for structured styling
- OpenAI API integration
- ESLint + Prettier for code quality
- React Context for state management
- Tailwind CSS

## Setup Guide

### Requirements

- Node.js 18+
- npm/yarn
- OpenAI API key

### Quick Start

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment:

```bash
cp .env.example .env
# Add your OpenAI API key to .env
```

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run code linting
```

## Project Architecture

```
src/
├── components/    # Reusable UI components
├── contexts/      # React contexts
├── services/      # API and utility services
├── styles/       # SASS modules
└── types/        # TypeScript definitions
```

## Security Notes

- API key should be stored securely
- Consider implementing rate limiting
- Add proper error boundaries
- Implement input sanitization

## License

Private project.
