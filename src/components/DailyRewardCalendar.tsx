import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { DailyReward } from '@/types/trade';

interface DailyRewardCalendarProps {
  rewards: DailyReward[];
  onClaim?: (day: number) => void;
}

export default function DailyRewardCalendar({ rewards, onClaim }: DailyRewardCalendarProps) {
  return (
    <div className="grid grid-cols-7 gap-3">
      {rewards.map((reward) => (
        <Card
          key={reward.day}
          className={`p-4 text-center transition-all ${
            reward.current
              ? 'bg-gradient-to-br from-primary to-primary/50 scale-105 animate-glow'
              : reward.claimed
              ? 'bg-secondary/30 opacity-60'
              : 'bg-secondary/50'
          }`}
        >
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">День {reward.day}</div>
            
            <div className="py-2">
              {reward.claimed ? (
                <Icon name="Check" size={32} className="mx-auto text-green-500" />
              ) : (
                <Icon name="Gift" size={32} className="mx-auto text-yellow-500" />
              )}
            </div>

            <div className="text-sm font-bold">{reward.money.toLocaleString('ru-RU')} ₽</div>

            {reward.current && !reward.claimed && onClaim && (
              <Button size="sm" className="w-full" onClick={() => onClaim(reward.day)}>
                Забрать
              </Button>
            )}
            {reward.claimed && (
              <div className="text-xs text-green-500 font-semibold">Получено</div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
