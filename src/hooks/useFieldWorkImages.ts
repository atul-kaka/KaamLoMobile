/**
 * Hook to fetch field work images from ImgBB album URL (Mobile Version)
 * Matches the web app's useFieldWorkImages hook logic
 */

import { useState, useEffect } from 'react';
import { fetchFieldWorkImages } from '../services/fieldWorkImageService';

const MIN_LOADER_TIME = 1500; // Minimum 1.5 seconds to show loader (prevents flash)
const MAX_LOADER_TIME = 30000; // Maximum 30 seconds before giving up (proxies can be slow)

export interface UseFieldWorkImagesReturn {
  images: string[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch field work images from an ImgBB album URL
 * Hides loader once URLs are fetched (not waiting for images to load)
 */
export function useFieldWorkImages(albumUrl: string | null | undefined): UseFieldWorkImagesReturn {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!albumUrl) {
      console.log('[useFieldWorkImages] No album URL provided');
      setImages([]);
      setLoading(false);
      return;
    }

    console.log('[useFieldWorkImages] Fetching images from:', albumUrl);
    let minLoaderTimeout: ReturnType<typeof setTimeout>;
    let maxLoaderTimeout: ReturnType<typeof setTimeout>;
    let isMounted = true;
    const startTime = Date.now();

    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        setImages([]); // Clear previous images
        
        // Set maximum timeout to give up after 30 seconds
        maxLoaderTimeout = setTimeout(() => {
          if (isMounted) {
            console.warn('[useFieldWorkImages] Maximum timeout reached, giving up');
            setLoading(false);
          }
        }, MAX_LOADER_TIME);

        // Fetch image URLs
        const fetchedImages = await fetchFieldWorkImages(albumUrl, false);
        const elapsedTime = Date.now() - startTime;
        
        if (isMounted) {
          // Clear max timeout
          clearTimeout(maxLoaderTimeout);
          
          // Always set images (even if empty) so we can show "no images" state
          setImages(fetchedImages);
          
          // Hide loader once URLs are fetched (images will load when rendered)
          // Ensure loader shows for minimum time to prevent flash
          if (elapsedTime < MIN_LOADER_TIME) {
            const remainingTime = MIN_LOADER_TIME - elapsedTime;
            minLoaderTimeout = setTimeout(() => {
              if (isMounted) {
                setLoading(false);
              }
            }, remainingTime);
          } else {
            // URLs fetched quickly, hide loader immediately
            setLoading(false);
          }
        }
      } catch (err) {
        if (isMounted) {
          const error = err instanceof Error ? err : new Error('Failed to fetch field work images');
          console.error('[useFieldWorkImages] Error:', error);
          setError(error);
          clearTimeout(maxLoaderTimeout);
          clearTimeout(minLoaderTimeout);
          setLoading(false);
        }
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
      if (minLoaderTimeout) {
        clearTimeout(minLoaderTimeout);
      }
      if (maxLoaderTimeout) {
        clearTimeout(maxLoaderTimeout);
      }
    };
  }, [albumUrl]);

  return {
    images,
    loading,
    error,
  };
}

