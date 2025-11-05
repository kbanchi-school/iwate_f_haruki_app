import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';

const GameOver: React.FC = () => {
    const context = useContext(PetContext);
    if (!context) return null;

    const { navigateTo, selectedPet } = context;

    const handleRestart = () => {
        navigateTo('characterSelection');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                {selectedPet?.name || 'ペット'}が<br/>お星さまになりました...
            </h1>
            <p className="text-gray-600 mb-6">
                お世話してくれてありがとう。
            </p>
            <div className="text-6xl mb-6 animate-pulse">😢</div>
            <button
                onClick={handleRestart}
                className="w-full mt-4 p-4 bg-brand-pink-500 text-white font-bold rounded-lg hover:bg-brand-pink-600 transition text-lg"
            >
                もう一度そだてる
            </button>
        </div>
    );
};

export default GameOver;
