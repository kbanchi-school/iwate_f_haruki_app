
import React from 'react';
// FIX: Import the `PetStats` type to resolve the 'Cannot find name' error.
import type { PetCharacter, InteractionItem, PetStats } from './types';

const DogImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=200&q=80" alt="イヌ" className="w-full h-full object-cover" />
);

const CatImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1615789591457-74a63395c990?auto=format&fit=crop&w=200&q=80" alt="ネコ" className="w-full h-full object-cover" />
);

const RabbitImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=200&q=80" alt="ウサギ" className="w-full h-full object-cover" />
);

const BirdImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=200&q=80" alt="トリ" className="w-full h-full object-cover" />
);

const RedPandaImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1619535105257-43c713b93a02?auto=format&fit=crop&w=200&q=80" alt="レッサーパンダ" className="w-full h-full object-cover" />
);

const KoalaImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1592651961313-603b1373e970?auto=format&fit=crop&w=200&q=80" alt="コアラ" className="w-full h-full object-cover" />
);

const PandaImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=200&q=80" alt="パンダ" className="w-full h-full object-cover" />
);

const HedgehogImage: React.FC<{ className?: string }> = () => (
    <img src="https://images.unsplash.com/photo-1530261162208-59197a51c41f?auto=format&fit=crop&w=200&q=80" alt="ハリネズミ" className="w-full h-full object-cover" />
);


export const PET_CHARACTERS: PetCharacter[] = [
  { id: 'dog', name: 'イヌ', Icon: DogImage },
  { id: 'cat', name: 'ネコ', Icon: CatImage },
  { id: 'rabbit', name: 'ウサギ', Icon: RabbitImage },
  { id: 'bird', name: 'トリ', Icon: BirdImage },
  { id: 'red_panda', name: 'レッサーパンダ', Icon: RedPandaImage },
  { id: 'koala', name: 'コアラ', Icon: KoalaImage },
  { id: 'panda', name: 'パンダ', Icon: PandaImage },
  { id: 'hedgehog', name: 'ハリネズミ', Icon: HedgehogImage },
];

export const FOOD_ITEMS: InteractionItem[] = [
  { id: 'food1', name: 'クッキー', price: 25, statBoost: 10, emoji: '🍪' },
  { id: 'food2', name: 'おにく', price: 50, statBoost: 25, emoji: '🥩' },
  { id: 'food3', name: 'ケーキ', price: 80, statBoost: 40, emoji: '🍰' },
];

export const BATH_ITEMS: InteractionItem[] = [
  { id: 'bath1', name: 'シャワー', price: 40, statBoost: 30, emoji: '🚿' },
  { id: 'bath2', name: 'バブルバス', price: 70, statBoost: 50, emoji: '🛁' },
];

export const PLAY_ITEMS: InteractionItem[] = [
  { id: 'play1', name: 'ボール', price: 30, statBoost: 20, emoji: '⚽' },
  { id: 'play2', name: 'ゲーム', price: 60, statBoost: 40, emoji: '🎮' },
];

export const INITIAL_STATS: PetStats = { hunger: 50, cleanliness: 50, happiness: 50 };
export const INITIAL_MONEY = 100;