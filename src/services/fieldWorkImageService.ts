/**
 * Field Work Image Service
 * 
 * Fetches field work images from ImgBB album URLs
 * Uses MMKV for caching
 */

import { StorageService } from './storage';

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Get cache key for an album URL
 */
function getCacheKey(albumUrl: string): string {
  const urlHash = albumUrl.split('/').pop() || albumUrl;
  return `fieldwork_${urlHash}`;
}

function getExpiryKey(albumUrl: string): string {
  const urlHash = albumUrl.split('/').pop() || albumUrl;
  return `fieldwork_expiry_${urlHash}`;
}

/**
 * Get cached field work images
 */
function getCachedFieldWorkImages(albumUrl: string): string[] | null {
  try {
    const cacheKey = getCacheKey(albumUrl);
    const expiryKey = getExpiryKey(albumUrl);
    
    const expiry = StorageService.getNumber(expiryKey);
    if (!expiry || Date.now() > expiry) {
      return null; // Cache expired
    }

    const cached = StorageService.getObject<string[]>(cacheKey);
    if (Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
  } catch (error) {
    console.error('[FieldWorkImageService] Error reading cache:', error);
  }
  return null;
}

/**
 * Cache field work images
 */
function cacheFieldWorkImages(albumUrl: string, images: string[]): void {
  try {
    const cacheKey = getCacheKey(albumUrl);
    const expiryKey = getExpiryKey(albumUrl);
    
    StorageService.setObject(cacheKey, images);
    StorageService.setNumber(expiryKey, Date.now() + CACHE_DURATION);
  } catch (error) {
    console.error('[FieldWorkImageService] Error caching images:', error);
  }
}

/**
 * Extract image URLs from HTML using regex (React Native compatible)
 */
function extractImageUrlsFromHTML(html: string): string[] {
  const urls: string[] = [];
  
  // Pattern 1: Direct image links in href attributes
  const hrefPattern = /href=["']?(https?:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>)]+\.(jpg|jpeg|png|JPG|JPEG|PNG))["']?/gi;
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }
  
  // Pattern 2: Image src attributes
  const srcPattern = /src=["']?(https?:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>)]+\.(jpg|jpeg|png|JPG|JPEG|PNG))["']?/gi;
  while ((match = srcPattern.exec(html)) !== null) {
    if (match[1]) {
      urls.push(match[1]);
    }
  }
  
  // Pattern 3: Direct URLs in text
  const directUrlPattern = /https?:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^\s<>"']+\.(jpg|jpeg|png|JPG|JPEG|PNG)/gi;
  while ((match = directUrlPattern.exec(html)) !== null) {
    if (match[0]) {
      urls.push(match[0]);
    }
  }
  
  // Pattern 4: Data attributes
  const dataPattern = /data-(src|lazy-src|original)=["']?(https?:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>)]+\.(jpg|jpeg|png|JPG|JPEG|PNG))["']?/gi;
  while ((match = dataPattern.exec(html)) !== null) {
    if (match[2]) {
      urls.push(match[2]);
    }
  }
  
  // Clean and normalize URLs
  const cleanedUrls = urls
    .map(url => {
      // Remove query parameters and fragments
      try {
        const urlObj = new URL(url);
        return urlObj.origin + urlObj.pathname;
      } catch {
        return url.split('?')[0].split('#')[0];
      }
    })
    .filter(url => url && url.includes('i.ibb.co'));
  
  // Remove duplicates and return
  const uniqueUrls = Array.from(new Set(cleanedUrls));
  
  console.log(`[FieldWorkImageService] Extracted ${uniqueUrls.length} unique image URLs`);
  if (uniqueUrls.length > 0) {
    console.log('[FieldWorkImageService] First 3 URLs:', uniqueUrls.slice(0, 3));
  }
  
  return uniqueUrls;
}

/**
 * Fetch album page HTML using CORS proxy
 */
async function fetchAlbumPage(albumUrl: string): Promise<string> {
  console.log('[FieldWorkImageService] Fetching album:', albumUrl);
  
  // Use CORS proxy since ImgBB blocks direct CORS requests
  const corsProxies = [
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(albumUrl)}`,
    `https://api.allorigins.win/get?url=${encodeURIComponent(albumUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(albumUrl)}`,
  ];
  
  for (let i = 0; i < corsProxies.length; i++) {
    const proxyUrl = corsProxies[i];
    try {
      const proxyName = proxyUrl.includes('codetabs') ? 'codetabs' : 
                       proxyUrl.includes('allorigins') ? 'allorigins' : 
                       'corsproxy';
      console.log(`[FieldWorkImageService] Trying CORS proxy ${i + 1}/${corsProxies.length}: ${proxyName}`);
      
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/html, */*',
        },
      });
      
      if (!response.ok) {
        continue; // Try next proxy
      }
      
      // Handle different proxy response formats
      const contentType = response.headers.get('content-type') || '';
      let html: string = '';
      
      if (contentType.includes('application/json')) {
        const data = await response.json();
        html = typeof data === 'string' ? data : (data.contents || data?.data || '');
      } else {
        html = await response.text();
      }
      
      if (typeof html === 'string' && html.length > 100) {
        console.log(`[FieldWorkImageService] Successfully fetched via ${proxyName} proxy`);
        return html;
      }
    } catch (error) {
      console.warn(`[FieldWorkImageService] Proxy failed, trying next...`);
      continue;
    }
  }
  
  throw new Error('Failed to fetch album page via all proxies');
}

/**
 * Fetch field work images from ImgBB album
 * Synchronously fetches images - waits for completion before returning
 */
export async function fetchFieldWorkImages(albumUrl: string, forceRefresh = false): Promise<string[]> {
  try {
    // Check cache first (unless forcing refresh)
    if (!forceRefresh) {
      const cached = getCachedFieldWorkImages(albumUrl);
      if (cached && cached.length > 0) {
        console.log(`[FieldWorkImageService] Using ${cached.length} cached images`);
        return cached;
      }
    }

    // Synchronously fetch fresh images (wait for completion)
    console.log('[FieldWorkImageService] Cache not available, fetching fresh images synchronously...');
    const html = await fetchAlbumPage(albumUrl);
    const urls = extractImageUrlsFromHTML(html);
    
    if (urls.length > 0) {
      // Cache the results
      cacheFieldWorkImages(albumUrl, urls);
      console.log(`[FieldWorkImageService] Fetched and cached ${urls.length} images synchronously`);
      return urls;
    } else {
      console.warn('[FieldWorkImageService] No images found in album');
      // Try to return expired cache if available
      const expiredCache = getCachedFieldWorkImages(albumUrl);
      if (expiredCache && expiredCache.length > 0) {
        console.log('[FieldWorkImageService] Using expired cache as fallback');
        return expiredCache;
      }
      return [];
    }
  } catch (error) {
    console.error('[FieldWorkImageService] Error fetching images:', error);
    
    // Try to return cached data even if expired
    const cached = getCachedFieldWorkImages(albumUrl);
    if (cached && cached.length > 0) {
      console.log('[FieldWorkImageService] Using expired cache as fallback');
      return cached;
    }
    
    return [];
  }
}

/**
 * Clear cache for a specific album
 */
export function clearFieldWorkImageCache(albumUrl: string): void {
  try {
    const cacheKey = getCacheKey(albumUrl);
    const expiryKey = getExpiryKey(albumUrl);
    
    StorageService.delete(cacheKey);
    StorageService.delete(expiryKey);
    
    console.log('[FieldWorkImageService] Cache cleared for album:', albumUrl);
  } catch (error) {
    console.error('[FieldWorkImageService] Error clearing cache:', error);
  }
}

