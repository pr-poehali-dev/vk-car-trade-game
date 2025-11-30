import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import type { Car, Player } from '@/types/car';

interface CreateTradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  myCars: Car[];
  targetPlayer: Player;
  targetPlayerCars: Car[];
  onSubmit: (data: {
    offeredCar: Car;
    requestedCar?: Car;
    offeredMoney?: number;
    requestedMoney?: number;
    message?: string;
  }) => void;
}

export default function CreateTradeDialog({
  open,
  onOpenChange,
  myCars,
  targetPlayer,
  targetPlayerCars,
  onSubmit
}: CreateTradeDialogProps) {
  const [offeredCarId, setOfferedCarId] = useState<string>('');
  const [requestedCarId, setRequestedCarId] = useState<string>('');
  const [offeredMoney, setOfferedMoney] = useState<string>('');
  const [requestedMoney, setRequestedMoney] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = () => {
    const offeredCar = myCars.find(c => c.id === offeredCarId);
    const requestedCar = targetPlayerCars.find(c => c.id === requestedCarId);

    if (!offeredCar) return;

    onSubmit({
      offeredCar,
      requestedCar,
      offeredMoney: offeredMoney ? parseInt(offeredMoney) : undefined,
      requestedMoney: requestedMoney ? parseInt(requestedMoney) : undefined,
      message: message || undefined
    });

    setOfferedCarId('');
    setRequestedCarId('');
    setOfferedMoney('');
    setRequestedMoney('');
    setMessage('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Repeat" size={20} />
            Создать предложение обмена
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label>Вы предлагаете</Label>
              <Select value={offeredCarId} onValueChange={setOfferedCarId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите машину" />
                </SelectTrigger>
                <SelectContent>
                  {myCars.map(car => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.name} ({car.price.toLocaleString('ru-RU')} ₽)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label>+ Доплата (опционально)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={offeredMoney}
                  onChange={(e) => setOfferedMoney(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Запрашиваете у {targetPlayer.name}</Label>
              <Select value={requestedCarId} onValueChange={setRequestedCarId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите машину" />
                </SelectTrigger>
                <SelectContent>
                  {targetPlayerCars.map(car => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.name} ({car.price.toLocaleString('ru-RU')} ₽)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label>+ Доплата от игрока (опционально)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={requestedMoney}
                  onChange={(e) => setRequestedMoney(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Сообщение (опционально)</Label>
            <Textarea
              placeholder="Напишите сообщение..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} disabled={!offeredCarId} className="flex-1">
              <Icon name="Send" size={16} className="mr-2" />
              Отправить предложение
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
