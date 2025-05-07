
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const GameControls = () => {
  const [betAmount, setBetAmount] = useState(20); // Default bet amount
  const maxBet = 2000; // Example max bet
  
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="bg-black text-poker-gold border-poker-gold hover:bg-black/70">
        FOLD
      </Button>
      <Button variant="outline" className="bg-black text-poker-gold border-poker-gold hover:bg-black/70">
        CHECK
      </Button>
      <div className="relative group">
        <Button variant="outline" className="bg-black text-poker-gold border-poker-gold hover:bg-black/70">
          RAISE
        </Button>
        
        <div className="absolute bottom-full mb-2 left-0 w-48 bg-black p-3 rounded-md border border-poker-gold/50 hidden group-hover:block">
          <div className="mb-2">
            <Slider
              value={[betAmount]}
              max={maxBet}
              step={10}
              onValueChange={(value) => setBetAmount(value[0])}
              className="my-4"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-poker-gold">${betAmount}</span>
            <Button size="sm" className="bg-poker-gold text-black hover:bg-poker-darkGold">
              Bet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
