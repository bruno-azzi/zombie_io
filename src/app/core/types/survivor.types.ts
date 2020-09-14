export interface Survivor {
  id: string;
  name: string;
  age: number;
  gender: string;
  lonlat?: string;
  items: string;
  infected?: boolean;
  initialLetters?: string;
  location?: string;
}
