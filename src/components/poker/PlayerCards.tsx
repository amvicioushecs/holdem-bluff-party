
import React from 'react';

const PlayerCards = () => {
  // Mock player cards - in a real app, these would come from your game state
  const playerCards = ['Ad', 'Kd']; // Example: Ace of diamonds, King of diamonds
  
  return (
    <div className="flex justify-center">
      <div className="flex gap-2">
        {playerCards.map((card, index) => (
          <div 
            key={index}
            className="w-16 h-24 bg-white rounded-md shadow-lg border border-gray-300 transform transition-transform hover:scale-105 overflow-hidden"
          >
            {/* Card image - in a production app, you would use actual card images */}
            <div className="w-full h-full flex items-center justify-center bg-white text-black font-bold text-xl">
              {card}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerCards;
