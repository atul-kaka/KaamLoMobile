# KaamLo Mobile App

A React Native mobile application replica of the KaamLo local services web platform.

## Features

- 🏠 **Service Grid**: Browse all available services in a modern grid layout
- 🌐 **Multi-language Support**: English, Hindi, and Marathi
- 💾 **MMKV Storage**: Fast, encrypted local storage
- 📱 **Modern UI**: Clean, user-friendly interface
- 🔍 **Search**: Find services quickly
- 📞 **Direct Contact**: Call or email directly from the app

## Tech Stack

- **React Native** 0.83.1
- **TypeScript**
- **React Navigation** (Stack & Tab navigators)
- **MMKV** for storage
- **React Native Vector Icons**
- **React Native Gesture Handler**
- **React Native Reanimated**

## Installation

1. Install dependencies:
```bash
npm install
```

2. For iOS, install CocoaPods:
```bash
cd ios && pod install && cd ..
```

3. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Project Structure

```
src/
├── assets/          # Images, fonts, etc.
├── components/      # Reusable components
├── constants/       # App constants
├── i18n/           # Internationalization
├── navigation/     # Navigation setup
├── screens/        # Screen components
├── services/       # API services, storage
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## Storage

The app uses MMKV for fast, encrypted local storage. Storage keys are defined in `src/services/storage.ts`.

## Language Support

Languages are managed through the `LanguageContext` and stored in MMKV. Users can switch languages from the menu.

## Development

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent styling
- Add proper error handling
- Write meaningful comments

## License

Copyright © 2026 KaamLo. All rights reserved.
