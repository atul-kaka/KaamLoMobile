/**
 * Hook to fetch field work images from Azure Blob Storage (Mobile Version)
 * Matches the web app's useFieldWorkImages hook logic
 */

import { useState, useEffect } from 'react';
import { getLocalFieldWorkImages } from '../utils/getLocalFieldWorkImages';

const MIN_LOADER_TIME = 500; // Minimum 0.5 seconds to show loader (prevents flash)

export interface UseFieldWorkImagesReturn {
  images: string[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch field work images from Azure Blob Storage using service ID
 * Hides loader once URLs are fetched (not waiting for images to load)
 */
export function useFieldWorkImages(serviceId: string | null | undefined): UseFieldWorkImagesReturn {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!serviceId) {
      console.log('[useFieldWorkImages] No service ID provided');
      setImages([]);
      setLoading(false);
      return;
    }

    console.log('[useFieldWorkImages] Fetching images for service:', serviceId);
    let minLoaderTimeout: ReturnType<typeof setTimeout>;
    let isMounted = true;
    const startTime = Date.now();

    const fetchImages = () => {
      try {
        setLoading(true);
        setError(null);
        setImages([]); // Clear previous images

        // Get image URLs from Azure Blob Storage (synchronous, uses cache)
        const fetchedImages = getLocalFieldWorkImages(serviceId);
        const elapsedTime = Date.now() - startTime;
        
        if (isMounted) {
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
    };
  }, [serviceId]);

  return {
    images,
    loading,
    error,
  };
}

