/**
 * Hook to fetch and manage ImgBB image URLs (Mobile Version)
 * Matches the web app's useImgBBImages hook logic
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchImgBBImageUrls, clearImgBBCache } from '../services/imgbbService';
import type { ImgBBImageUrls } from '../services/imgbbService';
import { Image } from 'react-native';

export interface UseImgBBImagesReturn {
  imageUrls: ImgBBImageUrls;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  clearCache: () => void;
}

/**
 * Preload images in parallel for faster loading
 */
async function preloadImages(imageUrls: string[]): Promise<void> {
  try {
    await Promise.allSettled(
      imageUrls.map(url => Image.prefetch(url))
    );
  } catch (error) {
    // Silently handle preload errors - images will still load when rendered
    console.warn('[useImgBBImages] Preload error:', error);
  }
}

/**
 * Hook to fetch ImgBB image URLs
 * Automatically fetches on mount and caches results
 */
export function useImgBBImages(): UseImgBBImagesReturn {
  const [imageUrls, setImageUrls] = useState<ImgBBImageUrls>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUrls = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch URLs (use cache if available for instant loading)
      const urls = await fetchImgBBImageUrls(forceRefresh);
      setImageUrls(urls);
      
      // Stop loading immediately - show images right away
      setLoading(false);
      
      // Preload images in background (don't wait)
      const imageUrlArray = Object.values(urls).filter((url): url is string => typeof url === 'string' && url.length > 0);
      if (imageUrlArray.length > 0) {
        console.log('[useImgBBImages] Preloading', imageUrlArray.length, 'images in background...');
        // Don't await - let it run in background
        preloadImages(imageUrlArray).catch(() => {
          // Silently fail - images will load when rendered
        });
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch ImgBB images');
      setError(error);
      console.error('[useImgBBImages] Error:', error);
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchUrls(true);
  }, [fetchUrls]);

  const clearCache = useCallback(() => {
    clearImgBBCache();
    fetchUrls(true);
  }, [fetchUrls]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  return {
    imageUrls,
    loading,
    error,
    refresh,
    clearCache,
  };
}

