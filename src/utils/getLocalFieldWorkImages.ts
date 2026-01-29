/**
 * Utility to get field work images for a service from Azure Blob Storage
 * Loads images from https://kaamlo.blob.core.windows.net/kaamloimages/fieldwork/[serviceId]/
 * 
 * Includes caching for better performance using MMKV storage
 * 
 * NOTE: This function is named "getLocalFieldWorkImages" for backward compatibility,
 * but it now loads images from Azure Blob Storage instead of local assets.
 */

import { StorageService } from '../services/storage';

// Azure Blob Storage base URL for fieldwork images
const AZURE_FIELDWORK_BASE_URL = 'https://kaamlo.blob.core.windows.net/kaamloimages/fieldwork/';

// Mapping of service IDs to their image filenames in Azure Blob Storage
const FIELDWORK_IMAGES_MAP: Record<string, string[]> = {
  'carpentry': [
    'Carpentry2.png', 'Carpentry3.png', 'Carpentry4.png', 'Carpentry5.png',
    'Carpentry6.png', 'Carpentry7.png', 'Carpentry8.png', 'Carpentry9.png',
    'Carpentry10.png', 'Carpentry11.png', 'Carpentry12.png', 'Carpentry13.png',
    'Carpentry14.png', 'Carpentry15.png'
  ],
  'construction': [
    'construction1.png', 'construction2.png', 'construction3.png', 'construction5.png',
    'construction6.png', 'construction7.png', 'construction8.png', 'construction9.png',
    'construction10.png', 'construction11.png', 'construction12.png', 'construction13.png',
    'construction14.png', 'construction15.png'
  ],
  'electrician': [
    'electrical1.png', 'electrical2.png', 'electrical3.png', 'electrical4.png',
    'electrical5.png', 'electrical7.png', 'electrical8.png', 'electrical9.png'
  ],
  'elevations': [
    'elevation1.png', 'elevation2.png', 'elevation3.png', 'elevation4.png',
    'elevation5.png', 'elevation6.png', 'elevation7.png', 'elevation8.png'
  ],
  'floor-and-tiles': [
    'tile2.png', 'tile3.png', 'tile4.png', 'tile6.png', 'tile7.png', 'tile8.png',
    'tile9.png', 'tile10.png', 'tile11.png', 'tile13.png', 'tile14.png', 'tile15.png'
  ],
  'furnitures': [
    'furniture1.png', 'furniture3.png', 'furniture4.png', 'furniture6.png',
    'furniture7.png', 'furniture8.png', 'furniture9.png', 'furniture10.png',
    'furniture11.png', 'furniture13.png', 'furniture14.png', 'furniture15.png'
  ],
  'gardening': [
    'gardening1.png', 'gardening2.png', 'gardening3.png', 'gardening4.png',
    'gardening5.png', 'gardening6.png', 'gardening7.png', 'gardening8.png',
    'gardening9.png', 'gardening10.png', 'gardening11.png', 'gardening12.png',
    'gardening13.png', 'gardening14.png', 'gardening15.png'
  ],
  'glass-homes': [
    'glass1.png', 'glass2.png', 'glass3.png', 'glass4.png', 'glass5.png',
    'glass7.png', 'glass8.png', 'glass9.png', 'glass10.png', 'glass11.png',
    'glass13.png', 'glass14.png'
  ],
  'interior-designs': [
    'interior1.png', 'interior2.png', 'interior3.png', 'interior4.png',
    'interior7.png', 'interior8.png', 'interior9.png', 'interior10.png',
    'interior11.png', 'interior12.png'
  ],
  'layout-planning': [
    'layout1.png', 'layout2.png', 'layout4.png', 'layout5.png', 'layout6.png',
    'layout7.png', 'layout9.png', 'layout10.png', 'layout11.png', 'layout12.png',
    'layout13.png', 'layout14.png', 'layout15.png'
  ],
  'office-setup': [
    'office2.png', 'office3.png', 'office4.png', 'office5.png', 'office6.png',
    'office7.png', 'office9.png', 'office12.png', 'office13.png', 'office14.png'
  ],
  'painting': [
    'painting1.png', 'painting2.png', 'painting3.png', 'painting4.png',
    'painting5.png', 'painting6.png', 'painting7.png', 'painting8.png',
    'painting10.png', 'painting11.png', 'painting12.png', 'painting14.png',
    'painting15.png'
  ],
  'plumber': [
    'plumber1.png', 'plumber2.png', 'plumber3.png', 'plumber4.png',
    'plumber5.png', 'plumber7.png', 'plumber9.png', 'plumber11.png',
    'plumber12.png', 'plumber13.png', 'plumber15.png', 'plumber16.png'
  ],
  'pop-puc-services': [
    'pop1.png', 'pop3.png', 'pop4.png', 'pop5.png', 'pop6.png', 'pop7.png',
    'pop9.png', 'pop10.png', 'pop11.png', 'pop12.png', 'pop14.png'
  ],
  'raw-materials': [
    'raw1.png', 'raw2.png', 'raw3.png', 'raw4.png', 'raw5.png', 'raw6.png',
    'raw7.png', 'raw8.png', 'raw9.png', 'raw10.png', 'raw11.png', 'raw13.png',
    'raw14.png', 'raw15.png'
  ],
  'solar-setup': [
    'solar1.png', 'solar2.png', 'solar3.png', 'solar4.png', 'solar5.png',
    'solar6.png', 'solar7.png', 'solar8.png', 'solar9.png', 'solar10.png',
    'solar11.png', 'solar12.png', 'solar13.png', 'solar14.png', 'solar15.png'
  ],
  'steel-iron-railings': [
    'railing1.png', 'railing2.png', 'railing3.png', 'railing4.png',
    'railing5.png', 'railing6.png', 'railing7.png', 'railing8.png',
    'railing10.png', 'railing11.png', 'railing12.png', 'railing13.png',
    'railing14.png'
  ],
  'windows-doors-mesh': [
    'window-Doors1.png', 'window-Doors2.png', 'window-Doors3.png', 'window-Doors4.png',
    'window-Doors5.png', 'window-Doors6.png', 'window-Doors7.png', 'window-Doors8.png',
    'window-Doors9.png'
  ],
  'websites-mobile-app-development': [] // Add if there are images
};

/**
 * In-memory cache for service images
 * Key: serviceId, Value: array of image URLs
 */
const imageCache: Record<string, string[]> = {};

/**
 * Cache key for MMKV storage
 */
const CACHE_KEY_PREFIX = '@kaamlo:fieldwork_images_';
const CACHE_VERSION = '2.0'; // Incremented to force cache clear after Azure migration

/**
 * Get cached images from MMKV storage
 */
function getCachedImages(serviceId: string): string[] | null {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${serviceId}`;
    const cached = StorageService.getObject<{ version: string; images: string[]; timestamp: number }>(cacheKey);
    if (cached) {
      // Verify cache version
      if (cached.version === CACHE_VERSION && Array.isArray(cached.images)) {
        return cached.images;
      }
    }
  } catch (error) {
    console.warn(`[getLocalFieldWorkImages] Error reading cache for ${serviceId}:`, error);
  }
  return null;
}

/**
 * Cache images to MMKV storage
 */
function cacheImages(serviceId: string, images: string[]): void {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${serviceId}`;
    const cacheData = {
      version: CACHE_VERSION,
      images,
      timestamp: Date.now()
    };
    StorageService.setObject(cacheKey, cacheData);
  } catch (error) {
    // Silently fail if storage is full or unavailable
    console.warn(`[getLocalFieldWorkImages] Error caching images for ${serviceId}:`, error);
  }
}

/**
 * Get field work images for a service ID from Azure Blob Storage
 * Returns array of image URLs sorted by filename
 * Uses in-memory cache and MMKV storage for performance
 */
export function getLocalFieldWorkImages(serviceId: string): string[] {
  try {
    if (!serviceId) {
      return [];
    }

    // Check in-memory cache first (fastest)
    if (imageCache[serviceId]) {
      return imageCache[serviceId];
    }

    // Check MMKV cache
    const cachedImages = getCachedImages(serviceId);
    if (cachedImages && cachedImages.length > 0) {
      imageCache[serviceId] = cachedImages;
      return cachedImages;
    }

    // Get image filenames for this service from the mapping
    const imageFilenames = FIELDWORK_IMAGES_MAP[serviceId];
    
    if (!imageFilenames || imageFilenames.length === 0) {
      console.warn(`[getLocalFieldWorkImages] No images found for service: ${serviceId}`);
      return [];
    }

    // Construct Azure Blob Storage URLs
    const imageUrls = imageFilenames.map(filename => {
      // Construct URL directly without encoding (Azure Blob Storage handles it)
      const url = `${AZURE_FIELDWORK_BASE_URL}${serviceId}/${filename}`;
      return url;
    });

    console.log(`[getLocalFieldWorkImages] Generated ${imageUrls.length} URLs for service: ${serviceId}`);

    // Cache in memory
    imageCache[serviceId] = imageUrls;

    // Cache in MMKV for persistence across app restarts
    if (imageUrls.length > 0) {
      cacheImages(serviceId, imageUrls);
    }

    return imageUrls;
  } catch (error) {
    console.error(`[getLocalFieldWorkImages] Error loading images for ${serviceId}:`, error);
    return [];
  }
}

/**
 * Check if a service has local field work images
 */
export function hasLocalFieldWorkImages(serviceId: string): boolean {
  const images = getLocalFieldWorkImages(serviceId);
  return images.length > 0;
}

/**
 * Clear cache for a specific service
 */
export function clearFieldWorkImageCache(serviceId: string): void {
  delete imageCache[serviceId];
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${serviceId}`;
    StorageService.delete(cacheKey);
  } catch (error) {
    console.warn(`[getLocalFieldWorkImages] Error clearing cache for ${serviceId}:`, error);
  }
}

/**
 * Clear all field work image caches
 */
export function clearAllFieldWorkImageCaches(): void {
  Object.keys(imageCache).forEach(key => delete imageCache[key]);
  // Note: MMKV doesn't have a direct way to list all keys, so we'll clear on next access
  console.log('[getLocalFieldWorkImages] All in-memory caches cleared');
}

/**
 * Clear all old caches on load to ensure fresh data after Azure migration
 * This runs once when the module is loaded
 */
(function clearOldCachesOnLoad() {
  try {
    // Clear old cache versions by checking each service
    const serviceIds = Object.keys(FIELDWORK_IMAGES_MAP);
    let clearedCount = 0;
    serviceIds.forEach(serviceId => {
      const cacheKey = `${CACHE_KEY_PREFIX}${serviceId}`;
      const cached = StorageService.getObject<{ version?: string }>(cacheKey);
      if (cached) {
        // Clear old cache versions (before Azure migration)
        if (!cached.version || cached.version < '2.0') {
          StorageService.delete(cacheKey);
          clearedCount++;
        }
      }
    });
    if (clearedCount > 0) {
      console.log(`[getLocalFieldWorkImages] Cleared ${clearedCount} old cache entries`);
    }
  } catch (error) {
    console.warn('[getLocalFieldWorkImages] Error clearing old caches on load:', error);
  }
})();
