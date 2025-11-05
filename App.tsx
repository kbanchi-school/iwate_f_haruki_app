import React, { useContext } from 'react';
import CharacterSelection from './components/CharacterSelection';
import MainRoom from './components/MainRoom';
import FeedRoom from './components/FeedRoom';
import BathRoom from './components/BathRoom';
import PlayRoom from './components/PlayRoom';
import AlarmClock from './components/AlarmClock';
import GameOver from './components/GameOver';
import { PetContext } from './context/PetContext';

const App: React.FC = () => {
  const context = useContext(PetContext);
  if (!context) return null;

  const { currentScreen } = context;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'characterSelection':
        return <CharacterSelection />;
      case 'main':
        return <MainRoom />;
      case 'feed':
        return <FeedRoom />;
      case 'bath':
        return <BathRoom />;
      case 'play':
        return <PlayRoom />;
      case 'alarm':
        return <AlarmClock />;
      case 'gameOver':
        return <GameOver />;
      default:
        return <CharacterSelection />;
    }
  };

  return (
    <div className="bg-brand-pink-50 min-h-screen font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-brand-pink-200">
        <main className="p-2 sm:p-4">
           {renderScreen()}
        </main>
      </div>
    </div>
  );
};

export default App;