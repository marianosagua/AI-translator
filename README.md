# AI Translator App

## Overview

AI Translator is a React-based web application that provides real-time text translation using OpenAI's GPT-4 model. The application offers translation capabilities for French, Spanish, and Japanese languages.

## Features

- Clean and simple user interface
- Real-time text translation
- Support for multiple languages
- Built with modern React and TypeScript
- Powered by OpenAI's GPT-4 model

## Tech Stack

- React 19
- TypeScript
- Vite
- SASS
- OpenAI API
- ESLint

## Getting Started

### Prerequisites

- Node.js (latest LTS version)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:

```
VITE_OPENAI_API_KEY=your_api_key_here
```

### Development

Run the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

## Project Structure

- `/src` - Source code
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point
  - `index.scss` - Global styles

## License

Private project

## Notes

- This application uses client-side API calls to OpenAI. In production, it's recommended to use a backend service to secure your API key.
- The project uses modern ESM modules and the latest React features.
