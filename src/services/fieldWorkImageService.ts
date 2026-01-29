/**
 * Field Work Image Service
 * 
 * Fetches field work images from Azure Blob Storage
 * Uses getLocalFieldWorkImages utility for image URLs
 * 
 * NOTE: This service now uses Azure Blob Storage instead of ImgBB
 */

import { getLocalFieldWorkImages } from '../utils/getLocalFieldWorkImages';

/**
 * Fetch field work images from Azure Blob Storage for a service ID
 * This is a wrapper around getLocalFieldWorkImages for backward compatibility
 * 
 * @param serviceId - The service ID (e.g., 'carpentry', 'plumber')
 * @param forceRefresh - Whether to force refresh (ignored, kept for compatibility)
 * @returns Array of image URLs from Azure Blob Storage
 */
export async function fetchFieldWorkImages(serviceId: string, forceRefresh = false): Promise<string[]> {
  try {
    // Use the utility function to get images from Azure Blob Storage
    const images = getLocalFieldWorkImages(serviceId);
    console.log(`[FieldWorkImageService] Fetched ${images.length} images for service: ${serviceId}`);
    return images;
  } catch (error) {
    console.error('[FieldWorkImageService] Error fetching images:', error);
    return [];
  }
}

/**
 * Clear cache for a specific service
 * @param serviceId - The service ID to clear cache for
 */
export function clearFieldWorkImageCache(serviceId: string): void {
  try {
    const { clearFieldWorkImageCache: clearCache } = require('../utils/getLocalFieldWorkImages');
    clearCache(serviceId);
    console.log('[FieldWorkImageService] Cache cleared for service:', serviceId);
  } catch (error) {
    console.error('[FieldWorkImageService] Error clearing cache:', error);
  }
}

