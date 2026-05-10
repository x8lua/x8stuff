import { RobloxUser, RobloxThumbnailResponse, RobloxUserSearchResponse } from '../types';

// Proxies
// Using 'random' query param on the target URL to bust proxy caches
const PROXY_GENERATORS = [
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
];

const ROBLOX_SEARCH_API = 'https://users.roblox.com/v1/users/search';
const ROBLOX_THUMBNAIL_API = 'https://thumbnails.roblox.com/v1/users/avatar-headshot';

async function fetchWithFallback(targetUrl: string): Promise<Response> {
  let lastError: any;

  // Randomize proxy order to distribute load and avoid sticky bad nodes
  const proxies = [...PROXY_GENERATORS].sort(() => Math.random() - 0.5);

  for (const generateProxyUrl of proxies) {
    try {
      const proxyUrl = generateProxyUrl(targetUrl);
      
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(id);

      // If 429 (Rate Limit) or 403 (Forbidden), try next proxy
      if (response.status === 429 || response.status === 403) {
        continue;
      }

      if (response.ok) {
        return response;
      }
      
      // If 404, it means the Roblox endpoint returned 404 (User not found usually)
      if (response.status === 404) return response;

    } catch (e) {
      lastError = e;
    }
  }

  throw lastError || new Error("Network error: Unable to reach Roblox API.");
}

export const searchRobloxUser = async (username: string): Promise<RobloxUser | null> => {
  try {
    // 1. Search for User
    // Use Math.random() for aggressive cache busting on proxies
    const cacheBust = Math.floor(Math.random() * 1000000);
    const searchUrl = `${ROBLOX_SEARCH_API}?keyword=${encodeURIComponent(username)}&limit=10&_cb=${cacheBust}`;
    
    const userResponse = await fetchWithFallback(searchUrl);

    if (!userResponse.ok) {
        // If 404, it just means no results found by that endpoint
        if (userResponse.status === 404) return null;
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
    const thumbUrl = `${ROBLOX_THUMBNAIL_API}?userIds=${targetUser.id}&size=420x420&format=Png&isCircular=false&_cb=${cacheBust}`;
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
        console.warn("Thumbnail fetch failed, using default");
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