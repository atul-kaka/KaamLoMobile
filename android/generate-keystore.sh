#!/bin/bash

# Script to generate keystore for KaamLo Android app
# This will prompt you for passwords interactively

cd "$(dirname "$0")/app"

KEYSTORE_NAME="kaamlo-release-key.keystore"
KEY_ALIAS="kaamlo-key-alias"
VALIDITY_DAYS=10000

echo "=========================================="
echo "Generating Keystore for KaamLo Android App"
echo "=========================================="
echo ""
echo "You will be prompted to enter:"
echo "  1. Keystore password (remember this!)"
echo "  2. Key password (can be same as keystore password)"
echo "  3. Your name/organization details"
echo ""
echo "⚠️  IMPORTANT: Save these passwords securely!"
echo "   You'll need them for all future app updates."
echo ""
read -p "Press Enter to continue..."

keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore "$KEYSTORE_NAME" \
  -alias "$KEY_ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity $VALIDITY_DAYS

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Keystore generated successfully!"
  echo "📁 Location: android/app/$KEYSTORE_NAME"
  echo ""
  echo "Next: Update android/keystore.properties with your passwords"
else
  echo ""
  echo "❌ Failed to generate keystore"
  exit 1
fi
