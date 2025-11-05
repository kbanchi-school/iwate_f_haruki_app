import type React from 'react';

export type PetCharacter = {
  id: string;
  name: string;
  Icon: React.FC<{ className?: string }>;
};

export type PetStats = {
  hunger: number;
  cleanliness: number;
  happiness: number;
};

export type Screen = 'characterSelection' | 'main' | 'feed' | 'bath' | 'play' | 'alarm' | 'gameOver';

export interface InteractionItem {
  id: string;
  name: string;
  price: number;
  statBoost: number;
  emoji: string;
}

export interface PetContextType {
  currentScreen: Screen;
  selectedPet: PetCharacter | null;
  petStats: PetStats;
  money: number;
  wakeUpTime: string | null;
  bedTime: string | null;
  navigateTo: (screen: Screen) => void;
  selectPet: (pet: PetCharacter) => void;
  feedPet: (amount: number, cost: number) => void;
  bathePet: (amount: number, cost: number) => void;
  playWithPet: (amount: number, cost: number) => void;
  setWakeUpTime: (time: string | null) => void;
  setBedTime: (time: string | null) => void;
  reportWakeUp: () => string;
  reportBedTime: () => string;
}