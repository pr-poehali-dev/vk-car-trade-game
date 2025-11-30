import type { Car, Player } from './car';

export type TradeStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface TradeOffer {
  id: string;
  fromPlayer: Player;
  toPlayer: Player;
  offeredCar: Car;
  requestedCar?: Car;
  offeredMoney?: number;
  requestedMoney?: number;
  status: TradeStatus;
  createdAt: Date;
  expiresAt: Date;
  message?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: {
    money?: number;
    car?: Car;
    xp?: number;
  };
  completed: boolean;
  icon: string;
}

export interface DailyReward {
  day: number;
  money: number;
  claimed: boolean;
  current: boolean;
}
