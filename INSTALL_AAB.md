# How to Install/Run the AAB File

## Option 1: Install via ADB (Recommended for Testing)

### Prerequisites:
- Android device connected via USB with USB debugging enabled
- ADB installed on your computer

### Steps:

1. **Extract and install using bundletool:**
```bash
cd android
java -jar bundletool-all-1.15.6.jar install-apks \
  --apks=app/build/outputs/apk-from-aab/app-release.apks
```

2. **Or install the universal APK directly:**
```bash
cd android
adb install app/build/outputs/apk-from-aab/universal.apk
```

## Option 2: Manual Installation on Device

1. **Extract the APK:**
   - The APK is already extracted at: `android/app/build/outputs/apk-from-aab/universal.apk`

2. **Transfer to device:**
   - Copy `universal.apk` to your Android device
   - You can use:
     - USB file transfer
     - Email/Cloud storage
     - ADB: `adb push android/app/build/outputs/apk-from-aab/universal.apk /sdcard/Download/`

3. **Install on device:**
   - Open the APK file on your device
   - Allow installation from unknown sources if prompted
   - Tap "Install"

## Option 3: Upload to Google Play Console (Production)

1. Go to [Google Play Console](https://play.google.com/console)
2. Select your app
3. Go to **Release** → **Production** (or Testing track)
4. Click **Create new release**
5. Upload `android/app/build/outputs/bundle/release/app-release.aab`
6. Fill in release notes
7. Review and submit

## Option 4: Build APK Directly (Alternative)

If you prefer to build APK instead of AAB:

```bash
cd android
./gradlew assembleRelease
```

The APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

## Quick Install Command

```bash
# Install directly via ADB
cd /Users/vijay.dokrimare/Documents/Projects/ReactJS/VAHub/Mobiles/KaamLo/android
adb install app/build/outputs/apk-from-aab/universal.apk
```

## Troubleshooting

- **"Device not found"**: Make sure USB debugging is enabled and device is connected
- **"Installation failed"**: Uninstall the previous version first: `adb uninstall com.kaamlo`
- **"Permission denied"**: Enable "Install from unknown sources" in device settings

