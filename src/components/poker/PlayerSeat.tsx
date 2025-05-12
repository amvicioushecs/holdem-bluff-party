
import React from 'react';

interface PlayerProps {
  player: {
    id: number;
    position: string;
    name: string;
    chips: number;
    folded: boolean;
    isCurrentPlayer?: boolean;
  };
}

const PlayerSeat: React.FC<PlayerProps> = ({ player }) => {
  // Position classes
  const positionClasses = {
    'top': 'absolute top-2 left-1/2 -translate-x-1/2',
    'right-top': 'absolute top-1/4 right-2',
    'right-bottom': 'absolute bottom-1/3 right-2',
    'bottom': 'absolute bottom-16 left-1/2 -translate-x-1/2',
    'left-bottom': 'absolute bottom-1/3 left-2',
    'left-top': 'absolute top-1/4 left-2',
  }[player.position] || '';
  
  // Action/status text
  let actionText = player.folded ? 'Fold' : 'Check';
  
  return (
    <div className={`${positionClasses}`}>
      <div className={`w-16 h-20 flex flex-col items-center ${player.isCurrentPlayer ? 'scale-110' : ''}`}>
        {/* Video/Avatar placeholder - styled as a rectangle for video screens */}
        <div className={`w-full h-16 bg-gray-800 rounded-md shadow-lg border border-poker-darkGold/30 relative overflow-hidden ${player.folded ? 'opacity-50' : ''}`}>
          {/* Video screen effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/10"></div>
          
          {player.isCurrentPlayer && (
            <div className="absolute -bottom-4 right-0">
              <div className="w-8 h-8 rounded-full bg-poker-gold flex items-center justify-center text-black font-bold">
                D
              </div>
            </div>
          )}
        </div>
        <div className="mt-1 text-center">
          <p className="text-xs text-white font-medium">{player.name}</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-xs text-poker-gold">{player.chips}</span>
          </div>
          {!player.folded && (
            <span className="text-xs text-poker-gold">{actionText}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSeat;
