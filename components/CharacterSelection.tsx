import React, { useContext } from 'react';
import { PetContext } from '../context/PetContext';
import { PET_CHARACTERS } from '../constants';
import type { PetCharacter } from '../types';

const CharacterSelection: React.FC = () => {
  const context = useContext(PetContext);
  
  if (!context) return null;
  const { selectPet } = context;

  const handleSelect = (pet: PetCharacter) => {
    selectPet(pet);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-pink-700 mb-6 text-center">ペットをえらんでね！</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {PET_CHARACTERS.map((pet) => (
          <button
            key={pet.id}
            onClick={() => handleSelect(pet)}
            className="flex flex-col items-center p-4 bg-brand-pink-100 rounded-xl shadow-md hover:bg-brand-pink-200 hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <pet.Icon />
            </div>
            <span className="mt-3 font-semibold text-brand-pink-800 text-lg">{pet.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharacterSelection;