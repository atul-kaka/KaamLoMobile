#!/bin/bash

# Script to build Android Release APK for KaamLo
# Make sure Java JDK is installed before running this script

set -e

echo "🔨 Building Android Release APK for KaamLo..."
echo ""

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed or not in PATH"
    echo ""
    echo "Please install Java JDK first:"
    echo "  brew install --cask zulu@17"
    echo ""
    echo "Or download from: https://www.azul.com/downloads/?package=jdk"
    echo ""
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -1)
echo "✅ Java found: $JAVA_VERSION"
echo ""

# Navigate to Android directory
cd "$(dirname "$0")/android"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew clean

# Build release APK
echo ""
echo "📦 Building release APK..."
./gradlew assembleRelease

# Check if APK was created
APK_PATH="app/build/outputs/apk/release/app-release.apk"
if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo ""
    echo "✅ Release APK built successfully!"
    echo ""
    echo "📱 APK Location:"
    echo "   $(pwd)/$APK_PATH"
    echo ""
    echo "📊 APK Size: $APK_SIZE"
    echo ""
    echo "You can now install this APK on Android devices or upload to Play Store"
else
    echo ""
    echo "❌ APK not found at expected location: $APK_PATH"
    echo "   Check the build output above for errors"
    exit 1
fi
