export interface RobloxUserRaw {
  id: number;
  name: string;
  displayName: string;
}

export interface RobloxUser {
  id: number;
  username: string;
  displayName: string;
  avatarUrl: string;
}

export interface BlacklistedUser extends RobloxUser {
  timestamp: number;
}

export interface RobloxThumbnailResponse {
  data:Array<{
    targetId: number;
    state: string;
    imageUrl: string;
  }>;
}

export interface RobloxUserSearchResponse {
  data: Array<RobloxUserRaw>;
}