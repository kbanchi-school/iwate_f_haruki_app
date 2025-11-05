
import React, { useContext, useState } from 'react';
import { PetContext } from '../context/PetContext';
import { PLAY_ITEMS } from '../constants';
import type { InteractionItem } from '../types';

const PlayRoom: React.FC = () => {
  const context = useContext(PetContext);
  const [message, setMessage] = useState('');

  if (!context) return null;
  const { money, playWithPet, navigateTo } = context;

  const handlePlay = (item: InteractionItem) => {
    if (money >= item.price) {
      playWithPet(item.statBoost, item.price);
      setMessage(`${item.name}であそんだよ！`);
    } else {
      setMessage('お金がたりないよ...');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold text-brand-pink-700">いっしょにあそぼう</h1>
      <div className="px-4 py-2 bg-yellow-300 rounded-full shadow-inner">
          <span className="font-bold text-yellow-800">💰 {money}</span>
      </div>
      {message && <div className="text-center p-2 rounded-lg bg-brand-pink-100 text-brand-pink-800">{message}</div>}
      <div className="w-full space-y-3">
        {PLAY_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => handlePlay(item)}
            disabled={money < item.price}
            className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:bg-brand-pink-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="font-semibold text-lg text-brand-pink-900">{item.name}</span>
            <span className="font-bold text-yellow-600">💰 {item.price}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => navigateTo('main')}
        className="w-full mt-4 p-3 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition"
      >
        もどる
      </button>
    </div>
  );
};

export default PlayRoom;
   