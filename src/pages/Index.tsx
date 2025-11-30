import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CarCard from '@/components/CarCard';
import PlayerProfile from '@/components/PlayerProfile';
import Leaderboard from '@/components/Leaderboard';
import { currentPlayer, mockCars, leaderboard } from '@/data/mockData';
import type { Car } from '@/types/car';
import { useToast } from '@/hooks/use-toast';

export default function Index() {
  const [player, setPlayer] = useState(currentPlayer);
  const [ownedCars, setOwnedCars] = useState<string[]>(
    mockCars.filter(car => car.ownerId === '1').map(car => car.id)
  );
  const { toast } = useToast();

  const handleBuy = (car: Car) => {
    if (player.balance >= car.price) {
      setPlayer(prev => ({
        ...prev,
        balance: prev.balance - car.price,
        totalValue: prev.totalValue + car.price,
        carsCount: prev.carsCount + 1
      }));
      setOwnedCars(prev => [...prev, car.id]);
      toast({
        title: 'Покупка успешна!',
        description: `Вы купили ${car.brand} ${car.model} за ${car.price.toLocaleString('ru-RU')} ₽`,
      });
    } else {
      toast({
        title: 'Недостаточно средств',
        description: 'Пополните баланс для покупки этой машины',
        variant: 'destructive'
      });
    }
  };

  const handleSell = (car: Car) => {
    const sellPrice = Math.floor(car.price * 0.8);
    setPlayer(prev => ({
      ...prev,
      balance: prev.balance + sellPrice,
      totalValue: prev.totalValue - car.price,
      carsCount: prev.carsCount - 1
    }));
    setOwnedCars(prev => prev.filter(id => id !== car.id));
    toast({
      title: 'Продажа успешна!',
      description: `Вы продали ${car.brand} ${car.model} за ${sellPrice.toLocaleString('ru-RU')} ₽`,
    });
  };

  const myGarageCars = mockCars.filter(car => ownedCars.includes(car.id));
  const marketCars = mockCars.filter(car => !ownedCars.includes(car.id));

  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  const sortedGarageCars = [...myGarageCars].sort(
    (a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]
  );
  const sortedMarketCars = [...marketCars].sort(
    (a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🏎️ Car Collector VK</h1>
              <p className="text-muted-foreground">Собирай, торгуй и коллекционируй редкие машины</p>
            </div>
            <Button size="lg" className="animate-glow">
              <Icon name="Plus" size={20} className="mr-2" />
              Пополнить баланс
            </Button>
          </div>
          
          <PlayerProfile player={player} />
        </header>

        <Tabs defaultValue="garage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="garage" className="flex items-center gap-2 py-3">
              <Icon name="Warehouse" size={18} />
              <span className="hidden sm:inline">Гараж</span>
              <span className="sm:hidden">Гараж</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2 py-3">
              <Icon name="Store" size={18} />
              <span className="hidden sm:inline">Маркет</span>
              <span className="sm:hidden">Маркет</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2 py-3">
              <Icon name="Trophy" size={18} />
              <span className="hidden sm:inline">Рейтинг</span>
              <span className="sm:hidden">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2 py-3">
              <Icon name="Users" size={18} />
              <span className="hidden sm:inline">Друзья</span>
              <span className="sm:hidden">Друзья</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="garage" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Мой гараж</h2>
                <p className="text-muted-foreground">У вас {myGarageCars.length} машин</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>

            {myGarageCars.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Icon name="Car" size={64} className="mx-auto text-muted-foreground opacity-50" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Гараж пуст</h3>
                  <p className="text-muted-foreground mb-4">Купите свою первую машину на маркете!</p>
                  <Button onClick={() => {
                    const tabsList = document.querySelector('[value="market"]') as HTMLElement;
                    tabsList?.click();
                  }}>
                    <Icon name="Store" size={16} className="mr-2" />
                    Перейти в маркет
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedGarageCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSell={handleSell}
                    isOwned
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="market" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Маркет</h2>
                <p className="text-muted-foreground">Доступно {marketCars.length} машин</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedMarketCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onBuy={handleBuy}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Топ игроков</h2>
              <p className="text-muted-foreground mb-6">Лучшие коллекционеры по стоимости коллекции</p>
            </div>
            <Leaderboard entries={leaderboard} />
          </TabsContent>

          <TabsContent value="friends" className="space-y-4 animate-fade-in">
            <div className="text-center py-16 space-y-4">
              <Icon name="Users" size={64} className="mx-auto text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-xl font-bold mb-2">Пригласи друзей</h3>
                <p className="text-muted-foreground mb-4">Соревнуйся с друзьями и торгуй машинами</p>
                <Button>
                  <Icon name="Share2" size={16} className="mr-2" />
                  Пригласить друзей
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
