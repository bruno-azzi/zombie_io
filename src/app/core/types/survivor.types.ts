export interface Survivor {
  id?: string;
  name: string;
  age: number;
  gender: string;
  lonlat: string;
  items: Inventory;
  infected?: boolean;
  initialLetters?: string;
  location?: string;
}

export interface Inventory {
  fijiWater?: number;
  campbellSoup?: number;
  firstAid?: number;
  ak47?: number;
}

export interface SurvivorPayload {
  id?: string;
  name: string;
  age: number;
  gender: string;
  lonlat: string;
  items?: string;
}

export interface ApiItem {
  item: { name: string, points: number };
  quantity: number;
}
