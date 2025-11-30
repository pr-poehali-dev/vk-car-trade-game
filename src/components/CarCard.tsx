import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Car } from '@/types/car';

interface CarCardProps {
  car: Car;
  onBuy?: (car: Car) => void;
  onSell?: (car: Car) => void;
  isOwned?: boolean;
}

const rarityLabels = {
  common: 'Обычная',
  rare: 'Редкая',
  epic: 'Эпическая',
  legendary: 'Легендарная'
};

export default function CarCard({ car, onBuy, onSell, isOwned }: CarCardProps) {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 bg-rarity-${car.rarity}`}>
      <div className="aspect-video bg-secondary/50 flex items-center justify-center relative overflow-hidden">
        <Icon name="Car" size={80} className={`rarity-${car.rarity} opacity-20`} />
        {isOwned && (
          <Badge className="absolute top-2 right-2 bg-primary">
            <Icon name="Check" size={14} className="mr-1" />
            В гараже
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-lg">{car.name}</h3>
            <Badge variant="outline" className={`rarity-${car.rarity} border-current`}>
              {rarityLabels[car.rarity]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{car.brand} {car.model} • {car.year}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Icon name="Gauge" size={14} className="text-muted-foreground" />
            <span>{car.speed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Zap" size={14} className="text-muted-foreground" />
            <span>{car.acceleration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Steering" size={14} className="text-muted-foreground" />
            <span>{car.handling}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Цена</p>
            <p className="font-bold text-lg">{car.price.toLocaleString('ru-RU')} ₽</p>
          </div>
          {!isOwned && onBuy && (
            <Button onClick={() => onBuy(car)} size="sm">
              <Icon name="ShoppingCart" size={16} className="mr-1" />
              Купить
            </Button>
          )}
          {isOwned && onSell && (
            <Button onClick={() => onSell(car)} variant="outline" size="sm">
              <Icon name="DollarSign" size={16} className="mr-1" />
              Продать
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
