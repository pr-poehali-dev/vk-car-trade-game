import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { LeaderboardEntry } from '@/types/car';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-400';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-3">
      {entries.map((entry) => (
        <Card 
          key={entry.player.id}
          className={`p-4 transition-all duration-300 hover:scale-102 ${
            entry.rank <= 3 ? 'bg-gradient-to-r from-card to-secondary/50' : ''
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`text-2xl font-bold w-12 text-center ${getRankColor(entry.rank)}`}>
              {getRankIcon(entry.rank)}
            </div>

            <div className="text-3xl">{entry.player.avatar}</div>

            <div className="flex-1">
              <h3 className="font-bold text-lg">{entry.player.name}</h3>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Star" size={14} />
                  Уровень {entry.player.level}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Car" size={14} />
                  {entry.player.carsCount} машин
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">Стоимость</p>
              <p className="font-bold text-xl">{entry.totalValue.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
