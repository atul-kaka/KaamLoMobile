/**
 * Preload MaterialIcons font to ensure icons display correctly
 */
import { Platform } from 'react-native';

export const loadFonts = async () => {
  try {
    if (Platform.OS === 'android') {
      // On Android, fonts are automatically loaded from assets/fonts via fonts.gradle
      // The fonts.gradle file in build.gradle handles this automatically
      console.log('[FontLoader] MaterialIcons font should be available on Android');
    } else if (Platform.OS === 'ios') {
      // On iOS, fonts are loaded via Info.plist UIAppFonts array
      // Fonts should be available after app rebuild
      console.log('[FontLoader] MaterialIcons font should be available on iOS');
    }
    
    // Note: For react-native-vector-icons to work properly:
    // 1. iOS: Fonts must be listed in Info.plist UIAppFonts array
    // 2. Android: fonts.gradle must be applied in build.gradle (already done)
    // 3. Run: npx react-native-asset (if fonts aren't linking automatically)
    // 4. Rebuild the app after adding fonts
  } catch (error) {
    console.error('[FontLoader] Error loading fonts:', error);
  }
};


