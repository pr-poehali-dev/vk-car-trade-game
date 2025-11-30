import type { Car, Player, LeaderboardEntry } from '@/types/car';

export const currentPlayer: Player = {
  id: '1',
  name: 'Игрок',
  avatar: '🏎️',
  balance: 125000,
  level: 12,
  totalValue: 450000,
  carsCount: 8
};

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'Ghost',
    brand: 'Rolls-Royce',
    model: 'Ghost',
    year: 2023,
    rarity: 'legendary',
    price: 350000,
    image: '/placeholder.svg',
    speed: 95,
    acceleration: 88,
    handling: 82,
    ownerId: '1'
  },
  {
    id: '2',
    name: 'M5 Competition',
    brand: 'BMW',
    model: 'M5',
    year: 2022,
    rarity: 'epic',
    price: 120000,
    image: '/placeholder.svg',
    speed: 98,
    acceleration: 95,
    handling: 90
  },
  {
    id: '3',
    name: 'RS6 Avant',
    brand: 'Audi',
    model: 'RS6',
    year: 2023,
    rarity: 'epic',
    price: 135000,
    image: '/placeholder.svg',
    speed: 96,
    acceleration: 93,
    handling: 88,
    ownerId: '1'
  },
  {
    id: '4',
    name: 'GT3 RS',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2024,
    rarity: 'legendary',
    price: 280000,
    image: '/placeholder.svg',
    speed: 100,
    acceleration: 97,
    handling: 98,
    ownerId: '1'
  },
  {
    id: '5',
    name: 'AMG GT',
    brand: 'Mercedes',
    model: 'AMG GT',
    year: 2022,
    rarity: 'rare',
    price: 95000,
    image: '/placeholder.svg',
    speed: 94,
    acceleration: 91,
    handling: 85
  },
  {
    id: '6',
    name: 'Civic Type R',
    brand: 'Honda',
    model: 'Civic Type R',
    year: 2023,
    rarity: 'rare',
    price: 45000,
    image: '/placeholder.svg',
    speed: 85,
    acceleration: 82,
    handling: 88,
    ownerId: '1'
  },
  {
    id: '7',
    name: 'Golf GTI',
    brand: 'Volkswagen',
    model: 'Golf GTI',
    year: 2023,
    rarity: 'common',
    price: 35000,
    image: '/placeholder.svg',
    speed: 80,
    acceleration: 78,
    handling: 82
  },
  {
    id: '8',
    name: 'Mustang GT',
    brand: 'Ford',
    model: 'Mustang GT',
    year: 2022,
    rarity: 'rare',
    price: 55000,
    image: '/placeholder.svg',
    speed: 88,
    acceleration: 86,
    handling: 75,
    ownerId: '1'
  },
  {
    id: '9',
    name: 'Model S Plaid',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    rarity: 'legendary',
    price: 140000,
    image: '/placeholder.svg',
    speed: 100,
    acceleration: 100,
    handling: 85
  },
  {
    id: '10',
    name: 'Supra',
    brand: 'Toyota',
    model: 'GR Supra',
    year: 2023,
    rarity: 'epic',
    price: 65000,
    image: '/placeholder.svg',
    speed: 90,
    acceleration: 88,
    handling: 86
  },
  {
    id: '11',
    name: 'A45 AMG',
    brand: 'Mercedes',
    model: 'A45 AMG',
    year: 2022,
    rarity: 'common',
    price: 52000,
    image: '/placeholder.svg',
    speed: 83,
    acceleration: 81,
    handling: 84
  },
  {
    id: '12',
    name: 'RS3',
    brand: 'Audi',
    model: 'RS3',
    year: 2023,
    rarity: 'common',
    price: 60000,
    image: '/placeholder.svg',
    speed: 85,
    acceleration: 83,
    handling: 83
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    player: currentPlayer,
    rank: 1,
    totalValue: 450000
  },
  {
    player: {
      id: '2',
      name: 'Алекс',
      avatar: '🏁',
      balance: 95000,
      level: 15,
      totalValue: 380000,
      carsCount: 12
    },
    rank: 2,
    totalValue: 380000
  },
  {
    player: {
      id: '3',
      name: 'Максим',
      avatar: '🚗',
      balance: 120000,
      level: 11,
      totalValue: 340000,
      carsCount: 9
    },
    rank: 3,
    totalValue: 340000
  },
  {
    player: {
      id: '4',
      name: 'Дмитрий',
      avatar: '⚡',
      balance: 75000,
      level: 9,
      totalValue: 295000,
      carsCount: 7
    },
    rank: 4,
    totalValue: 295000
  },
  {
    player: {
      id: '5',
      name: 'Анна',
      avatar: '🏆',
      balance: 88000,
      level: 10,
      totalValue: 270000,
      carsCount: 8
    },
    rank: 5,
    totalValue: 270000
  }
];
