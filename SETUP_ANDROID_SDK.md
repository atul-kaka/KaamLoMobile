# Setup Android SDK for Building APK

## Problem
The build is failing because Android SDK location is not configured.

## Solution Options

### Option 1: Install Android Studio (Recommended - Easiest)

1. **Download Android Studio:**
   - Visit: https://developer.android.com/studio
   - Download and install Android Studio

2. **Open Android Studio:**
   - Launch Android Studio
   - Complete the setup wizard (it will download SDK automatically)

3. **Find SDK Location:**
   - Open Android Studio
   - Go to: **Preferences** → **Appearance & Behavior** → **System Settings** → **Android SDK**
   - Copy the "Android SDK Location" path (usually: `/Users/YOUR_USERNAME/Library/Android/sdk`)

4. **Update local.properties:**
   ```bash
   cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile/android
   ```
   
   Edit `local.properties` and add:
   ```
   sdk.dir=/Users/vahubenterprises/Library/Android/sdk
   ```
   
   (Replace with your actual SDK path)

### Option 2: Install Android SDK Command Line Tools

1. **Download Command Line Tools:**
   ```bash
   cd ~
   mkdir -p android-sdk
   cd android-sdk
   ```
   
   Download from: https://developer.android.com/studio#command-tools
   
   Or use Homebrew:
   ```bash
   brew install --cask android-commandlinetools
   ```

2. **Set up SDK:**
   ```bash
   export ANDROID_HOME=~/android-sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   
   # Accept licenses
   yes | sdkmanager --licenses
   
   # Install required packages
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

3. **Update local.properties:**
   ```bash
   cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile/android
   ```
   
   Edit `local.properties` and add:
   ```
   sdk.dir=/Users/vahubenterprises/android-sdk
   ```

### Option 3: Quick Setup Script

Run this script to automatically detect and configure SDK:

```bash
cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile

# Try to find SDK in common locations
SDK_PATH=""
if [ -d "$HOME/Library/Android/sdk" ]; then
    SDK_PATH="$HOME/Library/Android/sdk"
elif [ -d "$HOME/Android/Sdk" ]; then
    SDK_PATH="$HOME/Android/Sdk"
fi

if [ -n "$SDK_PATH" ]; then
    echo "sdk.dir=$SDK_PATH" > android/local.properties
    echo "✅ SDK configured: $SDK_PATH"
else
    echo "❌ SDK not found. Please install Android Studio or SDK first."
fi
```

## Verify Setup

After configuring, verify the SDK location:

```bash
cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile/android
cat local.properties
```

Should show:
```
sdk.dir=/path/to/your/android/sdk
```

## Required SDK Components

Make sure these are installed:
- Android SDK Platform 34 (or your target SDK version)
- Android SDK Build-Tools
- Android SDK Platform-Tools
- Android SDK Command-line Tools

## After Setup

Once `local.properties` is configured, try building again:

```bash
cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile/android
./gradlew clean
./gradlew assembleRelease
```
