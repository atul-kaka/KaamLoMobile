# Building Signed AAB for KaamLo Android App

## Prerequisites
- Java JDK installed
- Android SDK configured
- Keystore file generated

## Step 1: Generate Keystore (if not already done)

Run this command in the `android/app` directory:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore kaamlo-release-key.keystore -alias kaamlo-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You will be prompted to enter:
- Keystore password (remember this!)
- Key password (can be same as keystore password)
- Your name, organization, city, state, country code

**Important:** Keep the keystore file and passwords safe! You'll need them for all future updates.

## Step 2: Configure Keystore Properties

1. Copy the example file:
```bash
cd android
cp keystore.properties.example keystore.properties
```

2. Edit `android/keystore.properties` and fill in your details:
```
MYAPP_RELEASE_STORE_FILE=kaamlo-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=kaamlo-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your-actual-store-password
MYAPP_RELEASE_KEY_PASSWORD=your-actual-key-password
```

3. **IMPORTANT:** Add `keystore.properties` to `.gitignore` to keep it secure:
```bash
echo "android/keystore.properties" >> .gitignore
echo "android/app/*.keystore" >> .gitignore
```

## Step 3: Build Signed AAB

From the project root directory, run:

```bash
cd android
./gradlew bundleRelease
```

The signed AAB file will be generated at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## Alternative: Build Signed APK (for testing)

If you need a signed APK instead:

```bash
cd android
./gradlew assembleRelease
```

The signed APK will be at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Troubleshooting

- **"Keystore file not found"**: Make sure `kaamlo-release-key.keystore` is in `android/app/` directory
- **"Password incorrect"**: Double-check your passwords in `keystore.properties`
- **"Build failed"**: Make sure you're in the `android` directory when running gradlew

## Uploading to Play Store

1. Go to Google Play Console
2. Navigate to your app → Release → Production (or Testing)
3. Create a new release
4. Upload the `app-release.aab` file
5. Fill in release notes and submit for review

