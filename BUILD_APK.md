# Building Android Release APK

## Prerequisites

1. **Java JDK 17 or higher** must be installed
2. **Android SDK** configured
3. **Keystore file** already exists (✅ `kaamlo-release-key.keystore`)
4. **Keystore properties** configured (✅ `keystore.properties`)

## Quick Build (Recommended)

Run the build script from the project root:

```bash
cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile
./build-release-apk.sh
```

## Manual Build Steps

### Step 1: Install Java JDK (if not installed)

```bash
# Install via Homebrew
brew install --cask zulu@17

# Or download from: https://www.azul.com/downloads/?package=jdk
```

### Step 2: Verify Java Installation

```bash
java -version
# Should show Java 17 or higher
```

### Step 3: Navigate to Android Directory

```bash
cd /Users/vahubenterprises/Documents/Projects/VAHub/Mobile/KaamLoMobile/android
```

### Step 4: Clean Previous Builds

```bash
./gradlew clean
```

### Step 5: Build Release APK

```bash
./gradlew assembleRelease
```

### Step 6: Find Your APK

The signed release APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## APK Information

- **Location**: `android/app/build/outputs/apk/release/app-release.apk`
- **Signed**: Yes (using `kaamlo-release-key.keystore`)
- **Ready for**: Direct installation on devices or Play Store upload

## Troubleshooting

### "Java not found"
- Install Java JDK: `brew install --cask zulu@17`
- Or set JAVA_HOME: `export JAVA_HOME=$(/usr/libexec/java_home -v 17)`

### "Keystore file not found"
- Make sure `kaamlo-release-key.keystore` exists in `android/app/` directory
- Check `keystore.properties` file has correct path

### "Build failed"
- Clean build: `./gradlew clean`
- Check for errors in the build output
- Make sure all dependencies are installed: `npm install`

### "Gradle daemon issues"
```bash
./gradlew --stop
./gradlew assembleRelease
```

## Installing the APK

### On Android Device:
1. Enable "Install from Unknown Sources" in device settings
2. Transfer APK to device
3. Open APK file and install

### Via ADB:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

## Next Steps

- Test the APK on multiple devices
- Upload to Google Play Store (use AAB format: `./gradlew bundleRelease`)
- Distribute to beta testers
