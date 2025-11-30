import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import type { DailyQuest } from '@/types/trade';

interface QuestCardProps {
  quest: DailyQuest;
  onClaim?: (quest: DailyQuest) => void;
}

export default function QuestCard({ quest, onClaim }: QuestCardProps) {
  const progressPercent = (quest.progress / quest.target) * 100;
  const isCompleted = quest.progress >= quest.target;

  return (
    <Card className={`p-4 transition-all ${isCompleted ? 'bg-gradient-to-r from-card to-primary/10 border-primary/50' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/20">
          <Icon name={quest.icon as any} size={24} className="text-primary" />
        </div>

        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-bold">{quest.title}</h3>
            <p className="text-sm text-muted-foreground">{quest.description}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Прогресс</span>
              <span className="font-semibold">{quest.progress} / {quest.target}</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 text-sm">
              {quest.reward.money && (
                <span className="flex items-center gap-1 text-yellow-500">
                  <Icon name="Coins" size={14} />
                  {quest.reward.money.toLocaleString('ru-RU')}
                </span>
              )}
              {quest.reward.xp && (
                <span className="flex items-center gap-1 text-blue-500">
                  <Icon name="Zap" size={14} />
                  +{quest.reward.xp} XP
                </span>
              )}
            </div>

            {isCompleted && !quest.completed && onClaim && (
              <Button size="sm" onClick={() => onClaim(quest)}>
                <Icon name="Gift" size={14} className="mr-1" />
                Забрать
              </Button>
            )}
            {quest.completed && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="Check" size={14} className="text-green-500" />
                Выполнено
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
