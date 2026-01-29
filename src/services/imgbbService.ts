/**
 * ImgBB Service (Mobile Version)
 * 
 * Fetches image URLs dynamically from ImgBB album
 * Caches URLs to avoid refetching on every app launch
 * Uses MMKV Storage instead of localStorage
 * 
 * Matches the web app's logic from local-services
 */

import { StorageService } from './storage';

const ALBUM_URL = 'https://ibb.co/album/5Wm12k';
const CACHE_KEY = '@kaamlo:imgbb_urls';
const CACHE_EXPIRY_KEY = '@kaamlo:imgbb_urls_expiry';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Service ID to expected filename mapping
 * Supports multiple possible filenames (array) for flexible matching
 * Matches the web app's SERVICE_TO_FILENAME
 */
const SERVICE_TO_FILENAME: Record<string, string | string[]> = {
  'websites-mobile-app-development': ['websitemobile.jpg', 'website-mobile.jpg', 'websiteMobile.jpg', 'Website Mobile.jpg', 'websitemobile.JPG', 'website-mobile.JPG'],
  'solar-setup': ['Solar.jpg', 'solar.jpg', 'Solar Setup.jpg', 'solar-setup.jpg', 'Solar-setup.jpg', 'SOLAR.jpg', 'Solar.png', 'solar.png', 'Solar Setup.png', 'solar-setup.png', 'Solar-setup.png', 'SOLAR.png'],
  'plumber': 'plumber.jpg',
  'electrician': 'electrician.jpg',
  'interior-designs': 'interior.jpg',
  'painting': 'painting.jpg',
  'construction': 'construction.jpg',
  'gardening': 'gardening.jpg',
  'carpentry': 'carpentry.jpg',
  'furnitures': 'furnitures.jpg',
  'elevations': 'elevation.jpg',
  'floor-and-tiles': 'floor And Tiles.jpg',
  'glass-homes': 'railing Glass.jpg',
  'layout-planning': 'layout Planning.jpg',
  'office-setup': 'office Setup.jpg',
  'window-doors': 'window Doors.jpg',
  'windows-doors-mesh': 'window Doors.jpg', // Alias for windows-doors-mesh
  'railings': 'railings.jpg',
  'steel-iron-railings': 'railings.jpg', // Alias for steel-iron-railings
  'railing-glass': 'railing Glass.jpg',
  'pop': 'pop.jpg',
  'pop-puc-services': 'pop.jpg', // Alias for pop-puc-services
  'raw-materials': 'raw Materials.jpg',
};

/**
 * Fallback direct URLs from ImgBB
 * These are the actual working URLs from the web app
 * Used as immediate fallback while fetching fresh URLs
 */
const FALLBACK_DIRECT_URLS: Record<string, string> = {
  'websites-mobile-app-development': '', // Will be populated from album
  // NOTE: If solar image doesn't match web app, update this URL to match the web app's solar image URL
  'solar-setup': 'https://i.ibb.co/NgFtM13V/solar.jpg',
  'plumber': 'https://i.ibb.co/G4zWDw4H/plumber.jpg',
  'electrician': 'https://i.ibb.co/ycP5fpDH/electrician.jpg',
  'interior-designs': 'https://i.ibb.co/gMYtZfhb/interior.jpg',
  'painting': 'https://i.ibb.co/tw3DTWDg/painting.jpg',
  'construction': 'https://i.ibb.co/wN4P6kwq/construction.jpg',
  'gardening': 'https://i.ibb.co/N6nhwyPh/gardening.jpg',
  'carpentry': 'https://i.ibb.co/d0jJdDvS/carpentry.jpg',
  'furnitures': 'https://i.ibb.co/FqqgjSb8/furnitures.jpg',
  'elevations': 'https://i.ibb.co/JWVypykV/elevation.jpg',
  'floor-and-tiles': 'https://i.ibb.co/zC2zJKV/floor-And-Tiles.jpg',
  'glass-homes': 'https://i.ibb.co/ZpSTKRtW/railing-Glass.jpg',
  'layout-planning': 'https://i.ibb.co/SwfmNQmg/layout-Planning.jpg',
  'office-setup': 'https://i.ibb.co/qMjQPmXc/office-Setup.jpg',
  'window-doors': 'https://i.ibb.co/PKx2pvh/window-Doors.jpg',
  'windows-doors-mesh': 'https://i.ibb.co/PKx2pvh/window-Doors.jpg',
  'railings': 'https://i.ibb.co/5xnTW1W2/railings.jpg',
  'steel-iron-railings': 'https://i.ibb.co/5xnTW1W2/railings.jpg',
  'railing-glass': 'https://i.ibb.co/ZpSTKRtW/railing-Glass.jpg',
  'pop': 'https://i.ibb.co/FGpbghM/pop.jpg',
  'pop-puc-services': 'https://i.ibb.co/FGpbghM/pop.jpg',
  'raw-materials': 'https://i.ibb.co/kVYnM6FG/raw-Materials.jpg',
};

export interface ImgBBImageUrls {
  [serviceId: string]: string;
}

/**
 * Fetch album page HTML using CORS proxy
 */
async function fetchAlbumPage(): Promise<string> {
  console.log('[ImgBB Service] Fetching album page:', ALBUM_URL);
  
  // Use CORS proxy since ImgBB blocks direct CORS requests
  const corsProxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(ALBUM_URL)}`,
    `https://corsproxy.io/?${encodeURIComponent(ALBUM_URL)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(ALBUM_URL)}`,
  ];
  
  for (const proxyUrl of corsProxies) {
    try {
      const proxyName = proxyUrl.includes('allorigins') ? 'allorigins' : 
                       proxyUrl.includes('corsproxy') ? 'corsproxy' : 
                       'codetabs';
      console.log(`[ImgBB Service] Trying CORS proxy: ${proxyName}`);
      
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
        console.log(`[ImgBB Service] Successfully fetched via ${proxyName} proxy, length:`, html.length);
        return html;
      }
    } catch (error) {
      console.warn(`[ImgBB Service] Proxy failed, trying next...`);
      continue;
    }
  }
  
  throw new Error('Failed to fetch album page: All proxies failed');
}

/**
 * Extract image URLs from HTML
 */
function extractImageUrls(html: string): ImgBBImageUrls {
  const urls: ImgBBImageUrls = {};
  
  // Find all image URLs in the HTML - multiple patterns
  const patterns = [
    /https:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>)]+\.jpg/gi,
    /https:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>)]+\.jpeg/gi,
    /https:\/\/i\.ibb\.co\/[a-zA-Z0-9]+\/[^"'\s<>)]+\.png/gi,
  ];
  
  const foundUrls: string[] = [];
  patterns.forEach(pattern => {
    const matches = html.match(pattern) || [];
    foundUrls.push(...matches);
  });
  
  console.log('[ImgBB Service] Found', foundUrls.length, 'image URLs in HTML');
  
  // Create a map of all found URLs by filename
  const urlMap = new Map<string, string>();
  foundUrls.forEach(url => {
    let filename = url.split('/').pop();
    if (filename) {
      filename = decodeURIComponent(filename);
      urlMap.set(filename.toLowerCase(), url);
    }
  });
  
  console.log('[ImgBB Service] URL map size:', urlMap.size);
  
  // Match URLs to services
  for (const [serviceId, expectedFilename] of Object.entries(SERVICE_TO_FILENAME)) {
    // Handle both single filename (string) and multiple filenames (array)
    const filenamesToTry = Array.isArray(expectedFilename) ? expectedFilename : [expectedFilename];
    let matched = false;
    
    for (const filename of filenamesToTry) {
      const expectedLower = filename.toLowerCase();
      
      // Try exact match
      if (urlMap.has(expectedLower)) {
        urls[serviceId] = urlMap.get(expectedLower)!;
        console.log(`[ImgBB Service] Matched ${serviceId} to ${urls[serviceId]} (exact: ${filename})`);
        matched = true;
        break;
      }
      
      // Try matching with hyphens/spaces normalized
      const expectedNormalized = expectedLower.replace(/[-\s]+/g, '-');
      for (const [mapFilename, url] of urlMap.entries()) {
        const filenameNormalized = mapFilename.replace(/[-\s]+/g, '-');
        if (filenameNormalized === expectedNormalized) {
          urls[serviceId] = url;
          console.log(`[ImgBB Service] Matched ${serviceId} to ${url} (normalized: ${filename})`);
          matched = true;
          break;
        }
        
        // Try partial match
        const expectedName = expectedNormalized.replace(/\.(jpg|jpeg|png)$/i, '');
        const urlName = filenameNormalized.replace(/\.(jpg|jpeg|png)$/i, '');
        if (urlName === expectedName || 
            urlName.includes(expectedName) || 
            expectedName.includes(urlName)) {
          urls[serviceId] = url;
          console.log(`[ImgBB Service] Matched ${serviceId} to ${url} (partial: ${filename})`);
          matched = true;
          break;
        }
      }
      
      if (matched) break;
    }
    
    // Try fuzzy matching for website/mobile related filenames
    if (!matched && serviceId === 'websites-mobile-app-development') {
      for (const [filename, url] of urlMap.entries()) {
        const filenameLower = filename.toLowerCase();
        // Look for any filename containing "website" and "mobile" (in any order)
        if ((filenameLower.includes('website') && filenameLower.includes('mobile')) ||
            (filenameLower.includes('web') && filenameLower.includes('mobile')) ||
            filenameLower.includes('websitemobile')) {
          urls[serviceId] = url;
          console.log(`[ImgBB Service] Matched ${serviceId} to ${url} (fuzzy: ${filename})`);
          matched = true;
          break;
        }
      }
    }
    
    // Try fuzzy matching for solar related filenames
    if (!matched && serviceId === 'solar-setup') {
      for (const [filename, url] of urlMap.entries()) {
        const filenameLower = filename.toLowerCase();
        // Look for any filename containing "solar" (case-insensitive)
        if (filenameLower.includes('solar')) {
          urls[serviceId] = url;
          console.log(`[ImgBB Service] Matched ${serviceId} to ${url} (fuzzy: ${filename})`);
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      const filenamesStr = Array.isArray(expectedFilename) ? expectedFilename.join(', ') : expectedFilename;
      console.warn(`[ImgBB Service] No match found for ${serviceId} (tried: ${filenamesStr})`);
    }
  }
  
  // Handle duplicate mappings (same image for multiple services)
  if (urls['glass-homes'] && !urls['railing-glass']) {
    urls['railing-glass'] = urls['glass-homes'];
  }
  
  // Map aliases for service IDs that use the same images
  if (urls['window-doors'] && !urls['windows-doors-mesh']) {
    urls['windows-doors-mesh'] = urls['window-doors'];
  }
  if (urls['railings'] && !urls['steel-iron-railings']) {
    urls['steel-iron-railings'] = urls['railings'];
  }
  if (urls['pop'] && !urls['pop-puc-services']) {
    urls['pop-puc-services'] = urls['pop'];
  }
  
  return urls;
}

/**
 * Get cached URLs from MMKV Storage
 */
function getCachedUrls(): ImgBBImageUrls | null {
  try {
    const cached = StorageService.getObject<ImgBBImageUrls>(CACHE_KEY);
    const expiry = StorageService.getNumber(CACHE_EXPIRY_KEY);
    
    if (!cached || !expiry) {
      return null;
    }
    
    if (Date.now() > expiry) {
      // Cache expired
      StorageService.delete(CACHE_KEY);
      StorageService.delete(CACHE_EXPIRY_KEY);
      return null;
    }
    
    return cached;
  } catch (error) {
    console.error('[ImgBB Service] Error reading cache:', error);
    return null;
  }
}

/**
 * Cache URLs to MMKV Storage
 */
function cacheUrls(urls: ImgBBImageUrls): void {
  try {
    const expiry = Date.now() + CACHE_DURATION;
    StorageService.setObject(CACHE_KEY, urls);
    StorageService.setNumber(CACHE_EXPIRY_KEY, expiry);
  } catch (error) {
    console.error('[ImgBB Service] Error caching URLs:', error);
  }
}

/**
 * Fetch image URLs from ImgBB album
 * Uses cache if available for instant loading
 * Returns fallback URLs immediately, then fetches fresh URLs in background
 */
export async function fetchImgBBImageUrls(forceRefresh = false): Promise<ImgBBImageUrls> {
  // Try cache first (unless forcing refresh) - instant loading
  if (!forceRefresh) {
    const cached = getCachedUrls();
    if (cached && Object.keys(cached).length > 0) {
      console.log('[ImgBB Service] Using cached URLs (instant)');
      
      // Fetch fresh URLs in background for next time
      fetchAlbumPage()
        .then(html => {
          const urls = extractImageUrls(html);
          if (Object.keys(urls).length > 0) {
            cacheUrls(urls);
            console.log(`[ImgBB Service] Background refresh: cached ${Object.keys(urls).length} URLs`);
          }
        })
        .catch(() => {
          // Silently fail - we have cached URLs
        });
      
      return cached;
    }
  }
  
  // Return fallback URLs immediately for fast loading
  const fallbackUrls = { ...FALLBACK_DIRECT_URLS };
  Object.keys(fallbackUrls).forEach(key => {
    if (!fallbackUrls[key]) {
      delete fallbackUrls[key];
    }
  });
  
  console.log('[ImgBB Service] Using fallback URLs (instant), fetching fresh URLs in background...');
  
  // Fetch fresh URLs in background (don't wait)
  fetchAlbumPage()
    .then(html => {
      const urls = extractImageUrls(html);
      if (Object.keys(urls).length > 0) {
        cacheUrls(urls);
        console.log(`[ImgBB Service] Background fetch: cached ${Object.keys(urls).length} fresh URLs`);
      }
    })
    .catch(error => {
      console.warn('[ImgBB Service] Background fetch failed:', error);
    });
  
  return fallbackUrls;
}

/**
 * Get image URL for a specific service
 */
export async function getImgBBImageUrl(serviceId: string): Promise<string | null> {
  const urls = await fetchImgBBImageUrls();
  return urls[serviceId] || null;
}

/**
 * Clear cache (useful for testing or forcing refresh)
 */
export function clearImgBBCache(): void {
  try {
    StorageService.delete(CACHE_KEY);
    StorageService.delete(CACHE_EXPIRY_KEY);
    console.log('[ImgBB Service] Cache cleared');
  } catch (error) {
    console.error('[ImgBB Service] Error clearing cache:', error);
  }
}

