import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import type { Player } from '@/types/car';

interface PlayerProfileProps {
  player: Player;
}

export default function PlayerProfile({ player }: PlayerProfileProps) {
  const levelProgress = ((player.level % 10) / 10) * 100;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/50">
      <div className="flex items-start gap-4">
        <div className="text-6xl">{player.avatar}</div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-bold">{player.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge className="bg-primary">Уровень {player.level}</Badge>
              <Progress value={levelProgress} className="flex-1 h-2" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Icon name="Wallet" size={14} />
                <span>Баланс</span>
              </div>
              <p className="font-bold text-lg">{player.balance.toLocaleString('ru-RU')} ₽</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Icon name="TrendingUp" size={14} />
                <span>Коллекция</span>
              </div>
              <p className="font-bold text-lg">{player.totalValue.toLocaleString('ru-RU')} ₽</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Icon name="Car" size={14} />
                <span>Машин</span>
              </div>
              <p className="font-bold text-lg">{player.carsCount}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Icon name="Trophy" size={14} />
                <span>Рейтинг</span>
              </div>
              <p className="font-bold text-lg">#1</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      {children}
    </span>
  );
}
