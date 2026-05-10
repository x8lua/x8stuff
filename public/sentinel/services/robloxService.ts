import { RobloxUser, RobloxThumbnailResponse, RobloxUserSearchResponse } from '../types';

// Proxies
// 1. corsproxy.io: Generally reliable, passes through headers.
// 2. allorigins: Good fallback, using 'raw' to get direct JSON.
const PROXY_GENERATORS = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}&disableCache=true`,
];

const ROBLOX_SEARCH_API = 'https://users.roblox.com/v1/users/search';
const ROBLOX_THUMBNAIL_API = 'https://thumbnails.roblox.com/v1/users/avatar-headshot';

async function fetchWithFallback(targetUrl: string): Promise<Response> {
  let lastError: any;

  // Simple retry logic with proxies
  for (const generateProxyUrl of PROXY_GENERATORS) {
    try {
      const proxyUrl = generateProxyUrl(targetUrl);
      
      // Add a timeout to prevent hanging requests
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(id);

      // Handle Rate Limiting (429) or Forbidden (403)
      if (response.status === 429 || response.status === 403) {
        console.warn(`Proxy ${proxyUrl} hit rate limit/forbidden (${response.status}).`);
        continue; // Try next proxy
      }

      if (response.ok) {
        return response;
      }
      
      // If 404, the resource genuinely doesn't exist. Don't retry.
      if (response.status === 404) return response;

    } catch (e) {
      console.warn(`Proxy fetch failed`, e);
      lastError = e;
    }
  }

  throw lastError || new Error("Unable to connect to Roblox API via proxies.");
}

export const searchRobloxUser = async (username: string): Promise<RobloxUser | null> => {
  try {
    // 1. Search for User
    // ADD TIMESTAMP to prevent proxy caching of previous results
    const timestamp = Date.now();
    const searchUrl = `${ROBLOX_SEARCH_API}?keyword=${encodeURIComponent(username)}&limit=10&_t=${timestamp}`;
    
    const userResponse = await fetchWithFallback(searchUrl);

    if (!userResponse.ok) {
      throw new Error(`API Error: ${userResponse.status}`);
    }

    const userData: RobloxUserSearchResponse = await userResponse.json();

    if (!userData.data || userData.data.length === 0) {
      return null;
    }

    // Exact match check (case insensitive)
    const targetUser = userData.data.find(u => u.name.toLowerCase() === username.toLowerCase()) || userData.data[0];

    if (!targetUser) {
        return null;
    }

    // 2. Get User Avatar
    // Also add timestamp here
    const thumbUrl = `${ROBLOX_THUMBNAIL_API}?userIds=${targetUser.id}&size=420x420&format=Png&isCircular=false&_t=${timestamp}`;
    let avatarUrl = 'https://tr.rbxcdn.com/53eb9b17fe1432a809c73a13889b5006/420/420/Image/Png'; 
    
    try {
        const thumbResponse = await fetchWithFallback(thumbUrl);
        if (thumbResponse.ok) {
            const thumbData: RobloxThumbnailResponse = await thumbResponse.json();
            if (thumbData.data && thumbData.data.length > 0 && thumbData.data[0].state === 'Completed') {
                avatarUrl = thumbData.data[0].imageUrl;
            }
        }
    } catch (e) {
        // Ignore thumbnail errors, use fallback
    }

    return {
      id: targetUser.id,
      username: targetUser.name,
      displayName: targetUser.displayName,
      avatarUrl: avatarUrl
    };

  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
};