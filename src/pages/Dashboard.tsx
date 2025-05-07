
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import GameCard from '@/components/GameCard';
import { Users, Gamepad, DollarSign, Calendar, Menu, Timer } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Top action buttons */}
        <div className="flex justify-between items-center px-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black border border-poker-gold/50">
            <div className="text-poker-gold">
              <Timer size={20} />
            </div>
          </button>
          
          <img 
            src="/lovable-uploads/caae1f92-d381-43e0-b7af-21d9b5d9be32.png" 
            alt="Hold'em or Fold'em Logo" 
            className="w-32 h-auto"
          />
          
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-black border border-poker-gold/50">
            <div className="text-poker-gold">
              <Calendar size={20} />
            </div>
          </button>
        </div>
        
        {/* Hero text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Face-to-Face <span className="text-poker-gold">WORLDWIDE</span>
          </h1>
          <p className="text-gray-400">Hold'em Poker</p>
        </div>
        
        {/* Game types - circular layout */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="relative">
            <GameCard 
              title="CASH" 
              to="/cash-game"
              icon={<DollarSign />}
              className="rounded-full"
            />
          </div>
          
          <div className="relative mt-8">
            <GameCard 
              title="FRIENDS" 
              to="/friends-game"
              icon={<Users />}
              className="rounded-full"
            />
          </div>
          
          <div className="relative">
            <GameCard 
              title="TOURNEY" 
              to="/tournament"
              icon={<DollarSign />}
              className="rounded-full"
            />
          </div>
          
          <div className="relative mt-8">
            <GameCard 
              title="SNG" 
              to="/sit-and-go"
              icon={<Gamepad />}
              className="rounded-full"
            />
          </div>
        </div>
        
        {/* Recent tables */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Recent Tables</h2>
          
          <div className="bg-gray-900 rounded-lg p-4 border border-poker-darkGold/20">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-poker-darkGold/20 flex items-center justify-center text-poker-gold">
                      T{i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Texas Hold'em</p>
                      <p className="text-xs text-gray-400">Blinds: 10/20</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-poker-gold text-black rounded-full font-semibold">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Daily challenge */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-poker-darkGold/30 to-black border border-poker-gold/30">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">Daily Challenge</h3>
              <p className="text-xs text-gray-400">Win 3 hands in a row</p>
            </div>
            <div className="bg-poker-gold/20 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-poker-gold">1/3</span>
            </div>
          </div>
          
          <div className="mt-2 w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-poker-gold h-1.5 rounded-full w-1/3"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
