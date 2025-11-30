import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import CarCard from '@/components/CarCard';
import PlayerProfile from '@/components/PlayerProfile';
import Leaderboard from '@/components/Leaderboard';
import TradeOfferCard from '@/components/TradeOfferCard';
import QuestCard from '@/components/QuestCard';
import DailyRewardCalendar from '@/components/DailyRewardCalendar';
import CreateTradeDialog from '@/components/CreateTradeDialog';
import { currentPlayer, mockCars, leaderboard } from '@/data/mockData';
import { dailyQuests, dailyRewards } from '@/data/questsData';
import type { Car, Player } from '@/types/car';
import type { TradeOffer, DailyQuest, DailyReward } from '@/types/trade';
import { useToast } from '@/hooks/use-toast';
import { initVK, getVKUser, shareToVK } from '@/lib/vkBridge';

export default function Index() {
  const [player, setPlayer] = useState(currentPlayer);
  const [ownedCars, setOwnedCars] = useState<string[]>(
    mockCars.filter(car => car.ownerId === '1').map(car => car.id)
  );
  const [quests, setQuests] = useState<DailyQuest[]>(dailyQuests);
  const [rewards, setRewards] = useState<DailyReward[]>(dailyRewards);
  const [trades, setTrades] = useState<TradeOffer[]>([]);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedTradePlayer, setSelectedTradePlayer] = useState<Player | null>(null);
  const [vkUser, setVkUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initApp = async () => {
      await initVK();
      const user = await getVKUser();
      if (user) {
        setVkUser(user);
        setPlayer(prev => ({
          ...prev,
          name: user.name,
          avatar: user.photoUrl || prev.avatar
        }));
      }
    };
    initApp();
  }, []);

  const handleBuy = (car: Car) => {
    if (player.balance >= car.price) {
      setPlayer(prev => ({
        ...prev,
        balance: prev.balance - car.price,
        totalValue: prev.totalValue + car.price,
        carsCount: prev.carsCount + 1
      }));
      setOwnedCars(prev => [...prev, car.id]);
      
      updateQuestProgress('quest-1', 1);
      if (car.rarity === 'rare' || car.rarity === 'epic' || car.rarity === 'legendary') {
        updateQuestProgress('quest-2', 1);
      }
      
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
    
    updateQuestProgress('quest-3', 1);
    
    toast({
      title: 'Продажа успешна!',
      description: `Вы продали ${car.brand} ${car.model} за ${sellPrice.toLocaleString('ru-RU')} ₽`,
    });
  };

  const updateQuestProgress = (questId: string, increment: number) => {
    setQuests(prev => prev.map(q => {
      if (q.id === questId && !q.completed) {
        const newProgress = Math.min(q.progress + increment, q.target);
        return { ...q, progress: newProgress };
      }
      return q;
    }));
  };

  const handleClaimQuest = (quest: DailyQuest) => {
    setQuests(prev => prev.map(q => q.id === quest.id ? { ...q, completed: true } : q));
    
    const totalReward = quest.reward.money || 0;
    setPlayer(prev => ({
      ...prev,
      balance: prev.balance + totalReward,
      level: prev.level + (quest.reward.xp ? Math.floor(quest.reward.xp / 100) : 0)
    }));
    
    toast({
      title: 'Награда получена!',
      description: `Получено ${totalReward.toLocaleString('ru-RU')} ₽ и ${quest.reward.xp} XP`,
    });
  };

  const handleClaimDailyReward = (day: number) => {
    setRewards(prev => prev.map(r => 
      r.day === day ? { ...r, claimed: true, current: false } : 
      r.day === day + 1 ? { ...r, current: true } : r
    ));
    
    const reward = rewards.find(r => r.day === day);
    if (reward) {
      setPlayer(prev => ({ ...prev, balance: prev.balance + reward.money }));
      toast({
        title: 'Ежедневная награда!',
        description: `Получено ${reward.money.toLocaleString('ru-RU')} ₽`,
      });
    }
  };

  const handleCreateTrade = (data: any) => {
    const newTrade: TradeOffer = {
      id: `trade-${Date.now()}`,
      fromPlayer: player,
      toPlayer: selectedTradePlayer!,
      offeredCar: data.offeredCar,
      requestedCar: data.requestedCar,
      offeredMoney: data.offeredMoney,
      requestedMoney: data.requestedMoney,
      message: data.message,
      status: 'pending',
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };
    
    setTrades(prev => [...prev, newTrade]);
    toast({
      title: 'Предложение отправлено!',
      description: `Игрок ${selectedTradePlayer!.name} получил ваше предложение`,
    });
  };

  const handleAcceptTrade = (offer: TradeOffer) => {
    setTrades(prev => prev.map(t => t.id === offer.id ? { ...t, status: 'accepted' as const } : t));
    toast({
      title: 'Обмен завершён!',
      description: 'Машины успешно обменяны',
    });
  };

  const handleRejectTrade = (offer: TradeOffer) => {
    setTrades(prev => prev.map(t => t.id === offer.id ? { ...t, status: 'rejected' as const } : t));
    toast({
      title: 'Предложение отклонено',
      description: 'Вы отклонили предложение обмена',
    });
  };

  const handleShareToFriends = async () => {
    await shareToVK('Присоединяйся к Car Collector VK!');
    updateQuestProgress('quest-4', 1);
    toast({
      title: 'Приглашение отправлено!',
      description: 'Друг получит уведомление',
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

        <Tabs defaultValue="quests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 h-auto text-xs">
            <TabsTrigger value="quests" className="flex items-center gap-1 py-3">
              <Icon name="Target" size={16} />
              <span className="hidden sm:inline">Задания</span>
            </TabsTrigger>
            <TabsTrigger value="garage" className="flex items-center gap-1 py-3">
              <Icon name="Warehouse" size={16} />
              <span className="hidden sm:inline">Гараж</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-1 py-3">
              <Icon name="Store" size={16} />
              <span className="hidden sm:inline">Маркет</span>
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center gap-1 py-3 relative">
              <Icon name="Repeat" size={16} />
              <span className="hidden sm:inline">Сделки</span>
              {trades.filter(t => t.status === 'pending' && t.toPlayer.id === player.id).length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {trades.filter(t => t.status === 'pending' && t.toPlayer.id === player.id).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-1 py-3">
              <Icon name="Trophy" size={16} />
              <span className="hidden sm:inline">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-1 py-3">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Друзья</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quests" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ежедневные задания</h2>
              <p className="text-muted-foreground mb-6">Выполняй задания и получай награды</p>
            </div>

            <div className="space-y-4">
              {quests.map(quest => (
                <QuestCard key={quest.id} quest={quest} onClaim={handleClaimQuest} />
              ))}
            </div>

            <div className="pt-6">
              <h2 className="text-2xl font-bold mb-2">Ежедневный вход</h2>
              <p className="text-muted-foreground mb-6">Заходи каждый день и получай бонусы</p>
              <DailyRewardCalendar rewards={rewards} onClaim={handleClaimDailyReward} />
            </div>
          </TabsContent>

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

          <TabsContent value="trades" className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Обмен машинами</h2>
                <p className="text-muted-foreground">Торгуйте с другими игроками</p>
              </div>
              <Button onClick={() => {
                setSelectedTradePlayer(leaderboard[1].player);
                setTradeDialogOpen(true);
              }}>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать предложение
              </Button>
            </div>

            {trades.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Icon name="Repeat" size={64} className="mx-auto text-muted-foreground opacity-50" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Нет активных сделок</h3>
                  <p className="text-muted-foreground mb-4">Создайте первое предложение обмена</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-3">Входящие предложения</h3>
                  {trades.filter(t => t.toPlayer.id === player.id).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Нет входящих предложений</p>
                  ) : (
                    <div className="space-y-3">
                      {trades.filter(t => t.toPlayer.id === player.id).map(trade => (
                        <TradeOfferCard
                          key={trade.id}
                          offer={trade}
                          onAccept={handleAcceptTrade}
                          onReject={handleRejectTrade}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-bold mb-3">Исходящие предложения</h3>
                  {trades.filter(t => t.fromPlayer.id === player.id).length === 0 ? (
                    <p className="text-sm text-muted-foreground">Нет исходящих предложений</p>
                  ) : (
                    <div className="space-y-3">
                      {trades.filter(t => t.fromPlayer.id === player.id).map(trade => (
                        <TradeOfferCard key={trade.id} offer={trade} isOutgoing />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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
                <Button onClick={handleShareToFriends}>
                  <Icon name="Share2" size={16} className="mr-2" />
                  Пригласить друзей
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {selectedTradePlayer && (
          <CreateTradeDialog
            open={tradeDialogOpen}
            onOpenChange={setTradeDialogOpen}
            myCars={myGarageCars}
            targetPlayer={selectedTradePlayer}
            targetPlayerCars={mockCars.filter(c => c.ownerId === selectedTradePlayer.id)}
            onSubmit={handleCreateTrade}
          />
        )}
      </div>
    </div>
  );
}