# 🐍 Snake

A classic Snake game built with React Native and Expo.

## Tech Stack

- **React Native** 0.85.3
- **Expo** ~56.0.9
- **TypeScript** ~6.0.3
- **react-native-gesture-handler** — swipe controls
- **@react-native-async-storage/async-storage** — high score persistence

## Getting Started

**Prerequisites:** Node v24+, npm v11+

```bash
npm install
npm start
```

Then scan the QR code with Expo Go, or run on a simulator:

```bash
npm run android
npm run ios
```

## Features

- Swipe gesture controls
- Speed increases as score grows
- High score saved locally
- Responsive game board (adapts to any screen size)
- Start screen & game over screen

## Project Structure

```
components/   # UI components (Game, Snake, Food, Header, ...)
utils/        # Game logic (collision, food, movement)
types/        # TypeScript types
styles/       # Colors
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run format:fix` | Format code with Prettier |
