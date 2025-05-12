
import React from 'react';
import PlayerSeat from './PlayerSeat';
import { Card } from '@/components/ui/card';
import GameControls from './GameControls';

const PokerTable = () => {
  // Mock player positions
  const players = [
    { id: 1, position: 'top', name: 'Player 1', chips: 2500, folded: true },
    { id: 2, position: 'right-top', name: 'Player 2', chips: 1800, folded: false },
    { id: 3, position: 'right-bottom', name: 'Player 3', chips: 3000, folded: false, isCurrentPlayer: true },
    { id: 4, position: 'bottom', name: 'You', chips: 2000, folded: false, isCurrentPlayer: true },
    { id: 5, position: 'left-bottom', name: 'Player 5', chips: 1500, folded: false },
    { id: 6, position: 'left-top', name: 'Player 6', chips: 900, folded: false },
  ];

  // Community cards (the cards on the table)
  const communityCards = ['7c', '7d', '7h', '7s', 'As']; // Example: 7 of clubs, 7 of diamonds, etc.

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-sm aspect-[3/4] bg-poker-green rounded-full border-8 border-poker-tableGray shadow-xl flex items-center justify-center">
          {/* Pot display */}
          <div className="absolute top-1/3 flex flex-col items-center">
            <span className="text-poker-gold text-sm font-medium">Pot</span>
            <div className="bg-black/40 rounded-full px-3 py-1 border border-poker-gold/30">
              <span className="text-poker-gold font-bold">250K</span>
            </div>
          </div>
          
          {/* Community cards */}
          <div className="absolute top-[45%]">
            <div className="flex gap-1">
              {communityCards.map((card, index) => (
                <div 
                  key={index}
                  className="w-8 h-11 bg-white rounded-sm shadow-md flex items-center justify-center border border-gray-300 overflow-hidden"
                >
                  <img 
                    src={`/lovable-uploads/e326f262-62a2-46ea-b646-a9e474812ef8.png`} 
                    alt={`Card ${card}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Player positions */}
      {players.map((player) => (
        <PlayerSeat
          key={player.id}
          player={player}
        />
      ))}

      {/* Game controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <GameControls />
      </div>
    </div>
  );
};

export default PokerTable;
