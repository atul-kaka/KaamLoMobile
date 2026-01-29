#!/bin/bash

# Script to help setup Android SDK for building APK

set -e

echo "🔧 Android SDK Setup Helper"
echo ""

# Check if SDK already exists
SDK_PATH=""
if [ -d "$HOME/Library/Android/sdk" ]; then
    SDK_PATH="$HOME/Library/Android/sdk"
    echo "✅ Found Android SDK at: $SDK_PATH"
elif [ -d "$HOME/Android/Sdk" ]; then
    SDK_PATH="$HOME/Android/Sdk"
    echo "✅ Found Android SDK at: $SDK_PATH"
else
    echo "❌ Android SDK not found"
    echo ""
    echo "Please install Android SDK first:"
    echo ""
    echo "Option 1: Install Android Studio (Recommended)"
    echo "  1. Download from: https://developer.android.com/studio"
    echo "  2. Install and open Android Studio"
    echo "  3. Complete setup wizard (SDK will be installed automatically)"
    echo "  4. Find SDK location: Preferences → Android SDK"
    echo ""
    echo "Option 2: Install Command Line Tools"
    echo "  brew install --cask android-commandlinetools"
    echo ""
    read -p "Enter your Android SDK path (or press Enter to skip): " SDK_PATH
fi

if [ -n "$SDK_PATH" ] && [ -d "$SDK_PATH" ]; then
    # Create local.properties
    echo "sdk.dir=$SDK_PATH" > android/local.properties
    echo ""
    echo "✅ SDK configured in android/local.properties"
    echo "   SDK Location: $SDK_PATH"
    echo ""
    echo "You can now build the APK:"
    echo "  cd android && ./gradlew assembleRelease"
else
    echo ""
    echo "⚠️  SDK path not configured"
    echo ""
    echo "To manually configure:"
    echo "  1. Find your Android SDK location"
    echo "  2. Edit android/local.properties"
    echo "  3. Add: sdk.dir=/path/to/your/android/sdk"
fi
