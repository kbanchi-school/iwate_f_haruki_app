import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { PetCharacter, PetStats, Screen, PetContextType } from '../types';
import { INITIAL_STATS, INITIAL_MONEY } from '../constants';

export const PetContext = createContext<PetContextType | null>(null);

interface PetProviderProps {
    children: React.ReactNode;
}

export const PetProvider: React.FC<PetProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('characterSelection');
  const [selectedPet, setSelectedPet] = useState<PetCharacter | null>(null);
  const [petStats, setPetStats] = useState<PetStats>(INITIAL_STATS);
  const [money, setMoney] = useState<number>(INITIAL_MONEY);
  const [wakeUpTime, setWakeUpTime] = useState<string | null>(null);
  const [bedTime, setBedTime] = useState<string | null>(null);

  const navigateTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
  }, []);

  const selectPet = useCallback((pet: PetCharacter) => {
    setSelectedPet(pet);
    setPetStats(INITIAL_STATS);
    setMoney(INITIAL_MONEY);
    setWakeUpTime(null);
    setBedTime(null);
    navigateTo('main');
  }, [navigateTo]);

  useEffect(() => {
    if (!selectedPet || currentScreen === 'characterSelection' || currentScreen === 'gameOver') {
        return;
    }

    const statDecayInterval = setInterval(() => {
        setPetStats(prev => {
            const newStats = {
                hunger: Math.max(0, prev.hunger - 1),
                cleanliness: Math.max(0, prev.cleanliness - 1),
                happiness: Math.max(0, prev.happiness - 1),
            };

            if (newStats.hunger <= 0 || newStats.cleanliness <= 0 || newStats.happiness <= 0) {
                navigateTo('gameOver');
                clearInterval(statDecayInterval);
            }
            
            return newStats;
        });
    }, 150000); // 2分30秒ごとに各ステータスが1ずつ減る

    return () => clearInterval(statDecayInterval);
  }, [selectedPet, currentScreen, navigateTo]);


  const feedPet = useCallback((amount: number, cost: number) => {
    if (money >= cost) {
      setMoney(prev => prev - cost);
      setPetStats(prev => ({ ...prev, hunger: Math.min(100, prev.hunger + amount) }));
    }
  }, [money]);
  
  const bathePet = useCallback((amount: number, cost: number) => {
    if (money >= cost) {
      setMoney(prev => prev - cost);
      setPetStats(prev => ({ ...prev, cleanliness: Math.min(100, prev.cleanliness + amount) }));
    }
  }, [money]);

  const playWithPet = useCallback((amount: number, cost: number) => {
    if (money >= cost) {
      setMoney(prev => prev - cost);
      setPetStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + amount) }));
    }
  }, [money]);

  const reportWakeUp = useCallback(() => {
    if (!wakeUpTime) return '起きる時間がセットされてないよ。';
    
    const now = new Date();
    const nowHours = now.getHours();
    const [targetHours, targetMinutes] = wakeUpTime.split(':').map(Number);
    
    // ターゲットが朝(〜12時)で、現在が前日の夜(18時〜)なら、早起きとみなす
    if (targetHours < 12 && nowHours >= 18) {
        setMoney(prev => prev + 100);
        return '超早起き！えらい！ 💰+100';
    }

    const isEarlyOrOnTime = nowHours < targetHours || (nowHours === targetHours && now.getMinutes() <= targetMinutes);
    
    if (isEarlyOrOnTime) {
      setMoney(prev => prev + 100);
      return '早起きえらい！ 💰+100';
    } else {
      setMoney(prev => prev - 150);
      return '寝坊しちゃった... 💰-150';
    }
  }, [wakeUpTime]);
  
  const reportBedTime = useCallback(() => {
    if (!bedTime) return '寝る時間がセットされてないよ。';
    
    const now = new Date();
    const nowHours = now.getHours();
    const [targetHours, targetMinutes] = bedTime.split(':').map(Number);
    
    // ターゲットが夜(18時〜)で、現在が翌日の朝(〜6時)なら、夜ふかしとみなす
    if (targetHours >= 18 && nowHours < 6) {
        setMoney(prev => prev - 150);
        return '夜ふかししちゃった... 💰-150';
    }
    
    const isEarlyOrOnTime = nowHours < targetHours || (nowHours === targetHours && now.getMinutes() <= targetMinutes);
    
    if (isEarlyOrOnTime) {
      setMoney(prev => prev + 100);
      return '早寝えらい！ 💰+100';
    } else {
      setMoney(prev => prev - 150);
      return '夜ふかししちゃった... 💰-150';
    }
  }, [bedTime]);

  const contextValue: PetContextType = {
    currentScreen,
    selectedPet,
    petStats,
    money,
    wakeUpTime,
    bedTime,
    navigateTo,
    selectPet,
    feedPet,
    bathePet,
    playWithPet,
    setWakeUpTime,
    setBedTime,
    reportWakeUp,
    reportBedTime,
  };

  return (
    <PetContext.Provider value={contextValue}>
      {children}
    </PetContext.Provider>
  );
};
