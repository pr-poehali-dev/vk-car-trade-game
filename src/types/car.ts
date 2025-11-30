export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  rarity: Rarity;
  price: number;
  image: string;
  speed: number;
  acceleration: number;
  handling: number;
  ownerId?: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  level: number;
  totalValue: number;
  carsCount: number;
}

export interface LeaderboardEntry {
  player: Player;
  rank: number;
  totalValue: number;
}
