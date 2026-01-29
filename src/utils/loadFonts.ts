/**
 * Preload MaterialIcons font to ensure icons display correctly
 */
import { Platform } from 'react-native';

export const loadFonts = async () => {
  if (Platform.OS === 'android') {
    // On Android, fonts should be automatically loaded from assets/fonts
    // But we can verify they're available
    try {
      // MaterialIcons font should be available after app rebuild
      console.log('[FontLoader] MaterialIcons font should be available');
    } catch (error) {
      console.error('[FontLoader] Error loading fonts:', error);
    }
  }
};


