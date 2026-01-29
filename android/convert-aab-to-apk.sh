#!/bin/bash

# Script to convert AAB to APK using bundletool
# This allows you to test the AAB file on a device

AAB_FILE="app/build/outputs/bundle/release/app-release.aab"
APK_OUTPUT_DIR="app/build/outputs/apk-from-aab"
BUNDLETOOL_VERSION="1.15.6"
BUNDLETOOL_JAR="bundletool-all-${BUNDLETOOL_VERSION}.jar"

cd "$(dirname "$0")"

echo "=========================================="
echo "Converting AAB to APK for Testing"
echo "=========================================="
echo ""

# Check if AAB exists
if [ ! -f "$AAB_FILE" ]; then
  echo "❌ AAB file not found: $AAB_FILE"
  echo "   Please build the AAB first: ./gradlew bundleRelease"
  exit 1
fi

# Download bundletool if not exists
if [ ! -f "$BUNDLETOOL_JAR" ]; then
  echo "Downloading bundletool..."
  curl -L -o "$BUNDLETOOL_JAR" \
    "https://github.com/google/bundletool/releases/download/${BUNDLETOOL_VERSION}/bundletool-all-${BUNDLETOOL_VERSION}.jar"
  
  if [ $? -ne 0 ]; then
    echo "❌ Failed to download bundletool"
    exit 1
  fi
fi

# Create output directory
mkdir -p "$APK_OUTPUT_DIR"

# Generate APKs from AAB
echo "Converting AAB to APK..."
java -jar "$BUNDLETOOL_JAR" build-apks \
  --bundle="$AAB_FILE" \
  --output="$APK_OUTPUT_DIR/app-release.apks" \
  --mode=universal \
  --ks=app/kaamlo-release-key.keystore \
  --ks-pass=pass:kaamlo2024 \
  --ks-key-alias=kaamlo-key-alias \
  --key-pass=pass:kaamlo2024

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Conversion successful!"
  echo ""
  echo "📦 Universal APK created at:"
  echo "   $APK_OUTPUT_DIR/app-release.apks"
  echo ""
  echo "To extract and install:"
  echo "  1. Rename app-release.apks to app-release.zip"
  echo "  2. Extract the zip file"
  echo "  3. Install universal.apk on your device"
  echo ""
  echo "Or use bundletool to install directly:"
  echo "  java -jar $BUNDLETOOL_JAR install-apks --apks=$APK_OUTPUT_DIR/app-release.apks"
else
  echo ""
  echo "❌ Conversion failed"
  exit 1
fi

