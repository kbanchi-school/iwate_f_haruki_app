import React from 'react';
import type { PetCharacter } from '../types';

interface PetAvatarProps {
  pet: PetCharacter;
}

const PetAvatar: React.FC<PetAvatarProps> = ({ pet }) => {
  return (
    <div 
      className="mb-4"
      style={{
        animation: 'float 3s ease-in-out infinite',
      }}
    >
      <div className="w-28 h-28 rounded-full overflow-hidden bg-white/30 shadow-lg border-4 border-white backdrop-blur-sm">
        <pet.Icon />
      </div>
      <div 
        className="w-24 h-2 bg-black/20 rounded-full blur-md mx-auto mt-4"
        style={{
          animation: 'shrink 3s ease-in-out infinite',
        }}
      ></div>
    </div>
  );
};

export default PetAvatar;