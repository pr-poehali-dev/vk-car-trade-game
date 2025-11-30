import type { DailyQuest, DailyReward } from '@/types/trade';

export const dailyQuests: DailyQuest[] = [
  {
    id: 'quest-1',
    title: 'Купить машину',
    description: 'Купите любую машину на маркете',
    progress: 0,
    target: 1,
    reward: { money: 5000, xp: 100 },
    completed: false,
    icon: 'ShoppingCart'
  },
  {
    id: 'quest-2',
    title: 'Коллекционер',
    description: 'Соберите 3 редкие машины или выше',
    progress: 0,
    target: 3,
    reward: { money: 15000, xp: 300 },
    completed: false,
    icon: 'Star'
  },
  {
    id: 'quest-3',
    title: 'Торговец',
    description: 'Продайте 2 машины',
    progress: 0,
    target: 2,
    reward: { money: 8000, xp: 150 },
    completed: false,
    icon: 'TrendingUp'
  },
  {
    id: 'quest-4',
    title: 'Пригласи друга',
    description: 'Отправьте приглашение другу',
    progress: 0,
    target: 1,
    reward: { money: 10000, xp: 200 },
    completed: false,
    icon: 'Users'
  }
];

export const dailyRewards: DailyReward[] = [
  { day: 1, money: 5000, claimed: true, current: false },
  { day: 2, money: 7500, claimed: true, current: false },
  { day: 3, money: 10000, claimed: false, current: true },
  { day: 4, money: 15000, claimed: false, current: false },
  { day: 5, money: 20000, claimed: false, current: false },
  { day: 6, money: 30000, claimed: false, current: false },
  { day: 7, money: 50000, claimed: false, current: false }
];
