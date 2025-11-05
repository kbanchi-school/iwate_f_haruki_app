import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import PetAvatar from './PetAvatar';
import StatusBar from './StatusBar';

const MainRoom: React.FC = () => {
  const context = useContext(PetContext);
  if (!context) return null;
  const { selectedPet, petStats, money, navigateTo } = context;

  if (!selectedPet) {
    // Should not happen if logic is correct, but a good fallback
    navigateTo('characterSelection');
    return null;
  }

  const actionButtons = [
    { label: 'ごはん', screen: 'feed', icon: '🍔' },
    { label: 'おふろ', screen: 'bath', icon: '🛁' },
    { label: 'あそぶ', screen: 'play', icon: '🎲' },
    { label: 'とけい', screen: 'alarm', icon: '⏰' },
  ];
  
  const roomImageUrl = "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="flex flex-col items-center p-2 sm:p-4 space-y-4">
        <div className="flex justify-between items-center w-full px-2">
            <h2 className="text-xl font-bold text-brand-pink-800">{selectedPet.name}のおへや</h2>
            <div className="px-4 py-2 bg-yellow-300 rounded-full shadow-inner">
                <span className="font-bold text-yellow-800">💰 {money}</span>
            </div>
        </div>

      <div 
        className="w-full h-64 bg-cover bg-center rounded-2xl flex items-end justify-center shadow-inner relative"
        style={{ backgroundImage: `url(${roomImageUrl})` }}
      >
        <PetAvatar pet={selectedPet} />
      </div>

      <div className="w-full space-y-3 p-4 bg-brand-pink-50 rounded-lg">
        <StatusBar label="まんぷく" value={petStats.hunger} color="bg-green-500" />
        <StatusBar label="せいけつ" value={petStats.cleanliness} color="bg-blue-500" />
        <StatusBar label="ごきげん" value={petStats.happiness} color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {actionButtons.map(btn => (
          <button
            key={btn.screen}
            onClick={() => navigateTo(btn.screen as any)}
            className="flex items-center justify-center space-x-2 text-lg font-bold text-white bg-brand-pink-500 rounded-lg p-3 shadow-md hover:bg-brand-pink-600 transition transform hover:scale-105"
          >
             <span>{btn.icon}</span>
             <span>{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainRoom;