import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { TradeOffer } from '@/types/trade';

interface TradeOfferCardProps {
  offer: TradeOffer;
  onAccept?: (offer: TradeOffer) => void;
  onReject?: (offer: TradeOffer) => void;
  isOutgoing?: boolean;
}

export default function TradeOfferCard({ offer, onAccept, onReject, isOutgoing }: TradeOfferCardProps) {
  const getStatusBadge = () => {
    switch (offer.status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-500 border-yellow-500">Ожидание</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="text-green-500 border-green-500">Принято</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-500 border-red-500">Отклонено</Badge>;
      case 'expired':
        return <Badge variant="outline" className="text-gray-500 border-gray-500">Истекло</Badge>;
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{isOutgoing ? offer.toPlayer.avatar : offer.fromPlayer.avatar}</div>
          <div>
            <p className="font-bold">{isOutgoing ? offer.toPlayer.name : offer.fromPlayer.name}</p>
            <p className="text-xs text-muted-foreground">
              {isOutgoing ? 'Исходящее предложение' : 'Входящее предложение'}
            </p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            {isOutgoing ? 'Вы предлагаете' : 'Получите'}
          </p>
          <Card className="p-3 bg-secondary/50">
            <p className="font-bold text-sm mb-1">{offer.offeredCar.name}</p>
            <p className="text-xs text-muted-foreground mb-2">
              {offer.offeredCar.brand} {offer.offeredCar.model}
            </p>
            {offer.offeredMoney && (
              <p className="text-xs">+ {offer.offeredMoney.toLocaleString('ru-RU')} ₽</p>
            )}
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">
            {isOutgoing ? 'Запрашиваете' : 'Отдаёте'}
          </p>
          <Card className="p-3 bg-secondary/50">
            {offer.requestedCar ? (
              <>
                <p className="font-bold text-sm mb-1">{offer.requestedCar.name}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {offer.requestedCar.brand} {offer.requestedCar.model}
                </p>
              </>
            ) : null}
            {offer.requestedMoney && (
              <p className="text-xs">{offer.requestedMoney.toLocaleString('ru-RU')} ₽</p>
            )}
          </Card>
        </div>
      </div>

      {offer.message && (
        <div className="text-xs text-muted-foreground bg-secondary/30 p-2 rounded">
          <Icon name="MessageSquare" size={12} className="inline mr-1" />
          {offer.message}
        </div>
      )}

      {!isOutgoing && offer.status === 'pending' && onAccept && onReject && (
        <div className="flex gap-2 pt-2">
          <Button onClick={() => onAccept(offer)} className="flex-1">
            <Icon name="Check" size={16} className="mr-1" />
            Принять
          </Button>
          <Button onClick={() => onReject(offer)} variant="outline" className="flex-1">
            <Icon name="X" size={16} className="mr-1" />
            Отклонить
          </Button>
        </div>
      )}
    </Card>
  );
}
